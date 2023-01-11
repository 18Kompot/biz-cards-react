import Search from "../../components/Search";
import Title from "../../components/Title";
import { createContext, useContext, useEffect, useState } from "react";
import { getRequest } from "../../services/apiService";
import { AppContext } from "../../App";

// Card data as returned by the server.
export interface ICardData {
  _id: string,
  title: string,
  subTitle: string,
  address: string,
  phone: string,
  image: { url: string, alt: string },
  bizNumber: string,
  createdAt: Date,
  user_id: string
}

interface Context {
  cards?: Array<ICardData>;
}

export const CardsContext = createContext<Context>({});

function BizCards() {
  const context = useContext(AppContext);

  // The user ID from the logged in user.
  const userId  = (context && context.userId.length > 0) ? context.userId : "0";
  
  const [cards, setCards] = useState<Array<ICardData>>([]);

  function getCards() {
    const res = getRequest("cards"); //This is instead of all the above
    if (!res) return;
    res
      .then((response) => response.json())
      .then((json) => {
        setCards(json);
      });
  }

  useEffect(getCards, []);

  return (
    <CardsContext.Provider value={{ cards }}>
      <Title main="Business Card App" sub="Here you will find business cards" />
      <Search />
      {cards.length === 0 ? (
        <div className="alert alert-info m-5">No cards</div>
      ) : (
        <>
          {cards.map((card) => (
            <div key={card._id} className="card col-3">
              <img src={card.image.url} className="card-img-top" alt={ card.image.alt } />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">Description: {card.subTitle}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Address: {card.address}</li>
                <li className="list-group-item">Phone: {card.phone}</li>
              </ul>
              { card.user_id == userId && (
                <div className="card-body">
                  <a href="/#" className="card-link">
                    Delete
                  </a>
                  <a href="/#" className="card-link">
                    Edit
                  </a>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </CardsContext.Provider>
  );
}

export default BizCards;
