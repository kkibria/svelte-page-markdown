<script>
  import marked from "marked";

  let source = `
# H1 heading

## H2 heading

### H3 heading

---

**bold text**

*italicized text*

---

1. First item
2. Second item
3. Third item

- First item
- Second item
- Third item

[Svelte](https://svelte.dev/)
`;

  $: markdown = marked(source);
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
  @apply w-full h-full border resize-none p-2;
}

</style>

<div class="c-page h-full">
  <header class="c-header text-center font-bold">
    <h1>Content editor</h1>
  </header>

  <div class="c-content flex">
    <div class="w-1/2">
      <textarea
        bind:value={source}
        class="c-panel border-black-500 bg-gray-200"/>
    </div>

    <div class="w-1/2">
      <div class="c-html c-panel border-black-500">
        {@html markdown}
      </div>
    </div>
  </div>
</div>
