import * as React from 'react';
import { Input as BaseInput } from '@mui/base/Input';
import { styled } from '@mui/system';

const Input = React.forwardRef(function CustomInput(props, ref) {
  const { inputType, ...otherProps } = props;

  if (inputType === 'date') {
    return (
      <BaseInput
        type='date'
        slots={{ input: InputElement }}
        {...otherProps}
        ref={ref}
      />
    );
  } else {
    return (
      <BaseInput slots={{ input: InputElement }} {...otherProps} ref={ref} />
    );
  }
});

export default function UnstyledInputIntroduction({ placeholder, inputType }) {
  return (
    <Input aria-label='Input' placeholder={placeholder} inputType={inputType} />
  );
}

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputElement = styled('input')(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
   
    border-radius: 0;
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    background: none;
    border: none;
    box-shadow: none;
  
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `
);
