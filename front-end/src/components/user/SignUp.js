export default function SignUp() {
  return (
    <>
      <div style={{ width: "50%", margin: "auto" }}>
        <form action="/action_page.php">
          <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" class="form-control" id="email" />
          </div>
          <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" id="pwd" />
          </div>
          <div class="form-group">
            <label for="phone">Phone Number:</label>
            <input type="text" class="form-control" id="pwd" />
          </div>
          <div>Address</div>
          <div class="form-group">
            <label for="street">Street:</label>
            <input type="text" class="form-control" id="street" />
          </div>
          <div class="form-group">
            <label for="city">City:</label>
            <input type="text" class="form-control" id="city" />
          </div>
          <div class="form-group">
            <label for="state">State:</label>
            <input type="text" class="form-control" id="state" />
          </div>
          <div class="form-group">
            <label for="zipcode">Zip:</label>
            <input type="text" class="form-control" id="zip" />
          </div>
          <button
            type="submit"
            class="btn btn-primary"
            style={{ marginTop: "5px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
