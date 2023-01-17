interface Props {
  main: string;
  sub: string;
}

function Title({ main, sub }: Props) {
  return (
    <>
      <h2 className="text-center">{main}</h2>
      <br />
      <h3 className="text-muted text-center fw-normal mb-4">{sub}</h3>
    </>
  );
}

export default Title;
