import styled from 'styled-components';

const Button = styled.button`
  height: 40px;
  border-radius: ${props => props.theme.borderRadius};
  width: ${props => props.width ? props.width : '100%'};
  background-color: ${props => props.theme.primary};
  text-transform: uppercase;
  color: #fff;
  font-size: .9em;
  box-shadow: ${props => props.theme.boxShadow};
  border: 0;
  transition: box-shadow ${props => props.theme.transitionOut}, opacity ${props => props.theme.opacity};
  cursor: pointer;
  outline: none;
  opacity: 1;

  &:active {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transition: box-shadow ${props => props.theme.transitionIn};
  }

  &:hover {
    opacity: .8;
    transition: opacity ${props => props.theme.transitionIn};
  }
`;

export default Button;