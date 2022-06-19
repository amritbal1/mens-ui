import React, { Component } from "react";

class TextArea extends Component {
  handleChange = (event) => {
    const { handleTextChange, fieldToChange } = this.props;
    const value = event.target.value;
    handleTextChange({ value, fieldToChange });
  };

  render() {
    const { title, rows, placeholder, value } = this.props;
    return (
      <div>
        <label class="block text-sm font-medium text-gray-700 font-bold">
          {title}
        </label>
        <div class="mt-1">
          <textarea
            placeholder={placeholder}
            value={value}
            onChange={this.handleChange}
            rows={rows}
            class="shadow-sm focus:outline-none focus:border-lilac-500 mt-1 block w-full border border-t-0 border-l-0 border-r-0 border-gray-600 resize-none text-sm font-light text-slate-gray"
          ></textarea>
        </div>
      </div>
    );
  }
}

export default TextArea;
