import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/fonts.css';
import Article from './components/article/Article';

class UiSimplified extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      device: '',
    };

    this.articleList = [
      {
        heading: {
          title: 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
          subtitle: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
          media: [
            {
              type: 'foto',
              src: '/images/surf.jpg',
            },
          ],
        },
      },
      {
        heading: {
          title: 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
          subtitle: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
          media: [
            {
              type: 'foto',
              src: '/images/surf.jpg',
            },
          ],
        },
      },
      {
        heading: {
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
      },
    ];
  }

  componentDidMount() {
    // The goal is to be ready with a convinient visual layout at first rendering
    // and then add user functionality when we know how to serve the best possible
    this.userDevice();
  }

  userDevice() {
    const sw = document.documentElement.clientWidth;
    const isTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints > 0;
    let device = '';
    if (sw > 950 && !isTouch) {
      device = 'desktop';
    } else if ((sw < 950 && sw > 670) || (sw > 950 && isTouch)) {
      device = 'tablet';
    } else {
      device = 'smartphone';
    }
    this.setState({ device });
  }

  fakeFetchArticlesList(headingTag) {
    const articles = [];
    for (let i = 0; i < this.articleList.length; i += 1) {
      const obj = this.articleList[i];
      obj.headingTag = headingTag;
      obj.device = this.state.device;
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
