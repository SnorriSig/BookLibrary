<script>
  import { useNavigate } from "svelte-navigator";

  import Modal from "../UI/Modal.svelte";
  import Button from "../UI/Button.svelte";
  import { isLoggedIn, user } from "../stores/store.js";

  const navigate = useNavigate();

  let firstName = "";
  let lastName = "";
  let email = "";
  let password = "";
  let passwordConfirm = "";

  async function handleSubmit() {
    const response = await fetch("http://localhost:3000/api/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    if (response.status === 201) {
      isLoggedIn.set(true);
      $user = data;
      navigate("/books", { replace: true });
    }
  }

  function cancel() {
    navigate("/", { replace: true });
  }

</script>

<Modal title="Enter user data" on:cancel>
  <form on:submit={handleSubmit}>
    <input
      bind:value={firstName}
      type="text"
      name="first name"
      placeholder="first name"
    />
    <br />
    <input
      bind:value={lastName}
      type="text"
      name="last name"
      placeholder="last name"
    />
    <br />
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
      placeholder="password"
    />
    <br />
    <input
      bind:value={passwordConfirm}
      type="password"
      name="password"
      placeholder="repeat password"
    />
  </form>
  <div name="footer">
    <Button type="button" on:click={handleSubmit}>Sign Up</Button>
    <Button mode="outline" type="button" on:click={cancel}>Cancel</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
