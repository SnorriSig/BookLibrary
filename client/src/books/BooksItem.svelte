<script>
  import Button from "../UI/Button.svelte";
  import { createEventDispatcher } from "svelte";

  export let id;
  export let author;
  export let title;
  export let imageUrl;
  export let stock;
  export let addOrRemove;

  const dispatch = createEventDispatcher();
</script>

<article>
  <header>
    <h1>
      {title}
    </h1>
    <h2>{author}</h2>
  </header>
  <div class="image">
    <img src={imageUrl} alt={title} />
  </div>
  <div class="content">
    <p>{stock} books available</p>
  </div>
  <footer>
    <Button type="button" on:click={() => dispatch("addOrRemove", id)}>
      {addOrRemove}
    </Button>
  </footer>
</article>

<style>
  article {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
    width: 20%;
  }

  header,
  .content,
  footer {
    padding: 1rem;
  }

  .image {
    width: 90%;
    /* height: auto; */
  }

  .image img {
    width: 90%;
    height: 100%;
    /* object-fit: cover; */
  }

  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }

  p {
    margin: 0;
  }

  div {
    text-align: right;
  }
</style>
