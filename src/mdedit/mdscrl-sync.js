'use strict';

/*eslint-env browser*/
/*global $, _*/
const $ = require('jquery');
const hljs = require('highlight.js');
const MarkdownIt = require('markdown-it');

var mdHtml;
var scrollMap;
var srcClass = '.source';
var resultClass = '.result-html';

var defaults = {
  html: false,        // Enable HTML tags in source
  xhtmlOut: false,        // Use '/' to close single tags (<br />)
  breaks: false,        // Convert '\n' in paragraphs into <br>
  langPrefix: 'language-',  // CSS language prefix for fenced blocks
  linkify: true,         // autoconvert URL-like texts to links
  typographer: true,         // Enable smartypants and other sweet transforms

  // options below are for demo only
  _highlight: true,
  _strict: false,
};

defaults.highlight = function (str, lang) {
  var esc = mdHtml.utils.escapeHtml;

  try {
    if (!defaults._highlight) {
      throw 'highlighting disabled';
    }

    if (lang && lang !== 'auto' && hljs.getLanguage(lang)) {

      return '<pre class="hljs language-' + esc(lang.toLowerCase()) + '"><code>' +
        hljs.highlight(lang, str, true).value +
        '</code></pre>';

    } else if (lang === 'auto') {

      var result = hljs.highlightAuto(str);

      /*eslint-disable no-console*/
      console.log('highlight language: ' + result.language + ', relevance: ' + result.relevance);

      return '<pre class="hljs language-' + esc(result.language) + '"><code>' +
        result.value +
        '</code></pre>';
    }
  } catch (__) { /**/ }

  return '<pre class="hljs"><code>' + esc(str) + '</code></pre>';
};

function createMd (s, r) {
  srcClass = s;
  resultClass = r;

  if (defaults._strict) {
    mdHtml = new MarkdownIt('commonmark');
  } else {
    mdHtml = new MarkdownIt(defaults)
      .use(require('markdown-it-abbr'))
      .use(require('markdown-it-container'), 'warning')
      .use(require('markdown-it-deflist'))
      .use(require('markdown-it-emoji'))
      .use(require('markdown-it-footnote'))
      .use(require('markdown-it-ins'))
      .use(require('markdown-it-mark'))
      .use(require('markdown-it-sub'))
      .use(require('markdown-it-sup'));
  }

  // Beautify output of parser for html content
  mdHtml.renderer.rules.table_open = function () {
    return '<table class="table table-striped">\n';
  };
  // Replace emoji codes with images
  mdHtml.renderer.rules.emoji = function (token, idx) {
    return window.twemoji.parse(token[idx].content);
  };


  //
  // Inject line numbers for sync scroll. Notes:
  //
  // - We track only headings and paragraphs on first level. That's enough.
  // - Footnotes content causes jumps. Level limit filter it automatically.
  function injectLineNumbers(tokens, idx, options, env, slf) {
    var line;
    if (tokens[idx].map && tokens[idx].level === 0) {
      line = tokens[idx].map[0];
      tokens[idx].attrJoin('class', 'line');
      tokens[idx].attrSet('data-line', String(line));
    }
    return slf.renderToken(tokens, idx, options, env, slf);
  }

  mdHtml.renderer.rules.paragraph_open = mdHtml.renderer.rules.heading_open = injectLineNumbers;
}

// Build offsets for each line (lines can be wrapped)
// That's a bit dirty to process each line everytime, but ok for demo.
// Optimizations are required only for big texts.
function buildScrollMap() {
  var i, offset, nonEmptyList, pos, a, b, lineHeightMap, linesCount,
    acc, sourceLikeDiv, textarea = $(srcClass),
    _scrollMap;

  sourceLikeDiv = $('<div />').css({
    position: 'absolute',
    visibility: 'hidden',
    height: 'auto',
    width: textarea[0].clientWidth,
    'font-size': textarea.css('font-size'),
    'font-family': textarea.css('font-family'),
    'line-height': textarea.css('line-height'),
    'white-space': textarea.css('white-space')
  }).appendTo('body');

  offset = $(resultClass).scrollTop() - $(resultClass).offset().top;
  _scrollMap = [];
  nonEmptyList = [];
  lineHeightMap = [];

  acc = 0;
  textarea.val().split('\n').forEach(function (str) {
    var h, lh;

    lineHeightMap.push(acc);

    if (str.length === 0) {
      acc++;
      return;
    }

    sourceLikeDiv.text(str);
    h = parseFloat(sourceLikeDiv.css('height'));
    lh = parseFloat(sourceLikeDiv.css('line-height'));
    acc += Math.round(h / lh);
  });
  sourceLikeDiv.remove();
  lineHeightMap.push(acc);
  linesCount = acc;

  for (i = 0; i < linesCount; i++) { _scrollMap.push(-1); }

  nonEmptyList.push(0);
  _scrollMap[0] = 0;

  $('.line').each(function (n, el) {
    var $el = $(el), t = $el.data('line');
    if (t === '') { return; }
    t = lineHeightMap[t];
    if (t !== 0) { nonEmptyList.push(t); }
    _scrollMap[t] = Math.round($el.offset().top + offset);
  });

  nonEmptyList.push(linesCount);
  _scrollMap[linesCount] = $(resultClass)[0].scrollHeight;

  pos = 0;
  for (i = 1; i < linesCount; i++) {
    if (_scrollMap[i] !== -1) {
      pos++;
      continue;
    }

    a = nonEmptyList[pos];
    b = nonEmptyList[pos + 1];
    _scrollMap[i] = Math.round((_scrollMap[b] * (i - a) + _scrollMap[a] * (b - i)) / (b - a));
  }

  return _scrollMap;
}

// Synchronize scroll position from source to result
function syncResultScroll() {
  var textarea = $(srcClass),
    lineHeight = parseFloat(textarea.css('line-height')),
    lineNo, posTo;

  lineNo = Math.floor(textarea.scrollTop() / lineHeight);
  if (!scrollMap) { scrollMap = buildScrollMap(); }
  posTo = scrollMap[lineNo];
  $(resultClass).stop(true).animate({
    scrollTop: posTo
  }, 100, 'linear');
}

// Synchronize scroll position from result to source
function syncSrcScroll () {
  var resultHtml = $(resultClass),
    scrollTop = resultHtml.scrollTop(),
    textarea = $(srcClass),
    lineHeight = parseFloat(textarea.css('line-height')),
    lines,
    i,
    line;

  if (!scrollMap) { scrollMap = buildScrollMap(); }

  lines = Object.keys(scrollMap);

  if (lines.length < 1) {
    return;
  }

  line = lines[0];

  for (i = 1; i < lines.length; i++) {
    if (scrollMap[lines[i]] < scrollTop) {
      line = lines[i];
      continue;
    }

    break;
  }

  textarea.stop(true).animate({
    scrollTop: lineHeight * line
  }, 100, 'linear');
}

function clearMap () {
  scrollMap = null;
}

module.exports.createMd = createMd;
module.exports.syncResultScroll = syncResultScroll;
module.exports.syncSrcScroll = syncSrcScroll;
module.exports.clearMap = clearMap;
module.exports.render = (src) => {
  return mdHtml.render(src);
}
