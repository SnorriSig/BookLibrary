<script>
  import { Router, Route } from "svelte-navigator";
  import Notifications from "svelte-notifications";

  import Books from "./routes/Books.svelte";
  import Login from "./routes/Login.svelte";
  import Signup from "./routes/Signup.svelte";
  import Logout from "./routes/Logout.svelte";
  import Cart from "./routes/Cart.svelte";
  import Header from "./UI/Header.svelte";
  import Footer from "./UI/Footer.svelte";
  import Checkout from "./routes/Checkout.svelte";
  import Returns from "./routes/Returns.svelte";
</script>

<Notifications>
  <Router primary={false}>
    <Route path="/books">
      <Header />
      <main>
        <Books />
      </main>
    </Route>

    <Route path="/">
      <main>
        <Login />
      </main>
      <Footer />
    </Route>

    <Route path="/signup">
      <main>
        <Signup />
      </main>
    </Route>

    <Route path="/logout">
      <Header />
      <main>
        <Logout />
      </main>
    </Route>

    <Route path="/cart">
      <Header />
      <main>
        <Cart />
      </main>
    </Route>

    <Route path="/checkout">
      <Header />
      <main>
        <Checkout />
      </main>
    </Route>

    <Route path="/returns">
      <Header />
      <main>
        <Returns />
      </main>
    </Route>

    <Route path="/about">
      <Header />
      <main>
        <div class="container">
          <h1>About</h1>
          <p>Your favorite reads all in one place!</p>
        </div>
      </main>
      <Footer />
    </Route>
  </Router>
</Notifications>

<style>
  .container {
    text-align: center;
    margin-top: 20%;
  }
  h1,
  p {
    text-align: center;
  }
  p {
    padding-top: 0.5rem;
  }
</style>
