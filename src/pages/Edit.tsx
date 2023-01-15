import Joi from "joi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getRequest, patchRequest } from "../services/apiService";
import { IFormCardData } from "./types";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [url, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const res = getRequest(`cards/${id}`);
    if (!res) return;

    res
      .then((res) => res.json())
      .then((json) => {
        if (json.ok === false) {
          setError("error get the data");
          return;
        }

        setTitle(json.title);
        setSubTitle(json.subTitle);
        setAddress(json.address);
        setPhone(json.phone);
        setImageUrl(json.image.url);
      });
  }, [id]);

  function handleClick() {
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
      setError(error.message);
      return;
    }

    setError("");
    editCard(value);
  }

  function editCard(card: IFormCardData) {
    const res = patchRequest(`cards/${id}`, card);
    if (!res) return;

    res
      .then((res) => res.json())
      .then((json) => {
        if (json.error) {
          setError(json.error);
          return;
        }

        navigate("/bizcards");
      });
  }

  return (
    <>
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

        <button onClick={handleClick} className="btn btn-info me-3">
          Update
        </button>

        <Link to="/bizcards" className="btn btn-secondary">
          Cancel
        </Link>
      </div>

      {error && <div className="text-danger">{error}</div>}
    </>
  );
}

export default Edit;
