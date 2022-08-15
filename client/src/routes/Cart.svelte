<script>
  import { useNavigate } from "svelte-navigator";
  import { io } from "socket.io-client";
  import { getNotificationsContext } from "svelte-notifications";

  import { cart, user } from "../stores/store.js";
  import BooksItem from "../books/BooksItem.svelte";
  import Button from "../UI/Button.svelte";

  const socket = io();

  const { addNotification } = getNotificationsContext();

  const navigate = useNavigate();

  const buttonLabel = "remove from cart";

  const fetchBooks = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/checkout/${$user.data.user._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ books: $user.data.user.books }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (response.status === 200) {
        $cart = [];

        navigate("/books", { replace: true });
      }
    } catch (e) {
      console.log(e);
      throw new Error("An error occurred, please try again!");
    }
  };

  function removeFromCartHandler(book) {
    cart.update((items) => {
      return items.filter((i) => i._id !== book._id);
    });
    addNotification({
      text: `${book.title} has been removed from cart`,
      position: "top-center",
      type: "warning",
      removeAfter: 2500,
    });
  }

  async function loanBooks() {
    $user.data.user.books = [...$user.data.user.books, ...$cart];
    await fetchBooks();
    socket.emit("bookListUpdate", $user.data.user.books);
  }
</script>

{#if $cart.length === 0}
  <h1>Your cart is empty...</h1>
{:else}
  <div class="button">
    <Button mode="outline" type="button" on:click={loanBooks}>Loan books</Button
    >
  </div>
  <section class="books">
    {#each $cart as book (book._id)}
      <BooksItem
        id={book._id}
        author={book.author}
        title={book.title}
        imageUrl={book.image}
        stock={""}
        addOrRemove={buttonLabel}
        on:addOrRemove={removeFromCartHandler(book)}
      />
    {/each}
  </section>
{/if}

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
  }
  .button {
    margin-top: 10%;
    margin-left: 8%;
  }
</style>
