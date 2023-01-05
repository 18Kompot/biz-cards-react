import Title from "../components/Title";

function Business() {
  return (
    <>
      <Title
        main="Sign up as a Business account"
        sub="You can open a business account and add a card!"
      />

      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
        </div>
        <div className="form-group mt-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <div className="form-group mt-2">
          <label>Name</label>
          <input
            type="name"
            className="form-control"
            id="exampleInputName1"
            placeholder="Name"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Next
        </button>
      </form>
    </>
  );
}

export default Business;
