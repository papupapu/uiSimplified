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
        media: [
          {
            type: 'foto',
            src: '/images/surf.jpg',
          },
          {
            type: 'foto',
            src: '/images/surf.jpg',
          },
          {
            type: 'foto',
            src: '/images/surf.jpg',
          },
        ],
      },
      {
        title: 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
        paragraph: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
        media: [
          {
            type: 'foto',
            src: '/images/surf.jpg',
          },
        ],
      },
      {
        title: 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
        paragraph: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
        media: [
          {
            type: 'foto',
            src: '/images/surf.jpg',
          },
        ],
      },
    ];
  }

  composeArticlesIncipitObjects(headingTag) {
    const articles = [];

    for (let i = 0; i < this.articleList.length; i += 1) {
      const obj = this.articleList[i];
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
