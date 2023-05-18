import Weather from "./Weather";

const Countries = ({ countries, handleClick }) => {
  const cLength = countries.length;
  if (cLength === 0) {
    return;
  } else if (cLength === 1) {
    return <Country country={countries[0]} />;
  } else if (cLength < 10) {
    return (
      <ul style={{ listStyle: "none", paddingLeft: "0", margin: "0" }}>
        {countries.map((country) => {
          const countryName = country?.name?.common;
          return (
            <li key={country?.name?.common}>
              {countryName}
              <button onClick={() => handleClick(country)}>show</button>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return (
      <p style={{ margin: "0" }}>Too many matches, specify another filter</p>
    );
  }
};

const Country = ({ country }) => {
  const img = country?.flags;
  return (
    <>
      <h1>{country.name?.common}</h1>
      <p>{country.capital}</p>
      <p>area: {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <>
        <img style={{ marginLeft: "10px" }} src={img.png} alt={img.alt} />
      </>
      <h2>Weather in {country.capital}</h2>
      <Weather city={country.capital} />
    </>
  );
};

export default Countries;
