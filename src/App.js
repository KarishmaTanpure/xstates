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
  
  useEffect(() => {
    axios.get("https://crio-location-selector.onrender.com/countries")
      .then((res) => setCountries(res.data))
      .catch(err => console.error("Error fetching countries:", err));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`)
        .then((res) => setStates(res.data))
        .catch((err) => console.error("Error fetching states:", err));
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      axios.get(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`)
        .then((res) => setCities(res.data))
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
    <div className="city-selector">
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
        {selectedCountry && (
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
        )}
        {selectedState && (
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
        )}
      </div>
      <div className="selected-location">
        {selectedCity && (
          <p>You selected: {selectedCity}, {selectedState}, {selectedCountry}</p>
        )}
      </div>
    </div>
  );
}

export default App;
