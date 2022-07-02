import { Card, Modal } from 'semantic-ui-react';
import { ITicket } from '../../types';

const TicketCard = ({ title, description, status, ...rest }: ITicket) => {
  return (
    <Card {...rest}>
      <Card.Header>{title}</Card.Header>
    </Card> 
  );
};

export default TicketCard;