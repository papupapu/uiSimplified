import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router-dom';

import './css/reset.css';
import './css/default.css';

import Header from './components/common/header/Header';
import Modal from './components/common/modal/Modal';
import Overlayer from './components/common/overlayer/Overlayer';
import Footer from './components/common/footer/Footer';

import Home from './views/Home';

import { userDevice } from './utils/UserDevice';
import { disableScroll, enableScroll } from './utils/HandleMobileScroll';

import uiRouter from './routes';

const Cat = () => (
  <p>Cat</p>
);

class UiSimplified extends React.Component {

  constructor(props, context) {
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

  homeContent() {
    const { device, viewport } = this.state;
    return (
      <Home
        device={device}
        viewport={viewport}
        openModal={this.toggleSiteHiddenComponents}
      />
    );
  }    

  render() {
    const header = this.headerObj();
    const modal = this.state.modal ? this.modalObj() : null;
    const overlayer = { action: this.toggleSiteHiddenComponents };
    return (
      <div className="UiSimplified">
        <Header {...header} />
        <Route exact path="/" render={this.homeContent.bind(this)}/>
        <Route path="/cat" component={Cat}/>
        {modal}
        <Overlayer {...overlayer} />
        <Footer />
      </div>
    );
  }
}

UiSimplified.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default UiSimplified;  
