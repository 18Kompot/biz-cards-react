import Search from "../../components/Search";
import Title from "../../components/Title";
import { ICardData } from "../../auth/CreateCard";
import { createContext, useEffect, useState } from "react";
import { getRequest } from "../../services/apiService";

interface Context {
  cards?: Array<ICardData>;
}

export const CardsContext = createContext<Context>({});

function BizCards() {
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
      {cards.length === 0 && (
        <div className="alert alert-info m-5">No cards</div>
      )}
    </CardsContext.Provider>
  );
}

export default BizCards;
