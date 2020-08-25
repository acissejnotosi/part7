import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);
  useEffect(() => {
    async function fetchMyAPI() {
      if (name) {
        try {
          const result = await axios.get(
            `https://restcountries.eu/rest/v2/name/${name}?fullText=true`
          );
          setCountry({ data: result.data, found: true });
        } catch (err) {
          setCountry({ found: false, data: null });
        }
      } else {
        setCountry(null);
      }
    }
    fetchMyAPI();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }
  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data[0].name} </h3>
      <div>capital {country.data[0].capital} </div>
      <div>population {country.data[0].population}</div>
      <img
        src={country.data[0].flag}
        height="100"
        alt={`flag of ${country.data[0].name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  );
};

export default App;
