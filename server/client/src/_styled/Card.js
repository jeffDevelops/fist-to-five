import styled from 'styled-components';

const Card = styled.div`
  padding: 25px;
  margin: ${props => props.margin ? props.margin : '15px auto'};
  background-color: #fff;
  border-radius: ${props => props.theme.borderRadius};
  height: ${props => props.height ? props.height : 'auto'};
  width: ${props => props.width ? props.width : '100%'};
  box-shadow: ${props => props.theme.boxShadow};
`;

export default Card;