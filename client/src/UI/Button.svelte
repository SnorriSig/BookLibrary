<script>
  export let type = "button";
  export let href = null;
  export let mode = null;
  export let color = null;
  export let disabled = false;
</script>

{#if href}
  <a {href}>
    <slot />
  </a>
{:else}
  <button class="{mode} {color}" {type} on:click {disabled}>
    <slot />
  </button>
{/if}

<style>
  button,
  a {
    font: inherit;
    border: 1px solid #663333;
    background: #663333;
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26);
    cursor: pointer;
    text-decoration: none;
  }
  button:hover,
  button:active,
  a:hover,
  a:active {
    background: #442222;
    border-color: #442222;
    box-shadow: 1px 1px 8px rgba(77, 51, 51, 0.26);
  }
  .outline {
    background: #336666;
    color: white;
    box-shadow: none;
  }
  .outline:hover,
  .outline:active {
    background: #224444;
    box-shadow: none;
  }
</style>
