import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/fonts.css';
import Header from './components/common/header/Header';
import Article from './components/article/Article';
import { userDevice } from './utils/UserDevice';
import { articleList } from '../server/static/Articles';

class UiSimplified extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      device: '',
      viewport: { width: '', height: '' },
      touchscreen: null,
    };

    this.doc = null;
    this.toggleSiteNavigation = this.toggleSiteNavigation.bind(this);
  }

  componentDidMount() {
    const ui = userDevice();
    this.setUiInfos(ui);
    window.addEventListener('resize', () => {
      const updatedUi = userDevice();
      this.setUiInfos(updatedUi);
    });
    this.doc = document.body;
  }

  setUiInfos(ui) {
    this.setState({
      device: ui.device,
      viewport: ui.viewport,
      touchscreen: ui.touchscreen,
    });
  }

  toggleSiteNavigation() {
    if (this.doc !== null) {
      this.doc.className = this.doc.className.indexOf('menu_open') > -1 ? '' : 'menu_open';
    }
  }

  fakeFetchArticlesList(headingTag) {
    const articles = [];
    for (let i = 0; i < articleList.length; i += 1) {
      const obj = articleList[i];
      obj.headingTag = headingTag;
      obj.device = this.state.device;
      obj.viewport = this.state.viewport;
      articles.push(<Article key={`article-${i}`} {...obj} />);
    }
    return articles;
  }

  headerObj() {
    return {
      device: this.state.device,
      viewport: this.state.viewport,
      toggleSiteNavigation: this.toggleSiteNavigation,
    };
  }

  render() {
    const articles = this.fakeFetchArticlesList('h3');
    const header = this.headerObj();
    return (
      <div>
        <Header {...header} />
        <div className="sw">
          {articles}
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <UiSimplified />,
  document.getElementById('app'),
);
