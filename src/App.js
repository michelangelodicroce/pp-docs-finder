import React, { useState } from 'react';
import chunk1CSV from './chunk_1.csv';
import chunk2CSV from './chunk_2.csv';
import chunk3CSV from './chunk_3.csv';
import chunk4CSV from './chunk_4.csv';
import chunk5CSV from './chunk_5.csv';
import chunk6CSV from './chunk_6.csv';
import chunk7CSV from './chunk_7.csv';
import chunk8CSV from './last_1.csv';
import chunk9CSV from './last_2.csv';
import regexpu from 'regexpu'
import './App.css';

const csvFiles = [
  chunk1CSV,
  chunk2CSV,
  chunk3CSV,
  chunk4CSV,
  chunk5CSV,
  chunk6CSV,
  chunk7CSV,
  chunk8CSV,
  chunk9CSV,
];

const extractIdFromURL = (url) => {
  const urlPattern = regexpu('/[^/]+(?=/$|$)');
  const match = url.match(urlPattern);
  return match ? match[0] : url;
};

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const searchInCSV = (csvData) => {
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');
  
    const originalLocationIndex = headers.indexOf('OriginalLocation');
    const destinationLocationIndex = headers.indexOf('DestinationLocation');
    const destinationOwnerIndex = headers.indexOf('DestinationOwner');
  
    const searchValues = inputValue.split(',').map((value) => value.trim());
  
    const foundResults = [];
  
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i].split(',');
  
      for (let j = 0; j < searchValues.length; j++) {
        const searchValue = searchValues[j];
  
        if (row[originalLocationIndex].includes(searchValue)) {
          const result = {
            url: extractIdFromURL(row[destinationLocationIndex]),
            owner: row[destinationOwnerIndex]
          };
          foundResults.push(result);
          break; 
        }
      }
    }
  
    return foundResults;
  };

  const handleSearch = () => {
    setIsLoading(true);

    const searchPromises = csvFiles.map((file) =>
      fetch(file)
        .then((response) => response.text())
        .then((data) => searchInCSV(data))
    );

    Promise.all(searchPromises).then((resultsArray) => {
      const mergedResults = resultsArray.flat();
      if (mergedResults.length > 0) {
        setResults(mergedResults);
      } else {
        setResults(['Nessun risultato trovato']);
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="container">
      <h1 className="title">
        <img src="/logoPP.png" alt="Logo" className="logo" />
        ProntoPro Old Google Workspace Docs Finder
      </h1>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Inserisci le stringhe separate da virgola"
        />
        <button className="search-button" onClick={handleSearch}>
          Cerca
        </button>
      </div>

      <div className="loader-container">
        {isLoading && <div className="loader"></div>}
        {!isLoading && results.length > 0 ? (
          <div className="results-container">
            <h2 className="results-title">Risultati:</h2>
            <ul className="results-list">
              {results.map((result, index) => (
                <li key={index} className="result-item">
                  <a href={result.url} target="_blank" rel="noopener noreferrer">
                    {result.url}
                  </a>
                  <span className="owner">
                    <strong> Owner: </strong>{result.owner}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="no-results-message">
            {isLoading ? 'Caricamento...' : 'Nessun risultato trovato'}
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
