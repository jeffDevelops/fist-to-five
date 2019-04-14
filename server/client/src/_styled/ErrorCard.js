import styled from 'styled-components';
import Card from './Card';

const ErrorCard = styled(Card)`
  font-size: .8em;
  color: #fff;
  background-color: ${props => props.theme.error};
`;

export default ErrorCard;