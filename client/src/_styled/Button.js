import styled from 'styled-components';

const Button = styled.button`
  height: 35px;
  margin: ${props => props.margin ? props.margin : '0'};
  border-radius: ${props => props.theme.borderRadius};
  width: ${props => props.width ? props.width : '100%'};
  background-color: ${props => props.backgroundColor ? props.backgroundColor : props.theme.primary};
  text-transform: uppercase;
  color: ${props => props.color ? props.color : '#fff'};
  font-size: .6em;
  box-shadow: ${props => props.theme.boxShadow};
  border: 0;
  transition: box-shadow ${props => props.theme.transitionOut}, opacity ${props => props.theme.opacity};
  cursor: ${props => {
    if (props.disabled) return 'not-allowed';
    return 'pointer';
  }};
  outline: none;
  opacity: ${props => {
    if (props.disabled) return .5;
    return 1;
  }};
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    transition: box-shadow ${props => props.theme.transitionIn};
  }

  &:hover {
    opacity: ${props => {
      if (props.disabled) return .5;
      return .8;
    }}
    transition: opacity ${props => props.theme.transitionIn};
  }
`;

export default Button;