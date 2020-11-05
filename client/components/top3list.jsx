import React, { useState, useEffect } from 'react';
import Article from './article.jsx';

function Top3list(props) {
  const [top3Articles, setTop3Articles] = useState([]);
  // const [flagTwo, setflagTwo] = useState(false)
  // fetch request that fetches top three articles


  useEffect(() => {
    if (props.flag === false) {
      props.handleFlag()
      fetch('/api/links/top3list')
        .then(res => res.json())
        .then(data => {
          setTop3Articles(data);
          ;
        })
        .catch(err => console.log(err));
    }
  });


  const articles = top3Articles.map(article => {
    // console.log(article)
    return <Article handleFlag={props.handleFlag} id={article.link_id} url={article.url} title={article.title} />;
  });
  if (articles.length < 1) {
    return (
      <div></div>
    )
  }

  return (
    <div id="top-list">
      <div id="top-articles-container">
        {articles}
      </div>
    </div>
  )
}


export default Top3list;