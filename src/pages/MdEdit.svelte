<script>
  import { mdInit, clearMap, testSnippet, syncResultScroll, syncSrcScroll } from "../mdinit";

  let source = testSnippet;
  let markdown;

  let srcEl;
  let rsltEl;

  var mdHtml = mdInit("c-src", "c-html");

  let timer, timerSrc, timerRslt;
  let srcScroll = true;

  $: updateResult(source);

  const updateResult = src => {
    markdown = mdHtml.render(src);
    clearMap();
  };

  const debounce = e => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      source = e.target.value;
    }, 300);
  };

  const handleSrcScroll = e => {
    if (!srcScroll) {
      clearTimeout(timerSrc);
      timerSrc = setTimeout(() => {
        syncResultScroll();
      }, 50);
    }
  }

  const handleRsltScroll = e => {
    if (!srcScroll) {
      clearTimeout(timerRslt);
      timerRslt = setTimeout(() => {
        syncSrcScroll(e);
      }, 50);
    }
  }
</script>

<style>
  div.c-page {
    --header-height: 3%;
    --footer-height: 0%;
    --content-height: calc(100% - var(--header-height) - var(--footer-height));
  }
  .c-header {
    height: var(--header-height);
    overflow-y: auto;
  }
  div.c-content {
    height: var(--content-height);
  }
  .c-panel {
    overflow-y: auto;
    @apply w-full h-full border resize-none p-2;
  }
</style>

<svelte:window
  on:resize={clearMap} />

<div class="c-page h-full">
  <header class="c-header text-center font-bold">
    <h1>Content editor</h1>
  </header>

  <div class="c-content flex">
    <div class="c-md w-1/2">
      <textarea
        on:keyup paste cut mouseup={debounce}
        on:scroll={handleSrcScroll}
        on:touchstart mouseover={function(e) {
          srcScroll = true;
        }}
        bind:value={source}
        bind:this={srcEl}
        class="c-src c-panel border-black-500 bg-gray-200" />
    </div>

    <div class="w-1/2">
      <div
        on:scroll={handleRsltScroll }
        on:touchstart mouseover={function(e) {
          srcScroll = false;
        }}
        bind:this={rsltEl}
        class="c-html c-panel border-black-500">
        {@html markdown}
      </div>
    </div>
  </div>
</div>
