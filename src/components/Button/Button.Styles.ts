import styled from 'styled-components';

const Button = styled.button`
  width: fit-content;
  min-width: 80px;
  height: 40px;
  gap: 8px;
  box-sizing: border-box;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: unset;
  border-radius: 8px;
  background-image: linear-gradient(
    to right,
    ${(props) => props.theme.colors.primary} 50%,
    ${(props) => props.theme.colors.secondary} 100%
  );

  &:hover {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;

export default Button;
