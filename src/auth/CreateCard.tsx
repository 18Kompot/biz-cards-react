import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { postRequest } from "../services/apiService";

interface ICardData {
  name: string;
  description: string;
  address: string;
  phone: string;
  image: string;
}

function CreateCard() {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [image, setImage] = useState<string>("");

  //todo: create an error componenet for this:
  //const [error, setError] = useState<string>("")

  function submit() {
    const schema = Joi.object().keys({
      name: Joi.string().min(2).max(256).required(),
      description: Joi.string().min(2).max(1024).required(),
      address: Joi.string().min(2).max(256).required(),
      phone: Joi.string().min(9).max(14).required(),
      image: Joi.string().min(6).max(1024),
    });

    const { error, value } = schema.validate({
      name,
      description,
      address,
      phone,
      image,
    });

    if (error) {
      //   setError(error.message);
      console.log(error.message);
      return;
    }
    makeCard(value);
  }

  function makeCard(data: ICardData) {
    const res = postRequest("cards", data, false);
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
        navigate("/bizcards");
      });
  }
  return (
    <>
      <Title
        main="Business registration form"
        sub="Create your business card!"
      />

      <div>
        <div className="form-group">
          <label>Business Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <label>Business Description:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <label>Business Address:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <label>Business Phone:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <label>Business Image:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button onClick={submit} className="btn btn-primary mt-2">
          Create Card
        </button>
      </div>
    </>
  );
}

export default CreateCard;
