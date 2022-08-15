<script>
  import { onMount } from "svelte";
  import { getNotificationsContext } from "svelte-notifications";
  import { io } from "socket.io-client";

  import { cart, user } from "../stores/store.js";
  import BooksItem from "../books/BooksItem.svelte";

  const socket = io();

  socket.on("bookListUpdate", () => {
    fetchBooks();
  });

  const { addNotification } = getNotificationsContext();

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

  function addToCartHandler(book) {
    let bookInStock = false;
    let bookIsDuplicated = false;
    let userHasCopy = false;
    $cart.forEach((item) => {
      if (item._id === book._id) {
        bookIsDuplicated = true;
      }
    });
    if (book.stock >= 1) {
      bookInStock = true;
    }
    $user.data.user.books.forEach((b) => {
      if (b._id === book._id) userHasCopy = true;
    });
    if (!bookIsDuplicated && bookInStock && !userHasCopy) {
      $cart = [...$cart, book];
      addNotification({
        text: `${book.title} added to cart`,
        position: "bottom-left",
        type: "success",
        removeAfter: 2500,
      });
    }
  }
</script>

<section class="books">
  {#each loadedBooks as book (book._id)}
    <BooksItem
      id={book._id}
      author={book.author}
      title={book.title}
      imageUrl={book.image}
      stock={book.stock + " books available"}
      addOrRemove={buttonLabel}
      on:addOrRemove={addToCartHandler(book)}
    />
  {/each}
</section>

<style>
  .books {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    margin-top: 8rem;
  }
</style>
