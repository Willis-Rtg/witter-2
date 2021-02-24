import { useState } from "react";

export default ({ initial = "" }) => {
  const [value, setValue] = useState(initial);
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(value);
  };
  return { value, onChange };
};
