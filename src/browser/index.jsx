import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/fonts.css';
import Header from './components/common/header/Header';
import Modal from './components/common/modal/Modal';
import Overlayer from './components/common/overlayer/Overlayer';
import Article from './components/article/Article';
import { userDevice } from './utils/UserDevice';
import { disableScroll, enableScroll } from './utils/HandleMobileScroll';
import { articleList } from '../server/static/Articles';

class UiSimplified extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      device: '',
      viewport: { width: '', height: '' },
      touchscreen: null,
      modal: false,
    };

    this.doc = null;
    this.uiHiddenComponentsTriggers = ['menu_open', 'modal_open'];
    this.toggleSiteHiddenComponents = this.toggleSiteHiddenComponents.bind(this);
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

  toggleSiteHiddenComponents(evt) {
    if (this.doc !== null) {
      const docClass = this.doc.classList;
      let action = evt.target.className;
      let updateModalState = false;
      if (action.indexOf('_handle') > -1) {
        action = action.replace('_handle', '_open');
        updateModalState = action === 'modal_open';
        if (docClass.contains(action)) {
          docClass.remove(action);
          docClass.add('closing');
          setTimeout(() => { docClass.remove('closing'); }, 305);
          enableScroll();
        } else {
          this.uiHiddenComponentsTriggers.forEach(
            (oldaction) => {
              if (docClass.contains(oldaction) && oldaction !== action) {
                docClass.remove(oldaction);
                updateModalState = oldaction === 'modal_open';
              }
            },
          );
          docClass.add(action);
          disableScroll();
        }
        if (updateModalState) {
          this.setState({ modal: !this.state.modal });
        }        
      } else { // overlayer
        this.uiHiddenComponentsTriggers.forEach(
          (oldaction) => {
            if (docClass.contains(oldaction)) {
              docClass.remove(oldaction);
              docClass.add('closing');
              setTimeout(() => { docClass.remove('closing'); }, 305);
              enableScroll();
            }
          },
        );
        if (this.state.modal) {
          this.setState({ modal: false });
        }
      }
    }
  }

  articlesList(titleTag) {
    const articles = [];
    for (let i = 0; i < articleList.length; i += 1) {
      const obj = articleList[i];
      obj.titleTag = titleTag;
      obj.device = this.state.device;
      obj.viewport = this.state.viewport;
      obj.type = 'list';
      articles.push(<Article key={`article-${i}`} {...obj} />);
    }
    return articles;
  }

  headerObj() {
    return {
      device: this.state.device,
      viewport: this.state.viewport,
      toggleSiteNavigation: this.toggleSiteHiddenComponents,
    };
  }

  render() {
    const header = this.headerObj();
    const articles = this.articlesList('h3');
    const modal = this.state.modal ? <Modal close={this.toggleSiteHiddenComponents} /> : null;
    const overlayer = { action: this.toggleSiteHiddenComponents };
    return (
      <div>
        <Header {...header} />
        <div className="sw">
          <a
            href={null}
            className="modal_handle"
            onClick={this.toggleSiteHiddenComponents}
          >modale</a>
          {articles}
        </div>
        {modal}
        <Overlayer {...overlayer} />
      </div>
    );
  }
}

ReactDOM.render(
  <UiSimplified />,
  document.getElementById('app'),
);
