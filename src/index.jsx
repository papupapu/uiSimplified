import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/fonts.css';
import ArticleIncipit from './components/ArticleIncipit';

class UiSimplified extends React.Component {

  constructor(props) {
    super(props);

    this.articleList = [
      {
        title: 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
        paragraph: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
      },
      {
        title: 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
        paragraph: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
      },
      {
        title: 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
        paragraph: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
      },
    ];
  }

  composeArticlesIncipitObjects(headingTag) {
    const articles = this.articleList;

    for (let i = 0; i < articles.length; i + 1) {
      const obj = articles[i];
      obj.headingTag = headingTag;
      articles.push(obj);
    }

    return articles;
  }

  render() {
    const articles = this.composeArticlesIncipitObjects('h3');

    return (
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
  document.getElementById('app'),
);
