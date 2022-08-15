<script>
  import { getNotificationsContext } from "svelte-notifications";
  import { io } from "socket.io-client";

  import { user } from "../stores/store.js";
  import BooksItem from "../books/BooksItem.svelte";

  const buttonLabel = "return book";

  const socket = io();
  const { addNotification } = getNotificationsContext();

  const bookListUpdate = async (book) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/return/${$user.data.user._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            books: $user.data.user.books,
            book: book,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        addNotification({
          text: `${book.title} has been returned to the library`,
          position: "top-center",
          type: "success",
          removeAfter: 2500,
        });
      }
    } catch (e) {
      console.log(e);
      throw new Error("An error occurred, please try again!");
    }
  };

  async function returnBookHandler(book) {
    const index = $user.data.user.books.findIndex((i) => i._id === book._id);
    $user.data.user.books.splice(index, 1);
    $user.data.user.books = $user.data.user.books;

    bookListUpdate(book);

    socket.emit("bookListUpdate", bookListUpdate);
  }
</script>

{#if $user.data.user.books.length > 0}
  <h1>When done reading, return your books</h1>
  {:else}
  <h1>Pick and checkout some books, they will then appear here.</h1>
{/if}


<section class="books">
  {#each $user.data.user.books as book (book._id)}
    <BooksItem
      id={book._id}
      author={book.author}
      title={book.title}
      imageUrl={book.image}
      stock={""}
      addOrRemove={buttonLabel}
      on:addOrRemove={returnBookHandler(book)}
    />
  {/each}
</section>

<style>
  h1 {
    text-align: center;
    margin-top: 20%;
  }
  .books {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    margin-top: 5rem;
  }
</style>
