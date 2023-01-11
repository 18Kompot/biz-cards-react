import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { postRequest } from "../services/apiService";

// title: value.title,
// subTitle: value.subTitle,
// address: value.address,
// phone: value.phone,
// image: {
//   url: value.url
//     ? value.url
//     : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//   alt: value.alt ? value.alt : "Pic of Business Card",
// },
// bizNumber: Math.floor(Math.random() * 10000000),
// user_id: user._id,

export interface ICardData {
  _id: number;
  title: string;
  subTitle: string;
  address: string;
  phone: string;
  url: string;
}

function CreateCard() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [url, setImageUrl] = useState<string>("");

  //todo: create an error componenet for this:
  //const [error, setError] = useState<string>("")

  function submit() {
    const schema = Joi.object().keys({
      title: Joi.string().min(2).max(256).required(),
      subTitle: Joi.string().min(2).max(1024).required(),
      address: Joi.string().min(2).max(256).required(),
      phone: Joi.string().min(9).max(14).required(),
      url: Joi.string().min(6).max(1024),
    });

    const { error, value } = schema.validate({
      title,
      subTitle,
      address,
      phone,
      url,
    });

    if (error) {
      console.log("We're in an error.");
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <label>Business Description:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Description"
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
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
            value={url}
            onChange={(e) => setImageUrl(e.target.value)}
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
