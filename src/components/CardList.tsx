import { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { ICardData } from "../pages/types";
import { deleteRequest } from "../services/apiService";

interface Context {
  shownCards?: Array<ICardData>;
}

interface Props {
  cards?: Array<ICardData>;
}

const CardsContext = createContext<Context>({});

function CardList(props: Props) {
  // To retrieve the logged in user ID
  const context = useContext(AppContext);
  const userId = context && context.userId.length > 0 ? context.userId : "0";

  const [shownCards, setCards] = useState<Array<ICardData>>([]);
  useEffect(getCards, [props.cards]);

  function getCards() {
    let cards: Array<ICardData> = [];
    if (props.cards) {
      cards = props.cards;
    }
    return setCards(cards);
  }

  function delCard(card: ICardData) {
    const res = deleteRequest(`cards/${card._id}`);
    if (!res) return;

    res
      .then((response) => response.json())
      .then((json) => {
        const updated = [...shownCards].filter(
          (cardItem) => cardItem._id !== card._id
        );
        setCards(updated);
      });
  }

  return (
    <CardsContext.Provider value={{ shownCards }}>
      {shownCards.length === 0 ? (
        <div className="alert alert-info m-5">No cards</div>
      ) : (
        <div className="row row-cols-3 row-cols-md-5 g-4">
          {shownCards.map((card) => (
            <div key={card._id} className="col">
              <div className="card h-100">
                <img
                  src={card.image.url}
                  className="card-img-top img-thumbnail"
                  alt={card.image.alt}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">Description: {card.subTitle}</p>
                  <p className="card-text">Address: {card.address}</p>
                  <p className="card-text">Phone: {card.phone}</p>
                  {card.user_id === userId && (
                    <>
                      <Link
                        to={`/edit/${card._id}`}
                        className="btn btn-default"
                      >
                        <button className="bi-pen">Edit</button>
                      </Link>
                      <Link to={""} className="btn btn-default">
                        <button
                          onClick={() => delCard(card)}
                          className="bi-trash"
                        >
                          Delete
                        </button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </CardsContext.Provider>
  );
}

export default CardList;
