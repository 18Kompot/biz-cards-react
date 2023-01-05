import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { postRequest } from "../services/apiService";

interface ISignupData {
  email: string;
  password: string;
  name: string;
}

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");

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
      name: Joi.string().required().min(2).max(256),
    });

    const { error, value } = schema.validate({
      email,
      password,
      name,
    });

    if (error) {
      //   setError(error.message);
      console.log(error.message);
      return;
    }
    register(value);
  }

  function register(data: ISignupData) {
    const res = postRequest("users/signup", data, false);
    if (!res) return;
    res
      .then((response) => response.json())
      .then((json) => {
        if (json.error) {
          toast.error(json.error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "dark",
          });
          return;
        }
        navigate("/login");
      });
  }
  return (
    <>
      <Title
        main="Sign up for Real App"
        sub="You can open a new account for free!"
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
        <div className="form-group mt-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <button onClick={submit} className="btn btn-primary mt-2">
          Sign up
        </button>
      </form>
    </>
  );
}

export default Signup;
