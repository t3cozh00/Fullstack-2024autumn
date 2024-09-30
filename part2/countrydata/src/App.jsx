import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [value, setValue] = useState(""); //input value
  const [countries, setCountries] = useState([]); // store all countries data
  const [filteredCountries, setFilteredCountries] = useState([]); // store filtered countries data
  const [selectedCountry, setSelectedCountry] = useState(null); // store selected country data
  const [weatherData, setWeatherData] = useState(null); // store weather data

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
    // Reset selected country when filtering changes
    setSelectedCountry(null);
  }, [value, countries]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onSearch = (e) => {
    e.preventDefault();
  };

  const fetchWeatherdata = (capital) => {
    const api_key = "a69a70ef8224da7e9723242543880567";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`; // Use 'metric' to get Celsius directly;

    axios.get(url).then((response) => {
      setWeatherData(response.data);
    });
  };

  const handleShowCountry = (country) => {
    setSelectedCountry(country);
    fetchWeatherdata(country.capital); // Fetch weather data for the selected country's capital
  };

  const handleBack = () => {
    setSelectedCountry(null); // Reset selected country to go back to the list
    setValue(""); // Clear the input value to return to search
  };

  const output = () => {
    if (value === "") {
      return null;
    }

    if (selectedCountry || filteredCountries.length === 1) {
      const country = selectedCountry || filteredCountries[0];
      //const celsiusTemp = Number(weatherData.main.temp) - 273.15;

      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>
            <strong>Capital:</strong> {country.capital}
          </p>
          <p>
            <strong>Area:</strong> {country.area}
          </p>
          <strong>Languages:</strong>
          <ul>
            {Object.values(country.languages).map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width="150"
          />
          {weatherData && (
            <div>
              <h3>Weather in {country.capital}</h3>
              <p>
                <strong>Temperature:</strong> {weatherData.main.temp} Celsius
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />
              <p>
                <strong>Wind:</strong> {weatherData.wind.speed} m/s
              </p>
            </div>
          )}

          <button onClick={handleBack}>Back</button>
        </div>
      );
    }

    if (filteredCountries.length <= 10) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li style={{ listStyleType: "none" }} key={country.cca3}>
              {country.name.common}
              <button onClick={() => handleShowCountry(country)}>show</button>
            </li>
          ))}
        </ul>
      );
    }

    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
  }; // add conditional rendering here

  return (
    <div style={{ textAlign: "left" }}>
      <form onSubmit={onSearch}>
        <h1>Find Countries</h1>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          style={{ width: "350px", height: "40px", fontSize: "25px" }}
        />
      </form>
      <div>{output()}</div>
    </div>
  );
}

export default App;
