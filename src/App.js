import React, { useState, useEffect } from "react";
import alanBtn, { alanBtnInstance } from "@alan-ai/alan-sdk-web";
import wordsToNumbers from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from './styles.js';
import logo from './assets/Leehaney.png';

const alanKey = process.env.REACT_APP_ALLAN_KEY;

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const { classes } = useStyles();

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if (command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if (command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1)
        } else if (command === 'open') {
          const parsedNumber = number.length > 2 ? wordsToNumbers(number, { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtnInstance.playText('Please try that again');
          } else if (article) {
            window.open(`${articles[number].url}`, '_blank');
          }
        }
      }
    })
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        <img alt="logo" src={logo} className={classes.alanLogo} />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  )
}

export default App;