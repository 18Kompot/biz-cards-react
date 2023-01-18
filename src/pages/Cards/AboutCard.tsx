import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Title from "../../components/Title";
import { getRequest } from "../../services/apiService";

function About() {
  const { id } = useParams();

  const [title, setTitle] = useState<string>("");
  const [subTitle, setSubTitle] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [url, setImageUrl] = useState<string>("");
  const [alt, setImageAlt] = useState<string>("");
  const [bizNumber, setBizNumber] = useState<string>(""); 
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const res = getRequest(`cards/${id}`);
    if (!res) return;

    res
      .then((res) => res.json())
      .then((json) => {
        if (json.ok === false) {
          return;
        }

        setTitle(json.title);
        setSubTitle(json.subTitle);
        setAddress(json.address);
        setPhone(json.phone);
        setImageUrl(json.image.url);
        setImageAlt(json.image.alt);
        setBizNumber(json.bizNumber);
      });
  }, [id]);

  return (
    <>
      <Title
        main={ title }
        sub={ subTitle }
      />

      <div className="row align-items-center">
        <div className="col">
          <div className="card-body col-sm-10">
            <p className="card-text">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing
            </p>
          </div>
        </div>
        <div className="card col-sm-4">
          <img
            src={ url }
            className="card-img-top p-2"
            alt={ alt }
          />
          <div className="card-body">
            <h6>{ title }</h6>
            <p className="card-text">Business Card Description</p>
            <hr></hr>
            <b>Tel:</b> { phone }
            <br />
            <b>Address:</b> { address }
            <br />
            <b>Card Number:</b> { bizNumber} 
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
