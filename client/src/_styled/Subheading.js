import styled from 'styled-components';

const Subheading = styled.h1`
  font-size: 1em;
  font-weight: 600;
  margin: ${props => props.margin ? props.margin : '0'};
  width: auto;
`;

export default Subheading;