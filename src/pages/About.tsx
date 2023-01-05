import Title from "../components/Title";

function About() {
  return (
    <>
      <Title
        main="About Page"
        sub="Here you will find an explanation of how to interact with the app"
      />

      <div className="container row align-items-center">
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
            src="https://cdn.pixabay.com/photo/2016/12/13/21/16/new-years-eve-1905144_960_720.jpg"
            className="card-img-top p-2"
            alt="champagne"
          />
          <div className="card-body">
            <h6>Business title</h6>
            <p className="card-text">Business Card Description</p>
            <hr></hr>
            <b>Tel:</b> 050-2323211
            <br />
            <b>Address:</b> Card Address
            <br />
            <b>Card Number:</b> #######
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
