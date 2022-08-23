import React, {useState} from "react";
import styled from "styled-components";
import _uniqueId from "lodash/uniqueId";
const FormInput = ({label, type = "text", value, setValue}) => {
  const [id] = useState(_uniqueId("input-"));
  return (
    <Wrapper>
      <input
        className="input"
        type={type}
        id={id}
        placeholder=" "
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label className="label" htmlFor={id}>
        {label}
      </label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  .input {
    box-sizing: border-box;
    padding: 20px;
    top: 0;
    left: 0;
    width: 100%;
    border-radius: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 18px;
  }
  .label {
    position: absolute;
    left: 20px;
    top: 20px;
    font-size: 18px;
    cursor: text;
    transition: all 0.2s ease;
  }
  .input:focus ~ .label,
  .input:not(:placeholder-shown).input:not(:focus) ~ .label {
    top: -1.4rem;
    left: 10px;
    font-size: 14px;
  }
`;

export default FormInput;
