import * as React from "react";

interface InputFormProps {
  values: number[];
  onClick: (i: number) => void;
}

interface InputFormState {
  inputValue: string;
}

class InputForm extends React.Component<InputFormProps, InputFormState> {
  constructor(props: InputFormProps) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      inputValue: event.target.value
    });
  }

  handleSubmit(event: React.FormEvent) {
    const inputValue = Number(this.state.inputValue);
    const values = this.props.values;
    const selectedIndex = values.indexOf(inputValue);
    this.props.onClick(selectedIndex);
    event.preventDefault();
  }

  render() {
    return (
      <form className="userPrompt" onSubmit={this.handleSubmit}>
        <label>
          輸入數字:
          <input
            type="number"
            name="inputNumber"
            min="1"
            max="16"
            value={this.state.inputValue}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default InputForm;
