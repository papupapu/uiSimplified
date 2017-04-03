import React from 'react';
import ReactDom from 'react-dom';

import './css/reset.css';
import './css/default.css';

import Header from './components/common/header/Header';
import Modal from './components/common/modal/Modal';
import Overlayer from './components/common/overlayer/Overlayer';
import List from './components/common/List';
import Footer from './components/common/footer/Footer';

import { userDevice } from './utils/UserDevice';
import { disableScroll, enableScroll } from './utils/HandleMobileScroll';

import { ARTICLELIST_MAX_ITEMS } from '../server/configurations/Articles';
import { articleList } from '../server/static/Articles';

import BasicExample from './routes';

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
    this.modalType = '';
    this.modalData = null;
    this.uiHiddenComponents = ['menu', 'modal'];
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

  toggleSiteHiddenComponents(evt, obj) {
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
          this.uiHiddenComponents.forEach(
            (component) => {
              const oldaction = `${component}_open`;
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
          this.modalType = !this.state.modal ? evt.target.getAttribute('data-action') : '';
          this.modalData = !this.state.modal && obj !== null ? obj : null;
          this.setState({ modal: !this.state.modal });
        }
      } else { // overlayer
        this.uiHiddenComponents.forEach(
          (component) => {
            const oldaction = `${component}_open`;
            if (docClass.contains(oldaction)) {
              docClass.remove(oldaction);
              docClass.add('closing');
              setTimeout(() => { docClass.remove('closing'); }, 305);
              enableScroll();
            }
          },
        );
        if (this.state.modal) {
          this.modalType = '';
          this.modalData = null;
          this.setState({ modal: false });
        }
      }
    }
  }

  headerObj() {
    return {
      toggleSiteNavigation: this.toggleSiteHiddenComponents,
    };
  }

  modalObj() {
    return (
      <Modal
        type={this.modalType}
        data={this.modalData}
        close={this.toggleSiteHiddenComponents}
      />
    );
  }

  articlesList(titleTag, maxToShow = ARTICLELIST_MAX_ITEMS) {
    const { device, viewport } = this.state;
    return (
      <List
        titleTag={titleTag}
        device={device}
        viewport={viewport}
        maxToShow={maxToShow}
        list={articleList}
        contentType={'articles'}
        openModal={this.toggleSiteHiddenComponents}
      />
    );
  }

  render() {
    const header = this.headerObj();
    const content = this.articlesList('h3');
    const modal = this.state.modal ? this.modalObj() : null;
    const overlayer = { action: this.toggleSiteHiddenComponents };
    return (
      <div className="UiSimplified">
        <Header {...header} />
        <BasicExample />
        {modal}
        <Overlayer {...overlayer} />
        <Footer />
      </div>
    );
  }
}

ReactDom.render(<UiSimplified />, document.querySelector('#app'));
