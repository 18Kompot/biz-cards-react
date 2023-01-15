import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../App";
import CardList from "../../components/CardList";
import Title from "../../components/Title";
import { getRequest } from "../../services/apiService";
import { ICardData } from "../types";

function MyCards() {
  // To retrieve the logged in user ID
  const context = useContext(AppContext);
  const userId = context && context.userId.length > 0 ? context.userId : "0";
  
  const [cards, setCards] = useState<Array<ICardData>>([]);

  function getUserCards() {
    const res = getRequest(`cards/user/${userId}`);
    if (!res) {
      return;
    } 
    res
      .then((response) => response.json())
      .then((json) => {
        setCards(json);
      });
  }

  useEffect(getUserCards, [userId]);

  return (
    <>
      <Title main="My Cards" sub="Here you will find your cards" />
      <CardList cards={cards} />
    </>
  );
}

export default MyCards;
