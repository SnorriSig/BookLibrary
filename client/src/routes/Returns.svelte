<h1>This Returns</h1>
<!-- <script>
    import { onMount } from "svelte";
  
    import Button from "../UI/Button.svelte";
    import BooksItem from "../books/BooksItem.svelte";
    import { cart } from "../stores/store.js";
  
    let loadedBooks = [];
    const buttonLabel = "add to cart";
  
    onMount(async () => {
      const response = await fetch("/api/books", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Credentials: "include",
        },
      });
      if (response.status === 401) {
        return;
      }
  
      const { data } = await response.json();
  
      loadedBooks = data.books;
    });
  
    function addToCartHandler(book) {
      cart.update((cart) => {
        cart.push(book);
        return cart;
      });
    }
  </script>
  
  <section class="books">
    {#each loadedBooks as book (book._id)}
      <BooksItem
        id={book._id}
        author={book.author}
        title={book.title}
        imageUrl={book.image}
        stock={book.stock}
        addOrRemove={buttonLabel}
        on:addOrRemove={addToCartHandler(book)}
      />
    {/each}
  </section>
  
  <style>
    .books {
      text-align: center;
      /* margin-top: 5; */
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-top: 5rem;
    }
  </style> -->
  