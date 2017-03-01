import React from 'react';
import ReactDOM from 'react-dom';

class ArticleIncipit extends React.Component {

	constructor(props) {

		super(props);

	};

	SEOTitle() {
		
		let textTitle = this.props.title,
			htmlTitle;

		switch (this.props.headingTag) {
			case 'h2':
				htmlTitle = <h2>{textTitle}</h2>;
				break;
			case 'h3':
				htmlTitle = <h3>{textTitle}</h3>;
				break;
			case 'h4':
				htmlTitle = <h4>{textTitle}</h4>;
				break;
			case 'h6':
				htmlTitle = <h5>{textTitle}</h5>;
				break;
			case 'h6':
				htmlTitle = <h6>{textTitle}</h6>;
				break;
			default:
				htmlTitle = <h1>{textTitle}</h1>;

		}
		
		return htmlTitle;

	}

	render() {

		let title 		= this.SEOTitle(),
			paragraph 	= this.props.paragraph;

		return(
			<div className="item">
				{title}
				<p>{paragraph}</p>
			</div>
		);
	}

}

export default ArticleIncipit;