<script>
  import Button from "../UI/Button.svelte";
  import { useNavigate, useLocation } from "svelte-navigator";
  import { isLoggedIn } from "../stores/store.js"

  const navigate = useNavigate();

  async function logoutHandler() {
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "GET",
    });

    const data = await response.json();
    if (response.status === 200) {
        isLoggedIn.set(false);
      
    navigate("/", { replace: true });
}
  }

  function cancel() {
    navigate("/", { replace: true });
  }
</script>

<div class="container">
  <h1>Would you like to logout?</h1>
  <Button type="button" on:click={logoutHandler}>Logout</Button>
  <Button type="button" on:click={cancel}>Cancel</Button>
</div>

<style>
  .container {
    text-align: center;
    margin-top: 20%;
  }
</style>
