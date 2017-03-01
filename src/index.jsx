import React    from 'react';
import ReactDOM from 'react-dom';

import ArticleIncipit from './components/ArticleIncipit.jsx';



import './css/reset.css';
import './css/fonts.css';
import './css/base.css';

class UiSimplified extends React.Component {

  constructor(props) {

      super(props);

  };

  composeArticlesIncipitObjects(headingTag) {

    let articles = [];

    for ( let i = 0; i < 3; i++ ) {

      let obj = {
        headingTag  : headingTag,
        title       : 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
        paragraph   : 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
      }

      articles.push(obj);

    }

    return articles;

  }

  render() {

      let articles = this.composeArticlesIncipitObjects('h3');

      return(
        <div className="sw">
          <ArticleIncipit {...articles[0]} />
          <ArticleIncipit {...articles[1]} />
          <ArticleIncipit {...articles[2]} />
        </div>
      );
	}

}

ReactDOM.render(
  <UiSimplified />,
  document.getElementById('app')
);