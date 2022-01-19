import { useState } from "react";

const useInput = (initialState) => {
  const [value, setValue] = useState(initialState);
  const clearText = () => {
    setValue(initialState);
  };
  const bindForm = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };

  return [value, bindForm, clearText];
};

export default useInput;
