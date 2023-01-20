import Title from "../components/Title";

function About() {
  return (
    <>
      <Title
        main="About Page"
        sub="Here you will find an explanation of how to interact with the app"
      />

      <div className="row align-items-center">
        <div className="col">
          <div className="card-body col-sm-10">
            <p className="card-text">
              Hello and welcome to the cards project. You can easily add your
              own cards, edit, remove and view them. To do so you must first
              register an account for yourself. It is important to register as a
              business account or otherwise you will not be able to create cards
              at all. When you are logged in as a business account, from the my
              cards page by clicking on Add card you can then generate a card
              with your desired information inside. You can then edit or remove
              your card if you please and you can add any card you wish to your
              favorites tab. Enjoy!
            </p>
          </div>
        </div>
        <div className="card col-sm-4">
          <img
            src="https://cdn.pixabay.com/photo/2016/12/13/21/16/new-years-eve-1905144_960_720.jpg"
            className="card-img-top img-thumbnail mt-2"
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
