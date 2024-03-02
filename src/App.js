import React, { useEffect, useState } from 'react';
import axios from "axios";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  
  // Fetch countries on initial render
  useEffect(() => {
    axios.get(`https://crio-location-selector.onrender.com/countries`)
      .then((res) => {
        setCountries(res.data);
      })
      .catch(err => console.error("Error fetching countries:", err));
  }, []);

  // Fetch states when selectedCountry changes
  useEffect(() => {
    if (selectedCountry) {
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => {
          setStates(res.data);
          setSelectedState("");
          setCities([]);
          setSelectedCity("");
        })
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountry]);

  // Fetch cities when selectedState changes
  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((res) => { 
          setCities(res.data);
          setSelectedCity("");
        })
        .catch((err) => console.error("Error fetching cities:", err));
    }
  }, [selectedCountry, selectedState]);

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    setSelectedState("");
    setSelectedCity("");
    setStates([]);
    setCities([]);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedCity("");
    setCities([]);
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div className="city-selector" role="presentation">
      <h1>Select Location</h1>
      <div className="dropdowns-container">
        <div className="dropdown-item">
          <select value={selectedCountry} onChange={handleCountryChange} className='dropdown'>
            <option value="" disabled>Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-item">
          <select value={selectedState} onChange={handleStateChange} className='dropdown'>
            <option value="" disabled>Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div className="dropdown-item">
          <select value={selectedCity} onChange={handleCityChange} className='dropdown'>
            <option value="" disabled>Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
      {selectedCity && (
        <h2 className="result">
          You selected <span className='highlight'>{selectedCity},</span>
          <span className='fade'>
            {" "}
            {selectedState}, {selectedCountry}
          </span>
        </h2>
      )}
    </div>
  );  
}

export default App;
