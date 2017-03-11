import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/fonts.css';
import Article from './components/article/Article';
import { userDevice } from './utils/UserDevice';
import { articleList } from '../server/static/Articles';

class UiSimplified extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      device: '',
      viewport: { width: '', height: '' },
    };
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
    for (let i = 0; i < articleList.length; i += 1) {
      const obj = articleList[i];
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
