import * as React from "react";

interface InputFormProps {
  values: number[];
  onClick: (i: number) => void;
}

function InputForm(props: InputFormProps) {
  const [inputValue, setValue] = React.useState("");

  function handleSubmit(event: React.FormEvent) {
    const values = props.values;
    const selectedIndex = values.indexOf(Number(inputValue));
    props.onClick(selectedIndex);
    event.preventDefault();
  }

  return (
    <form className="userPrompt" onSubmit={handleSubmit}>
      <label>
        輸入數字:
        <input
          type="number"
          name="inputNumber"
          min="1"
          max="16"
          value={inputValue}
          onChange={e => setValue(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}

export default InputForm;
