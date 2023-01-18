import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../App";
import CardList from "../../components/CardList";
import Title from "../../components/Title";
import { getRequest } from "../../services/apiService";
import { ICardData } from "../types";

function MyFavCards() {
  // To retrieve the logged in user ID
  const context = useContext(AppContext);
  const userId = context && context.userId.length > 0 ? context.userId : "0";

  const [cards, setCards] = useState<Array<ICardData>>([]);

  function getFavoriteCards() {
    const res = getRequest(`cards/user/${userId}/favorites`);
    if (!res) {
      return;
    }

    res
      .then((response) => response.json())
      .then((json) => {
        setCards(json);
      });
  }

  useEffect(getFavoriteCards, [userId]);

  return (
    <>
      <Title
        main="Your Favorite Cards List"
        sub="Here you can view cards that you added to favorites"
      />
      <CardList cards={cards} />
    </>
  );
}

export default MyFavCards;
