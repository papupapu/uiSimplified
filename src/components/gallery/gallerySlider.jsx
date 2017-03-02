import React from 'react';
import ReactDOM from 'react-dom';

class GallerySlider extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      maxToLoad     : 5,
      alreadyLoaded : 1,
      span          : 0,
      startX        : 0,
      startY        : 0,
      deltaX        : 0,
      deltaY        : 0
    };

    this.createSlider   = this.createSlider.bind(this);
    this.reCreateSlider = this.reCreateSlider.bind(this);
    this.updateSlider   = this.updateSlider.bind(this);
    this.prevClick      = this.prevClick.bind(this);
    this.nextClick      = this.nextClick.bind(this);
    this.touchStart     = this.touchStart.bind(this);
    this.touchMove      = this.touchMove.bind(this);
    this.touchEnd       = this.touchEnd.bind(this);

  };


  /* --- creo lo slider a partire dall'immagine originale --- */
  createSlider() {

    // evito di crearlo n volte, valà...
    if (!this.props.sliderIsUp) {

      // calcolo quante slide devo creare
      let toLoad  = this.props.totItems<=this.state.maxToLoad ? this.props.totItems : this.state.maxToLoad,
      // calcolo quanto deve esser larga ciascuna slide (a partire dalle dimensioni totali del componente renderizzato)
      span        = this.refs.slider.offsetWidth,
      list        = document.createElement('UL'),
      li          = document.createElement('LI');

      li.style.width = span+'px';

      // clono l'immagine originale come figlia della prima slide
      li.appendChild(this.refs.first);
      list.appendChild(li);
      this.refs.slider.appendChild(list);

      // creo le slide successive
      for (let i = 2; i <= toLoad; i++) {

        let newLi   = document.createElement('LI'),
        newImg      = document.createElement('IMG');

        newLi.style.width = span+'px';
        newImg.src = this.props.imgServerDomain+this.props.sizes[this.props.pageType]+this.props.items[i];

        newLi.appendChild(newImg);
        list.appendChild(newLi);

      }

      // dimensioni della parte che 'scivola'
      this.refs.slider.style.width = (span*this.props.totItems)+'px';
      // posizione della freccia next
      this.refs.next.style.left = span-30+'px';
      this.refs.next.style.display = 'block';

      this.setState({
        span: span,
        alreadyLoaded: toLoad
      });

      // comunico a tutti che lo slider è pronto
      this.props.setSliderStatus(true);

    }

  };


  /* --- distruggo lo slider e lo ricreo in modo accolga i nuovi media --- */
  reCreateSlider(items, totItems) {

    let toLoad  = totItems<=this.state.maxToLoad ? totItems : this.state.maxToLoad,
    span        = this.refs.span.offsetWidth,
    list        = this.refs.slider.querySelector('ul');

    list.innerHTML = '';

    for (let i = 1; i <= toLoad; i++) {

      let newLi   = document.createElement('LI'),
      newImg      = document.createElement('IMG');

      newLi.style.width = span+'px';
      newImg.src = this.props.imgServerDomain+this.props.sizes[this.props.pageType]+items[i];

      newLi.appendChild(newImg);
      list.appendChild(newLi);

    }

    this.refs.slider.style.width      = (span*totItems)+'px';
    this.refs.slider.style.transform  = 'translate(0,0)';
    this.refs.slider.style.transition = 'none';

    this.refs.prev.style.display      = 'none';
    this.refs.next.style.display      = 'block';

    this.setState({
      span: span,
      alreadyLoaded: toLoad
    });

  };


  /* --- ricalcolo le dimensioni dello slider al resize della finestra --- */
  updateSlider(span) {

    // assegno a slider e figli le nuove dimensioni
    this.refs.slider.style.width = (span*this.props.totItems)+'px';
    let items = this.refs.slider.querySelector('ul').childNodes;
    for (let i = 0; i < items.length; i++) {
      items[i].style.width = span+'px';
    }

    // riposiziono lo slider senza animazione
    this.refs.slider.style.transform = 'translate(-'+span*this.props.cur+'px,0)';
    this.refs.slider.style.transition = 'none';
    this.refs.next.style.left = span-30+'px';

    // aggiorno il valore di span
    this.setState({
      span: span
    });

    // riattivo le animazioni
    setTimeout(
      () => {
        this.refs.slider.style.transition = '';
      },15
    )

  };


  /* --- gestisco il preload delle immagini --- */
  loadMoreElements() {

    // calcolo quali/quante immagini devo inserire in coda allo slider
    let start = this.state.alreadyLoaded+1,
    diff      = (this.state.alreadyLoaded/this.state.maxToLoad)+1,
    toLoad    = this.props.totItems<=(this.state.maxToLoad*diff) ? this.props.totItems : this.state.maxToLoad*diff,
    list      = this.refs.slider.querySelector('ul');

    for (let i = start; i <= toLoad; i++) {

      let newLi = document.createElement('LI'),
      newImg    = document.createElement('IMG');

      newLi.style.width = this.state.span+'px';
      newImg.src = this.props.imgServerDomain+this.props.sizes[this.props.pageType]+this.props.items[i];

      newLi.appendChild(newImg);
      list.appendChild(newLi);

    }

    // aggiorno le dimensioni della parte che 'scivola'
    this.refs.slider.style.width = (this.state.span*this.props.totItems)+'px';

    this.setState({
      alreadyLoaded: toLoad
    });

  };


  /* --- click su freccia 'avanti' --- */
  nextClick(e) {
    e.preventDefault();

    if (this.props.cur < this.props.totItems-1) {

      let newCur = this.props.cur+1;

      // se sono su un dispositivo touch
      if (this.props.device != 'desktop') {
        // attivo l'animazione per il post touchEnd
        this.refs.slider.style.transition = 'transform .3s ease-out';
        // e la rimuovo alla fine del tempo che impiega
        setTimeout(
          () => {
            this.refs.slider.style.transition = 'transform 0 ease-out';
          },
          315 // l'animazione dura 300ms: mi prendo un po' più di tempo prima di segarla
        );
      }

      // animo lo slider
      this.refs.slider.style.transform = 'translate(-'+this.state.span*newCur+'px,0)';
      // mostro la freccia 'indietro'
      this.refs.prev.style.display = 'block';

      // se sono all'ultima slide, nascondo la freccia 'avanti'
      if (newCur==this.props.totItems-1) {
        this.refs.next.style.display = 'none';
      }

      // se arrivo alla terza immagine è il caso di scatenare il preload
      if (newCur == this.state.alreadyLoaded-3 && this.state.alreadyLoaded < this.props.totItems) {
        this.loadMoreElements();
      }

      // comunico a tutti la nuova immagine corrente
      this.props.setNewCur(newCur);
    }

  };


  /* --- click su freccia 'indietro' --- */
  prevClick(e) {
    e.preventDefault();

    if (this.props.cur > 0) {

        let newCur = this.props.cur-1;

        // se sono su un dispositivo touch
        if (this.props.device != 'desktop') {
          // attivo l'animazione per il post touchEnd
          this.refs.slider.style.transition = 'transform .3s ease-out';
          // e la rimuovo alla fine del tempo che impiega
          setTimeout(
            () => {
              this.refs.slider.style.transition = 'transform 0 ease-out';
            },
            315 // l'animazione dura 300ms: mi prendo un po' più di tempo prima di segarla
          );
        }

        // animo lo slider
        this.refs.slider.style.transform = 'translate(-'+this.state.span*newCur+'px,0)';
        // mostro la freccia 'avanti'
        this.refs.next.style.display = 'block';

        // se sono alla prima slide nascondo la freccia 'indietro'
        if (newCur==0){
            this.refs.prev.style.display = 'none';
        }

        // comunico a tutti la nuova immagine corrente
        this.props.setNewCur(newCur);

    }

  };


  /* --- cambio la posizione dello slider al click sui thumbnails --- */
  slideToImg(key) {

    let newCur = key;

    // se sono su un dispositivo touch
    if (this.props.device != 'desktop') {
      // attivo l'animazione per il post touchEnd
      this.refs.slider.style.transition = 'transform .3s ease-out';
      // e la rimuovo alla fine del tempo che impiega
      setTimeout(
        () => {
          this.refs.slider.style.transition = 'transform 0 ease-out';
        },
        315 // l'animazione dura 300ms: mi prendo un po' più di tempo prima di segarla
      );
    }

    // animo lo slider
    this.refs.slider.style.transform = 'translate(-'+this.state.span*newCur+'px,0)';

    // se sono alla prima slide, nascondo la freccia 'indietro'
    if (newCur==0){
      this.refs.prev.style.display = 'nonde';
    } else {
      this.refs.prev.style.display = 'block';
    }

    // se sono all'ultima slide, nascondo la freccia 'aventi'
    if (newCur==this.props.totItems-1) {
      this.refs.next.style.display = 'none';
    } else {
      this.refs.next.style.display = 'block';
    }

    // se arrivo alla terza immagine è il caso di scatenare il preload
    if (newCur == this.state.alreadyLoaded-3 && this.state.alreadyLoaded < this.props.totItems) {
      this.loadMoreElements();
    }

    // comunico a tutti la nuova immagine corrente
    this.props.setNewCur(newCur);

  };


  /* -- swipe: touchStart -- */
  touchStart(event) {

    // evito che il tap crei lo slider e tenti di animarlo
    if (this.props.sliderIsUp) {

      // evito che lo swipe trascini il body
      var body = document.getElementsByTagName('body')[0];
      body.className = "modal_open";

      // memorizzo le coordinate di inizio dell oswipe
      let touches = event.touches[0];
      this.setState({
        startX: touches.pageX,
        startY: touches.pageY
      });

     }

  };


  /* --- swipe: touchMove -- */
  touchMove(event) {

    // evito che il tap crei lo slider e tenti di animarlo
    if (this.props.sliderIsUp){

      // calcolo il delta tra la posizione iniziale e quella attuale dello swipe e lo memorizzo
      let touches   = event.touches[0],
      deltaX        = touches.pageX - this.state.startX,
      deltaY        = touches.pageY - this.state.startY;
      this.setState({
        deltaX: deltaX,
        deltaY: deltaY
      });

      // se ho il sospetto che lo swipe sia più verticale che orizzontale, blocco tutto
      if (Math.abs(deltaY) > 50 && Math.abs(deltaY) > Math.abs(deltaX)) {
        return;
      // altrimenti animo lo slider perchè segua il movimento dello swipe
      } else {
        deltaX+=((this.state.span*this.props.cur)*-1);
        this.refs.slider.style.transform = 'translate('+deltaX+'px,0)';
      }

    }

  };


  /* --- swipe: touchMove -- */
  touchEnd(event) {

    // evito che il tap crei lo slider e tenti di animarlo
    if (this.props.sliderIsUp) {

      // rimuovo il blocco allo swipe sul body
      var body = document.getElementsByTagName('body')[0];
      body.className = "";

      // se ho swipato di più di 125px a destra o sinistra chiamo prevClick o nextClick
      if ( Math.abs(this.state.deltaX) > 125 ) {
        if (this.state.deltaX < 0) {
          this.nextClick(event);
        } else {
          this.prevClick(event);
        }
      // altrimenti ripristino la posizione iniziale
      } else {
        this.refs.slider.style.transform = 'translate(-'+this.state.span*this.props.cur+'px,0)';
        this.refs.slider.style.transition = 'transform .3s ease-out';
        setTimeout(
          () => {
            this.refs.slider.style.transition = 'transform 0 ease-out';
          },
          315 // l'animazione dura 300ms: mi prendo un po' più di tempo prima di segarla
        );
      }

      // azzero le coordinate dello swipe
      this.setState({
        startX: 0,
        startY: 0,
        deltaX: 0,
        deltaY: 0
      });

    }

  };


  /* --- render --- */
  render() {

    // estraggo l'src della prima immagine da mostrare
    let firstImg  = this.props.imgServerDomain+this.props.sizes[this.props.pageType]+this.props.items[1],
    // se sono su un dispositivo touch, lo slider non deve avere alcuna transizione: ci pensa lo swipe
    isTouch       = this.props.device != 'desktop',
    className     = !isTouch ? 'casait-slider notouch' : 'casait-slider';

    return(
      <div ref="span">
        <div className={className} ref="slider" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd} onTouchMove={this.touchMove}>
            <img ref="first" className="first" src={firstImg} onClick={this.createSlider} />
        </div>
        <p>{this.props.totItems}</p>
        <a href="" className="prev" ref="prev" onClick={this.prevClick}>&lt;</a>
        <a href="" className="next" ref="next" onClick={this.nextClick}>&gt;</a>
      </div>
    );

  }

};

GallerySlider.propTypes = {
  sliderIsUp          : React.PropTypes.bool,
  cur                 : React.PropTypes.number,
  items               : React.PropTypes.object,
  totItems            : React.PropTypes.number,
  imgServerDomain     : React.PropTypes.string,
  sizes               : React.PropTypes.object,
  pageType            : React.PropTypes.string,
  device              : React.PropTypes.string,
  setNewCur           : React.PropTypes.func,
  setSliderStatus     : React.PropTypes.func
};

export default GallerySlider;
