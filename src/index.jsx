import React from 'react';
import ReactDOM from 'react-dom';

class UiSimplified extends React.Component {

  constructor(props) {

      super(props);

  };

  render() {
      return(
        <div>
          <section className="gallerycont">
            <div className="sw">
                <div className="srpItem">
        			aa
                </div>              
            </div>
          </section>

        </div>
      );
	}

}

ReactDOM.render(
  <UiSimplified />,
  document.getElementById('app')
);