import Search from "../../components/Search";
import Title from "../../components/Title";
import { useEffect, useState } from "react";
import { getRequest } from "../../services/apiService";
import { ICardData } from "../types";
import CardList from "../../components/CardList";

function BizCards() {
  const [cards, setCards] = useState<Array<ICardData>>([]);
  const [shownCards, setShownCards] = useState<Array<ICardData>>([]);

  function getCards() {
    const res = getRequest("cards");
    if (!res) return;
    res
      .then((response) => response.json())
      .then((json) => {
        setCards(json);
        setShownCards(json);
      });
  }

  function handleSearch(input: string) {
    let resultCards: Array<ICardData> = cards;
    if (input !== "") {
      resultCards = cards.filter((card: ICardData) => {
        return card.title.startsWith(input);
      });
    }
    setShownCards(resultCards);
  }

  useEffect(getCards, []);

  return (
    <>
      <Title main="Business Card App" sub="Here you will find business cards" />
      <Search handleSearch={handleSearch} />
      <CardList cards={shownCards} />
    </>
  );
}

export default BizCards;
