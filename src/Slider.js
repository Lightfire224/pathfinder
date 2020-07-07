import React from 'react';

export default class Slider extends React.Component {

  state ={
    disabled: false
  }

  handleChange(value) {
    this.props.onChange(value)
  }

  render() {
    return (
      <div>
        <input 
          type="range" 
          value={this.props.value}
          onChange={(event) => this.handleChange(event.target.value)} 
          list={this.props.datalistID}
          min={this.props.min}
          disabled = {this.props.disabled ? "disabled" : null}
        />
        <datalist id={this.props.datalistID}>
        {
          this.props.options.map((value, idx) => {
            return <option key={idx} value={value} />;
          })
        }
        </datalist>
      </div>
    )
  }
}