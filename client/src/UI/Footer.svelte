<script>
  import { email } from "../stores/store.js";
</script>

<footer>
  <div class="container">
    <div>
      <h2>Visit</h2>
      <p>Grundtvig's Church</p>
      <p>Bjerget 14 B</p>
      <p>2400 København NV</p>
    </div>
    <div>
      <h2>Hours</h2>
      <p>Monday-Thursday 9 am - 9 pm</p>
      <p>Friday 9 am - 6 pm</p>
      <p>Saturday 9 am - 5 pm</p>
      <p>Sunday 12 pm - 5 pm</p>
    </div>
    <div>
      <h2>Contact</h2>
      <p>Phone: 518-371-8622</p>
      <p>{$email}</p>
    </div>
  </div>
</footer>

<style>
  footer {
    width: 100%;
    bottom: 0;
    left: 0;
    height: auto;
    background: #663333;
    align-items: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.26);
    margin-top: 15%;
    padding-top: 5rem;
    padding-bottom: 5rem;
    margin-left: 0;
  }
  h2,
  p {
    color: white;
    font-family: "Roboto Slab", serif;
    margin: 0;
    margin: 1rem;
  }
  .container {
    display: flex;
    justify-content: space-around;
  }
</style>
