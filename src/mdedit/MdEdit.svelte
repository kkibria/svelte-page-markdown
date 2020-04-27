<script>
  import md from ".gen-js/mdscrl-sync.js";

  let source = md.testSnippet;
  let markdown;

  let srcEl;
  let rsltEl;

  md.createMd(".c-src", ".c-html");
  //md.createMd(srcEl, rsltEl);

  let timer, timerSrc, timerRslt;
  let srcScroll = true;

  $: updateResult(source);

  const updateResult = src => {
    markdown = md.render(src);
    md.clearMap();
  };

  const debounce = e => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      source = e.target.value;
    }, 300);
  };

  const fromSrc = e => {
    srcScroll = true;
  };
  const fromRslt = e => {
    srcScroll = false;
  };

  const handleSrcScroll = e => {
    if (srcScroll) {
      clearTimeout(timerSrc);
      timerSrc = setTimeout(() => {
        md.syncResultScroll();
      }, 50);
    }
  };

  const handleRsltScroll = e => {
    if (!srcScroll) {
      clearTimeout(timerRslt);
      timerRslt = setTimeout(() => {
        md.syncSrcScroll(e);
      }, 50);
    }
  };
</script>

<style>
  @import "./md.css";
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

<svelte:window on:resize={md.clearMap} />

<div class="c-page h-full">
  <header class="c-header text-center font-bold">
    <h1>Content editor</h1>
  </header>

  <div class="c-content flex">
    <div class="c-md w-1/3">
      <textarea
        on:keyup={debounce}
        on:paste={debounce}
        on:cut={debounce}
        on:mouseup={debounce}

        on:touchstart={fromSrc}
        on:mouseover={fromSrc}

        on:scroll={handleSrcScroll}

        bind:value={source}
        bind:this={srcEl}
        class="c-src c-panel border-black-500 bg-gray-200" />
    </div>

    <div class="w-2/3">
      <div
        on:scroll={handleRsltScroll}

        on:touchstart={fromRslt} 
        on:mouseover={fromRslt}

        bind:this={rsltEl}
        class="c-html c-panel border-black-500">
        {@html markdown}
      </div>
    </div>
  </div>
</div>
