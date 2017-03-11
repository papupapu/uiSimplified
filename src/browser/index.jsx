import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/fonts.css';
import Article from './components/article/Article';
import { userDevice } from './utils/UserDevice';

class UiSimplified extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      device: '',
      viewport: { width: '', height: '' },
    };

    this.articleList = [
      {
        heading: {
          title: 'Femminicidio, via libera dalla Camera a legge per tutelare gli orfani',
          subtitle: 'Rischia l\'ergastolo chi uccide la coniuge o la convivente. E ai figli delle vittime viene assicurato patrocinio legale e reversibilità della pensione',
          media: [
            {
              type: 'photo',
              src: '/images/surf1.jpg',
            },
            {
              type: 'photo',
              src: '/images/surf2.jpg',
            },
            {
              type: 'photo',
              src: '/images/surf3.jpg',
            },
            {
              type: 'photo',
              src: '/images/surf4.jpg',
            },
            {
              type: 'photo',
              src: '/images/surf5.jpg',
            },
            {
              type: 'photo',
              src: '/images/surf6.jpg',
            },
            {
              type: 'photo',
              src: '/images/surf7.jpg',
            },
            {
              type: 'photo',
              src: '/images/surf8.jpg',
            },
            {
              type: 'photo',
              src: '/images/surf9.jpg',
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
              type: 'photo',
              src: '/images/surf2.jpg',
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
              type: 'photo',
              src: '/images/surf3.jpg',
            },
          ],
        },
      },
    ];
  }

  componentDidMount() {
    const ui = userDevice();
    this.setUiInfos(ui);
    window.addEventListener('resize', () => {
      const updatedUi = userDevice();
      this.setUiInfos(updatedUi);
    });
  }

  setUiInfos(ui) {
    this.setState({
      device: ui.device,
      viewport: ui.viewport,
    });
  }

  fakeFetchArticlesList(headingTag) {
    const articles = [];
    for (let i = 0; i < this.articleList.length; i += 1) {
      const obj = this.articleList[i];
      obj.headingTag = headingTag;
      obj.device = this.state.device;
      obj.viewport = this.state.viewport;
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
