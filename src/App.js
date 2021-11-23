import './normalize.css';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [currencyResult, setCurrencyResult] = useState([]); //empty list
  const [availableCountries, setAvailableCountries] = useState([]);
  const [chosenCountries, setChosenCountries] = useState([]);


  function getHeight(num) {
    let val = 0;
    val = (1/(num)*100);
    return val;
  }

  function onChooseCountry(index) {
    // Get the chosen chaser, and add to the end
    const country = availableCountries[index];
    setChosenCountries([
      ...chosenCountries, // include existing chasers
      country, // and the new one
    ]);

    // Remove the item at index from the array
    setAvailableCountries([
      ...availableCountries.slice(0, index), // include up to index
      ...availableCountries.slice(index + 1), // and after index
    ]);
  }

  function removeCountry(index) {
    // Get the chaser and add to the end of available
    const country = chosenCountries[index];
    setAvailableCountries([
      ...availableCountries, // include existing characters
      country,           // and the new one
    ]);

    // Remove the item at index from the array
    setChosenCountries([
      ...chosenCountries.slice(0, index),  // include up to index
      ...chosenCountries.slice(index + 1), // and after index
    ]);
  }

  function doFetch() {
    setIsLoading(true);
    const url = "https://kc-exchangeratesapi.herokuapp.com/latest"
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setIsLoading(false);
        console.log('Data is back:', data);
        console.log('Data rates only:', data.rates);
        const ratesArray = Object.entries(data.rates);
        setCurrencyResult(ratesArray);

      });
  }
 useEffect(doFetch, []);

  return (
    <div className="App">
        <header className="Header">
            <h1 className="Header-title">CURRENCY</h1>
        </header>
        <div> 
          {
            currencyResult.map(item => (
                <button className= "special" onClick={() => onChooseCountry(item)}>{item[0]}</button> 
              ))
          }

        </div>
        <main className="MainContainer">
          {isLoading ? <div className="loading"></div> : null}
          <div className="BarChart">
            <div className="BarChart-bar">
            {
              currencyResult.map(item => (
              <div className={`BarChart-bar ${item[0]}`} style={{height: getHeight(item[1])}}>
                <h1 className= "BarChart--title">{item[0]}</h1>
                <p>{item[1]}</p> 
              </div>
              ))
            }
            </div>
          </div>
        </main>
    </div>
  );
}

export default App;
