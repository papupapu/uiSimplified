import React from 'react';

class TextInput extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    const required = this.props.required ? ' *' : null;
    const label = this.props.label !== '' ? <label htmlFor={this.props.name}>{this.props.label}{required}</label> : null;
    return (
      <div className={this.props.class}>
        {label}
        <input
          type="text"
          id={this.props.name}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }

}

TextInput.propTypes = {
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  class: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  label: React.PropTypes.string,
  required: React.PropTypes.bool,
};

TextInput.defaultProps = {
  name: '',
  value: '',
  class: '',
  placeholder: '',
  label: '',
  required: false,
};

export default TextInput;
