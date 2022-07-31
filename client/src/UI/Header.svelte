<script>
  import { Link } from "svelte-navigator";
  import { onMount } from "svelte";
  import { isLoggedIn, user } from "../stores/store";

  let login;
  const name = $user.data.user.firstName

  onMount(async () => {
    isLoggedIn.subscribe((value) => {
      login = value;
    });
    if (!login) {
      const res = await fetch("http://localhost:3000/api/checktoken", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (res.status === 200) {
        isLoggedIn.set(true);
      }
    }
  });
</script>

<header>
  <h1>sonLibrary</h1>
  <nav class="wrapper">
    <!-- {#if login} -->
      <Link to="/books" class="link">Books</Link>
      <Link to="/cart" class="link">Cart</Link>
      <Link to="/logout" class="link">Logout</Link>
      <Link to="/returns" class="link">{name}</Link>
    <!-- {:else}
      <Link to="/login" class="link">Login</Link>
      <Link to="/signup" class="link">Sign up</Link>
      <Link to="/about" class="link">About</Link> -->
    <!-- {/if} -->
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
