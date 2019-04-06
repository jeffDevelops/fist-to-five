import styled from 'styled-components';

export const Input = styled.input`
  background-color: #fff;
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  width: ${props => props.width ? props.width : '100%'};
  margin: ${props => props.margin ? props.margin : '0 0 10px 0'};
  padding: 8px;
  border: 2px solid transparent;
  outline: none;
  height: 35px;
  transition: border-color ${props => props.theme.transitionOut};
  font-size: 1em;

  &:focus, &:active {
    border: 2px solid ${props => props.theme.primary};
    transition: border-color ${props => props.theme.transitionIn};
  }
`;

export const Label = styled.label`
  text-transform: uppercase;
  display: block;
  font-size: .7em;
  margin: ${props => props.margin ? props.margin : '0 0 25px 0'};
`;