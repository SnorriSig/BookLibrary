<script>
  import { cart } from "../stores/store.js";
  import { useNavigate } from "svelte-navigator";

  import Modal from "../UI/Modal.svelte";
  import Button from "../UI/Button.svelte";
  import { user } from "../stores/store.js";

  const navigate = useNavigate();

  let address = "";
  let city = "";
  let zip = "";
  let phone = "";

  async function submitForm() {
    const userData = {
      address: address,
      city: city,
      zip: zip,
      phone: phone,
      books: $cart,
    };

    const response = await fetch(`/api/users/${$user.data.user._id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Credentials: "include",
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      $user = data;
      $cart = [];
      navigate("/returns", { replace: true });
    }
  }

  function cancel() {
    navigate("/", { replace: true });
  }
</script>

<h1>This is checkout</h1>

<Modal title="Enter user data" on:cancel>
  <form on:submit={submitForm}>
    <input
      bind:value={address}
      type="text"
      name="address"
      placeholder="address"
    />
    <br />
    <input bind:value={city} type="text" name="city" placeholder="city" />
    <br />
    <input bind:value={zip} type="text" name="postal code" placeholder="2300" />
    <br />
    <input
      bind:value={phone}
      type="text"
      name="phone"
      placeholder="phone number"
    />
    <br />
  </form>
  <div name="footer">
    <Button type="button" on:click={submitForm}>Sign Up</Button>
    <Button type="button" on:click={cancel}>Cancel</Button>
  </div>
</Modal>

<style>
  form {
    width: 100%;
  }
</style>
