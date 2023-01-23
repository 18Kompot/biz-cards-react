import { createContext, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { ICardData } from "../pages/types";
import { deleteRequest, getRequest, postRequest } from "../services/apiService";

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
  const isLoggedIn = context && context.userName.length > 0;
  const userId = context && context.userId.length > 0 ? context.userId : "0";

  const [shownCards, setCards] = useState<Array<ICardData>>([]);
  useEffect(getCards, [props.cards]);

  function getCards() {
    let cards: Array<ICardData> = [];
    if (props.cards) {
      cards = props.cards;
      cards.forEach((card: ICardData) => {
        card.is_favorite = false;
      });
    }

    if (!isLoggedIn) {
      return setCards(cards);
    }

    const res = getRequest(`cards/user/${userId}/favorites`);
    if (res) {
      res
        .then((response) => response.json())
        .then((json) => {
          json.forEach(async (favoriteCard: ICardData) => {
            cards.forEach(async (card) => {
              if (favoriteCard._id === card._id) {
                card.is_favorite = true;
              }
            });
          });
          setCards(cards);
        });
    }
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

  function toggleFavorite(card: ICardData) {
    card.is_favorite = !card.is_favorite;

    // The card was unfavorited.
    if (!card.is_favorite) {
      const res = deleteRequest(`cards/user/${userId}/favorites/${card._id}`);
      if (!res) {
        return;
      }

      res
        .then((response) => response.json())
        .then((json) => {
          setCards([...shownCards]);
        });
    }

    // The card was favorited.
    else {
      const res = postRequest(
        `cards/user/${userId}/favorites/${card._id}`,
        {
          circus:
            "http://www.gingl.at/musikagentur/wp-content/uploads/Clown1.jpg",
        },
        false
      );

      if (!res) {
        return;
      }

      res
        .then((response) => response.json())
        .then((json) => {
          setCards([...shownCards]);
        });
    }
  }

  return (
    <CardsContext.Provider value={{ shownCards }}>
      {shownCards.length === 0 ? (
        <div className="alert alert-info m-5">No cards</div>
      ) : (
        <div className="row row-cols-3 row-cols-md-4 g-4">
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
                      <div className="col">
                        <Link
                          to={`/edit/${card._id}`}
                          className="btn btn-secondary text-white m-1"
                        >
                          <span className="px-1 bi-pen"></span>
                        </Link>

                        <Link to={""} className="btn btn-danger text-white">
                          <div onClick={() => delCard(card)}>
                            <span className="px-1 bi-trash"></span>
                          </div>
                        </Link>

                        <Link
                          to={`/about/${card._id}`}
                          className="btn btn-secondary text-white m-1"
                        >
                          <span className="px-1 bi-info-circle"></span>
                        </Link>

                        {isLoggedIn ? (
                          <div
                            onClick={() => toggleFavorite(card)}
                            className="btn btn-transparent text-white m-1"
                          >
                            <i
                              className={`px-1 bi ${
                                card.is_favorite ? "bi-star-fill" : "bi-star"
                              } text-dark`}
                            ></i>
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
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
