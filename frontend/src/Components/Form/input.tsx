import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import './styles.scss'

interface Props {
  name: string;
  label?: string;
};
type InputProps = JSX.IntrinsicElements['input'] & Props;

const Input: React.FC<InputProps> = ({ name, label, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, defaultValue, registerField, error, clearError } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current,
    })

  }, [fieldName, registerField]);

  return (
    <>
      { label && <label className="unformInputLabel" htmlFor={fieldName}>{label}</label> }
      <input
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
        onFocus={clearError}
        className="unformInput"
      />
      { error && <span className="unformInputError">{error}</span> }
    </>
  );
};
export default Input;