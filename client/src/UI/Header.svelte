<script>
  import { Link } from "svelte-navigator";
  import { user } from "../stores/store";

  const name = $user.data.user.firstName;
</script>

<header>
  <h1>sonLibrary</h1>
  <nav class="wrapper">
    <Link to="/books" class="link">Books</Link>
    <Link to="/cart" class="link">Cart</Link>
    <Link to="/logout" class="link">Logout</Link>
    <Link to="/returns" class="link">{name}'s books</Link>
  </nav>
</header>

<style>
  header {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    height: 4rem;
    background: #663333;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
  }
  h1,
  nav,
  .wrapper :global(.link) {
    color: white;
    font-family: "Roboto Slab", serif;
    margin: 0;
    text-decoration: none;
    margin: 1rem;
  }
</style>
