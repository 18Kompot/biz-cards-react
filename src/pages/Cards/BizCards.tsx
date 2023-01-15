import Search from "../../components/Search";
import Title from "../../components/Title";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteRequest, getRequest } from "../../services/apiService";
import { AppContext } from "../../App";
import { Link } from "react-router-dom";
import { ICardData } from "../types";

// Card data as returned by the server.

interface Context {
  cards?: Array<ICardData>;
}

interface Props {
  userCards: boolean;
  title: string;
  subTitle: string;
  includeSearch: boolean;
}

export const CardsContext = createContext<Context>({});

function BizCards(props: Props) {
  const context = useContext(AppContext);

  // The user ID from the logged in user.
  const userId = context && context.userId.length > 0 ? context.userId : "0";

  const [cards, setCards] = useState<Array<ICardData>>([]);

  function getCards() {
    let res = props.userCards
      ? getRequest(`cards/user/${userId}`)
      : getRequest("cards");
    if (!res) return;
    res
      .then((response) => response.json())
      .then((json) => {
        setCards(json);
      });
  }

  function delCard(card: ICardData) {
    const res = deleteRequest(`cards/${card._id}`);
    if (!res) return;

    res
      .then((response) => response.json())
      .then((json) => {
        const updated = [...cards].filter(
          (cardItem) => cardItem._id !== card._id
        );
        setCards(updated);
      });
  }

  useEffect(getCards, [userId, props]);

  return (
    <CardsContext.Provider value={{ cards }}>
      <Title main={props.title} sub={props.subTitle} />
      {props.includeSearch ? <Search /> : <></>}
      {cards.length === 0 ? (
        <div className="alert alert-info m-5">No cards</div>
      ) : (
        <>
          {cards.map((card) => (
            <div key={card._id} className="card col-3">
              <img
                src={card.image.url}
                className="card-img-top"
                alt={card.image.alt}
              />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">Description: {card.subTitle}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Address: {card.address}</li>
                <li className="list-group-item">Phone: {card.phone}</li>
              </ul>
              {card.user_id === userId && (
                <div className="card-body">
                  <Link to={`/edit/${card._id}`} className="btn btn-default">
                    <i className="bi-pen"></i>
                  </Link>
                  <button onClick={() => delCard(card)} className="bi-trash">
                    Delete
                  </button>
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
