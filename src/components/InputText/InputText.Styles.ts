import styled from 'styled-components';

export const InputText = styled.input`
  width: 100%;
  border: unset;
  height: 40px;
  padding: 0 12px;
  border-radius: 8px;
  font-size: ${(props) => props.theme.fontSizes.xs}px;
  color: ${(props) => props.theme.colors.dark};
  transition: none !important;
  background-color: ${(props) => props.theme.colors.light};
  outline: unset;
  box-sizing: border-box;
  border: 1px solid ${(props) => props.theme.colors.grey3};

  &:focus {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grey2};
  }

  &:disabled {
    background-color: ${(props) => props.theme.colors.grey4};

    &:hover {
      cursor: not-allowed;
    }

    &::placeholder {
      color: ${(props) => props.theme.colors.grey2};
    }
  }
`;
