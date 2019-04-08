import styled from 'styled-components';

const Heading = styled.h1`
  font-size: 1.2em;
  font-weight: 800;
  margin: ${props => props.margin ? props.margin : '0'};
  width: auto;
  color: ${props => props.color ? props.color : 'inherit'};
`;

export default Heading;