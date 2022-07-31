<script>
  import { useNavigate, useLocation } from "svelte-navigator";

  import { cart } from "../stores/store.js";
  import BooksItem from "../books/BooksItem.svelte";
  import Button from "../UI/Button.svelte";

  const buttonLabel = "remove from cart";

  const navigate = useNavigate()

  $: booksInCart = [...$cart];

  function removeFromCartHandler(id) {
    cart.update((items) => {
      return items.filter((i) => i._id !== id);
    });
  }

  function navigateToCheckout() {
    navigate("/checkout", { replace: true });
  }
</script>

<h1>This is the cart</h1>

<Button type="button" on:click={navigateToCheckout}>Loan books</Button>

<section class="books">
  {#each booksInCart as book (book._id)}
    <BooksItem
      id={book._id}
      author={book.author}
      title={book.title}
      imageUrl={book.image}
      stock={book.stock}
      addOrRemove={buttonLabel}
      on:addOrRemove={removeFromCartHandler(book._id)}
    />
  {/each}
</section>


<style>
  h1 {
    margin-top: 10rem;
  }
  .books {
    text-align: center;
    /* margin-top: 5; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 5rem;
  }
</style>
