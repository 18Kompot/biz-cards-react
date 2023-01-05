import Title from "../components/Title";
import Joi from "joi";
import { useState } from "react";

interface Props {
  handler: Function;
}

function Login({ handler }: Props) {
  // const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //todo: create an error componenet for this:
  //const [error, setError] = useState<string>("")

  function submit() {
    const schema = Joi.object().keys({
      email: Joi.string()
        .required()
        .min(6)
        .max(256)
        .email({ tlds: { allow: false } }),
      password: Joi.string().required().min(6).max(30),
    });

    const { error, value } = schema.validate({
      email,
      password,
    });

    if (error) {
      //   setError(error.message);
      console.log(error.message);
      return;
    }
    handler(value);
  }
  return (
    <>
      <Title
        main="Log in to your existing account"
        sub="Please type in your email and password"
      />

      <form>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={submit} className="btn btn-primary mt-2">
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
