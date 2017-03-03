import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/fonts.css';
import Article from './components/article/Article';

class UiSimplified extends React.Component {

  constructor(props) {
    super(props);

    this.articleList = [
      {
        title: 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
        subtitle: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
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
        subtitle: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
        media: [
          {
            type: 'foto',
            src: '/images/surf.jpg',
          },
        ],
      },
      {
        title: 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
        subtitle: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
        media: [
          {
            type: 'foto',
            src: '/images/surf.jpg',
          },
        ],
      },
    ];
  }

  fakeFetchArticlesList(headingTag) {
    const articles = [];
    for (let i = 0; i < this.articleList.length; i += 1) {
      const obj = this.articleList[i];
      obj.headingTag = headingTag;
      articles.push(obj);
    }
    return articles;
  }

  render() {
    const articles = this.fakeFetchArticlesList('h3');
    return (
      <div className="sw">
        <Article {...articles[0]} />
        <Article {...articles[1]} />
        <Article {...articles[2]} />
      </div>
    );
  }
}

ReactDOM.render(
  <UiSimplified />,
  document.getElementById('app'),
);
