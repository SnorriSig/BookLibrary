<script>
  import { onMount } from "svelte";
  import { cart } from "../stores/store.js";
  import { io } from "socket.io-client";
  import BooksItem from "../books/BooksItem.svelte";
 

  const socket = io();

  // socket.emit("bookListUpdate")

  $: loadedBooks = [];
  const buttonLabel = "add to cart";

  const fetchBooks = async () => {
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
  };

  onMount(fetchBooks);

  socket.on("bookListBroadcast", fetchBooks);

  function addToCartHandler(book) {
    let bookIsDuplicated = false;
    $cart.forEach((item) => {
      if (item._id === book._id) {
        bookIsDuplicated = true;
      }
    });
    if (!bookIsDuplicated) {
      $cart = [...$cart, book];
    }
  }

  function emithandler() {
    socket.emit("bookListUpdate");
  }
</script>



<section class="books">
  <button on:click={emithandler}>emit event</button>
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
</style>
