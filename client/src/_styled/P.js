import styled from 'styled-components';

const P = styled.p`
  color: #fff;
  font-size: 1;
  display: ${props => props.display ? props.display : 'block'};
  margin: ${props => props.margin ? props.margin : '0'};
`;

export default P;