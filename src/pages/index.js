import React, { useState, useRef } from "react"
import Check from '../assets/check.svg';
import Cross from '../assets/cross.svg';
import "../styles/index.css";
import visaSponsors from "../assets/visaSponsors.json";

const ResultsBox = ({ resultsString, isResultSuccessful }) => {
  if (!resultsString) {
    return null;
  }

  return (
    <div className="results-box">
      {
        isResultSuccessful
        ? <ResultsBoxSuccess resultsString={resultsString} />
        : <ResultsBoxFailure resultsString={resultsString} />
      }
    </div>
  );
};
const ResultsBoxFailure = ({ resultsString }) => (
  <>
    <p className="results-box__text">
      <b>{resultsString}</b> <span className="results-box__failure-text">cannot</span> sponsor a Tier 2 work visa
    </p>
    <p className="results-box__sub-text">
      Note that you need to enter the name the company used to register with HMRC. This may differ from their trade name.
    </p>
    <Cross className="icon__cross" />
  </>
);
const ResultsBoxSuccess = ({ resultsString }) => (
  <>
    <p> 
      <b>{resultsString}</b> <span className="results-box__success-text">can</span> sponsor a tier 2 visa 
    </p>
    <Check className="icon__check" />
  </>
);

const AutocompleteInput = ({ 
  autoCompleteSuggestions, 
  onChange, 
  value 
}) => {
  const blurTimeout = useRef();
  const inputRef = useRef();
  const [isInputInFocus, setIsInputInFocus] = useState(true);
  const isSuggestionBoxVisible = isInputInFocus && value;

  const suggestions = autoCompleteSuggestions.filter(suggestion => {
    const suggestionAllLowerCase = suggestion.toLowerCase();
    const valueAllLowerCase = value.toLowerCase();
    return suggestionAllLowerCase.includes(valueAllLowerCase);
  }).slice(0, 10);

  const onBlur = () => {
    blurTimeout.current = setTimeout(() => setIsInputInFocus(false));
  }
  const onFocus = () => {
    setIsInputInFocus(true);
    clearTimeout(blurTimeout.current);
  }

  return (
    <div 
      className="auto-complete" 
      onFocus={onFocus} 
      onBlur={onBlur} 
      tabIndex="-1"
    >
      <input 
        autoFocus
        ref={inputRef}
        className="auto-complete__input"
        onChange={e => onChange(e.target.value)}
        value={value} 
      />
      {
        isSuggestionBoxVisible && (
          <ul className="auto-complete__suggestions">
            { 
              suggestions.map(searchResult => 
                <li 
                  className="suggestions__text" 
                  key={searchResult} 
                  onClick={() => onChange(searchResult)}
                >
                  {searchResult}
                </li>
              ) 
            }
          </ul>
        )
      }
    </div>
  );
}

const IndexPage = () => {
  const [searchString, setSearchString] = useState("");
  const [resultsString, setResultsString] = useState("");

  // Don't want to update the results displayed until search button is pressed
  // Think it would be distracting if it updated live
  const onSearch = () => setResultsString(searchString);
  const isResultSuccessful = visaSponsors.some(sponsor => sponsor.toLowerCase() === resultsString.toLowerCase());

  return (
    <main id="main">
      <div id="content-container">
        <div className="introduction">
          <h2 className="header"> Can they sponsor me? </h2>
          <p className="intro__sub-header"> 
            Enter the name of any UK company to see if they are on HMRC's list of work visa sponsors
          </p>
        </div>
        <div className="auto-complete-container">
          <AutocompleteInput 
            autoCompleteSuggestions={visaSponsors}
            onChange={value => setSearchString(value)} 
            value={searchString} 
          />
          <button className="auto-complete-container__search" onClick={onSearch}> Search </button>
        </div>
        <ResultsBox 
          resultsString={resultsString} 
          isResultSuccessful={isResultSuccessful} 
        />
      </div>
    </main>
  )
}

export default IndexPage
