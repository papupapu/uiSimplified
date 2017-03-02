/*

  TODO:

  - 100% responsive
  - parsing della URL all'atterraggio
  - controllare come gestire highlight e pagina corretta dei thumbnails all'atterraggio

*/

import './css/gallery.css';

import React from 'react';
import ReactDOM from 'react-dom';

import GallerySlider from './gallerySlider.jsx';
import GalleryVisore360 from './galleryVisore360.jsx';
import GalleryVisoreYT from './galleryVisoreYT.jsx';
import GalleryThumbnails from './galleryThumbnails.jsx';

class Gallery extends React.Component {

  constructor(props) {

    super(props);

    this.state = {
      items         : props.pictures,
      totItems      : Object.keys(props.pictures).length,
      totPictures   : Object.keys(props.pictures).length,
      totFloorplans : Object.keys(props.floorplans).length,
      totFoto360    : Object.keys(props.foto360).length,
      totVideo      : Object.keys(props.video).length,
      sliderIsUp    : false,
      cur           : 0,
      activeMedia   : 'foto',
      device        : ''
    };

    this.createSlider       = this.createSlider.bind(this);
    this.setSliderStatus    = this.setSliderStatus.bind(this);
    this.checkLoadingStatus = this.checkLoadingStatus.bind(this);
    this.changeMedia        = this.changeMedia.bind(this)
    this.setNewCur          = this.setNewCur.bind(this);
    this.thumbnailClick     = this.thumbnailClick.bind(this)

  };

  componentDidMount() {

    // creo lo slider (gallerySlider.jsx)
    this.refs.slider.createSlider();
    window.addEventListener('resize', this.handlePageResize.bind(this));

  };


  /* --- crea lista e bottoni + definisce i comportamenti --- */
  createSlider() {

    // calcolo le dimensioni del viewport e capisco se sono su che dispositivo sono
    let sw  = document.documentElement.clientWidth,
    isTouch = "ontouchstart"in window||navigator.msMaxTouchPoints>0;
    this.setState({
      device : sw>950&&!isTouch?"desktop":950>sw&&sw>670||sw>950&&isTouch?"tablet":"smartphone"
    });

    

  };


  /* --- comunico a tutti che lo slider è stato creato --- */
  setSliderStatus(state) {

    this.setState({
      sliderIsUp: state
    });

  };


  /* --- controllo se sono al punto di dover scatenare il preload delle immagini successive --- */
  checkLoadingStatus() {

    if (this.refs.slider.state.alreadyLoaded < this.state.totItems) {

      this.refs.slider.loadMoreElements();

    }

  };


  /* --- gestisco il resize della pagina --- */
  handlePageResize() {

    let span = this.refs.gallery.offsetWidth;
    // se le dimensioni del componente sono cambiate
    if (span != this.refs.slider.state.span) {

      // se lo slider è stato creato
      if (this.state.sliderIsUp) {
        // aggiorno la grafica
        this.refs.slider.updateSlider(span);

      }

    }

  };


  /* --- gestisco il passaggio da un media all'altro --- */
  changeMedia(newMedia) {

    // punto alle variabili corrette
    let items, totItems;
    switch(newMedia) {

      case 'video':
        items     = this.props.video;
        totItems  = this.state.totVideo;

        // registro il fatto che a tutti gli effetti lo slider è stato disintegrato
        this.setState({
          sliderIsUp: false
        });

        break;

      case 'foto360':
        items     = this.props.foto360;
        totItems  = this.state.totFoto360;

        // registro il fatto che a tutti gli effetti lo slider è stato disintegrato
        this.setState({
          sliderIsUp: false
        });

        break;

      case 'floorplan':
        items     = this.props.floorplans;
        totItems  = this.state.totFloorplans;
        break;

      default:
        items     = this.props.pictures;
        totItems  = this.state.totPictures;

    }

    // memorizzo il media attivo precedente per evitare errori nel cambiare il tutto
    let prevActiveMedia = this.state.activeMedia;

    // cambio lo stato, passando le variabili corrette e azzerando i contatori dello slider
    this.setState({
      activeMedia     : newMedia,
      cur             : 0,
      alreadyLoaded   : 1,
      items           : items,
      totItems        : totItems
    });

    // se sto vedendo uno dei due media che hanno bisogno dello slider e non arrivo da uno di quelli che non ne hanno bisogno
    if ((newMedia == 'foto' || newMedia == 'floorplan') && prevActiveMedia != 'foto360' && prevActiveMedia != 'video') {

      // se lo slider non è stato creato, è sufficiente cambiare la prima immagine
      if (!this.state.sliderIsUp) {

        this.refs.slider.refs.first.src = this.props.imgServerDomain+this.props.sizes[this.props.pageType]+items[1];

      // altrimenti devo smontare lo slider e ricrearlo
      } else {

        this.refs.slider.reCreateSlider(items,totItems);

      }

    }

  };


  /* --- aggiorno il contatore dell'immagine corrente --- */
  setNewCur(cur) {

    this.setState({
      cur: cur
    });

  };


  /* --- gestisco il click sul singolo thumbnail --- */
  thumbnailClick(key) {

    // se sto vedendo uno dei due media che hanno bisogno dello slider
    if (this.state.activeMedia == 'foto' || this.state.activeMedia == 'floorplan') {

      // se lo slider non è stato creato lo creo
      if (!this.state.sliderIsUp) {

        this.refs.slider.createSlider();

      // altrimenti mostro l'immagine corretta
      } else {

        this.refs.slider.slideToImg(key);

      }
    // altrimenti mi basta settare il nuovo stato
    } else {

      this.setNewCur(key);

    }

  };


  /* --- render --- */
  render() {

    let gallerySliderObj = Object.assign( {}, {
      sliderIsUp          : this.state.sliderIsUp,
      cur                 : this.state.cur,
      items               : this.state.items,
      totItems            : this.state.totItems,
      imgServerDomain     : this.props.imgServerDomain,
      sizes               : this.props.sizes,
      pageType            : this.props.pageType,
      device              : this.state.device,
      setNewCur           : this.setNewCur,
      setSliderStatus     : this.setSliderStatus
    }),

    galleryThumbnailsObj = Object.assign( {}, {
      items               : this.state.items,
      totItems            : this.state.totItems,
      totPictures         : this.state.totPictures,
      totFloorplans       : this.state.totFloorplans,
      totFoto360          : this.state.totFoto360,
      totVideo            : this.state.totVideo,
      imgServerDomain     : this.props.imgServerDomain,
      sliderIsUp          : this.state.sliderIsUp,
      cur                 : this.state.cur,
      thumbnailClick      : this.thumbnailClick,
      createSlider        : this.createSlider,
      checkLoadingStatus  : this.checkLoadingStatus,
      activeMedia         : this.state.activeMedia,
      changeMedia         : this.changeMedia,
      setSliderStatus     : this.setSliderStatus,
      checkLoadingStatus  : this.checkLoadingStatus
    } ),

    galleryVisore360Obj = Object.assign( {}, {
      item                : this.state.items[this.state.cur+1],
      imgServerDomain     : this.props.imgServerDomain
    } ),

    galleryVisoreYTObj = Object.assign( {}, {
      item                : this.state.items[this.state.cur+1]
    } );

    return(
      <div className={this.props.pageType}>
        <div className="casait-gallery" ref="gallery">
          {

            this.state.activeMedia == 'foto360' ?

              <GalleryVisore360 ref="visore360" {...galleryVisore360Obj} /> :

            this.state.activeMedia == 'video' ?

              <GalleryVisoreYT ref="visoreYT" {...galleryVisoreYTObj} /> :

              <GallerySlider ref="slider" {...gallerySliderObj} />

          }
          {

            this.props.hasThumbs ?

              <GalleryThumbnails ref="thumbnails" {...galleryThumbnailsObj} /> :

              null

          }
        </div>
      </div>
    );

  };

};

Gallery.propTypes = {
  pictures          : React.PropTypes.object,
  floorplans        : React.PropTypes.object,
  foto360           : React.PropTypes.object,
  video             : React.PropTypes.object,
  sizes             : React.PropTypes.object,
  pageType          : React.PropTypes.string,
  hasThumbs         : React.PropTypes.bool,
  imgServerDomain   : React.PropTypes.string
};

export default Gallery;
