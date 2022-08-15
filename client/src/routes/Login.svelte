<script>
  import Button from "../UI/Button.svelte";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { isLoggedIn, user } from "../stores/store.js";
  import { onMount } from "svelte";

  const navigate = useNavigate();

  let email = "";
  let password = "";
  let login;

  onMount(async () => {
    isLoggedIn.subscribe((value) => {
      login = value;
    });
    if (!login) {
      const response = await fetch("http://localhost:3000/api/checktoken", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      if (response.status !== 401) {
        isLoggedIn.set(true);;
        user.set(data);
        navigate("/books", { replace: true });
      }
    }
  });

  async function loginHandler() {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.status === 200) {
      isLoggedIn.set(true);
      $user = data;
      navigate("/books", { replace: true });
    }
  }

  function navigateSignup() {
    navigate("/signup", { replace: true });
  }
</script>

<div class="container">
  <div>
    <h1>sonLibrary</h1>
    <h2>Worlds best reads in one place</h2>
  </div>
  <div class="form">
    <form on:submit={loginHandler}>
      <!-- <form on:submit|preventDefault={loginHandler} /> -->
      <input
        bind:value={email}
        type="text"
        name="email"
        placeholder="example@expamle.com"
      />
      <br />
      <input
        bind:value={password}
        type="password"
        name="password"
        placeholder="Password"
      />
      <br />
      <div><Button type="button" on:click={loginHandler}>Login</Button></div>
      <br />
      <div>
        <Button mode="outline" type="button" on:click={navigateSignup}
          >Sign up</Button
        >
      </div>
    </form>
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: space-evenly;
    margin-top: 20%;
  }
  .form {
    justify-content: center;
    text-align: center;
    border: 2px solid #ccc;
    border-radius: 10px;
    padding: 2rem;
  }
</style>
