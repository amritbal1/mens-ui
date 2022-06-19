import React, { Component } from "react";
import { isEmpty } from "../../utils/objectUtils";

class Input extends Component {
  state = {
    value: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const { handleChange } = this.props;
    this.setState({ value });
    handleChange({ value });
  };

  render() {
    const { value } = this.state;
    const { value: propsValue, isDisabled } = this.props;
    const inputValue = !isEmpty(propsValue) ? propsValue : value;
    return (
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-slate-gray text-sm font-light leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
        value={inputValue}
        onChange={this.handleChange}
        disabled={isDisabled}
      />
    );
  }
}

export default Input;
