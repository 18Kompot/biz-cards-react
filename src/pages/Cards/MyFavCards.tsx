import CardList from "../../components/CardList";
import Title from "../../components/Title";

function MyFavCards() {
  return (
    <>
      <Title
        main="Your Favorite Cards List"
        sub="Here you can view cards that you added to favorites"
      />
      <CardList cards={undefined} />
    </>
  );
}

export default MyFavCards;
