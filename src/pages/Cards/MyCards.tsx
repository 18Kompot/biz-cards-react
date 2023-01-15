import BizCards from "./BizCards";

function MyCards() {
  return (
    <>
      <BizCards
        userCards={true}
        title={"Your Cards List"}
        subTitle={"Here you can view your cards list"}
        includeSearch={false}
      />
    </>
  );
}

export default MyCards;
