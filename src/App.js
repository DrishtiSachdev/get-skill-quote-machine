import React, {useState,useEffect} from 'react';
import './App.scss';
import COLOR_ARRAY from './colorArray.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(faTwitter)





let quoteDBUrl='https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

function App() {
  const[quote,setQuote]=useState("Everything has beauty, but not everyone can see.");
  const[author,setAuthor]=useState("Confucius");
  const[randomNumber,setRandomNumber]=useState(0);
  const[quotesArray,setQuoteArray]=useState(null);
  const [accentColor,setAccentColor]=useState('#282c34');


  const fetchQuote=async (url)=>{
      const response = await fetch(url);
      const parsedJSON=await response.json()
      setQuoteArray(parsedJSON.quotes)
      console.log(parsedJSON.quotes)
  }
  
  useEffect(()=>{
    fetchQuote(quoteDBUrl);
    
  },[quoteDBUrl])

  const generateQuote=()=>{
    let randomInteger=(Math.floor(quotesArray.length*Math.random()));
    setRandomNumber(randomInteger);
    setAccentColor(COLOR_ARRAY[randomInteger]);

    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
  }


  
  
  return (
    
    <div className="App">
      <header className="App-header" style={{backgroundColor:accentColor,color:accentColor}}>
      
      <div id="quote-box" style={{color:accentColor}}> 
       
     
        <p class="quotefill" id="text">
        {quote}
        
        </p>
        <p id="author">
         -{author}
        </p>
        <div class="buttons">
        <a id="tweet-quote" style={{backgroundColor:accentColor}} href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} -${author}`)}> <FontAwesomeIcon icon={faTwitter}/></a>
        
        <button id="new-quote" style={{backgroundColor:accentColor}} onClick={()=>{generateQuote()}}>Generate a random Quote</button>
       </div>
        </div>
        

        
      </header>
    </div>
    
  );
}

export default App;
