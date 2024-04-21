export const Country = ({ data }) => {
  return (
    <>
      <h3>{data.name.common}</h3>
      <p>
        <b>Capital:</b> {data.capital}
        <br />
        <b>Area:</b> {data.area}
      </p>
      <h4>Languages:</h4>
      <ull>
        {Object.values(data.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ull>
      <br />
      <img
        src={data.flags.png}
        alt="flag"
        style={{ border: "1px solid black" }}
      />
    </>
  );
};
