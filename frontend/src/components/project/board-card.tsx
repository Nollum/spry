import React from 'react';
import { Button, Card, Dropdown, Grid, Header, Icon, Ref } from 'semantic-ui-react';
import { ITicket, ITicketList } from '../../types';
import TicketModal from './ticket-modal';

interface BoardCardProps {
    type: string; 
    data: ITicketList;
    handleTicketCreate: (listId: string) => void;
    handleTicketUpdate: (listId: string, updatedTicket: ITicket) => void;
    handleTicketDelete: (listId: string, ticketId: string) => void;
    handleCollectionDelete: (listId: string) => void;
};

const TicketListCard = ({ data, handleTicketCreate, handleTicketUpdate, handleTicketDelete, handleCollectionDelete }: Omit<BoardCardProps, "type">) => {
    return (
        <Card className='ticketList'>
          <Card.Header>
            <Header as="h3">{data.title}</Header>
            <Button 
                icon 
                style={{display: 'inline-block', position: 'absolute', top: '5px', right: '2px'}}
                onClick={() => handleCollectionDelete(data._id)}
            >
                <Icon name='remove' />
            </Button>
          </Card.Header>
          <Grid divided="vertically">
            <Grid.Row columns={1}>
                {data.tickets && data.tickets.map((ticket, index) => (
                    <Grid.Column key={ticket._id}>
                       <TicketModal 
                            listId={data._id} 
                            ticket={ticket} 
                            handleTicketUpdate={handleTicketUpdate}
                            handleTicketDelete={handleTicketDelete}
                       />
                    </Grid.Column>
                ))}
                <Grid.Column>
                    <Button icon onClick={() => handleTicketCreate(data._id)}>
                        <Icon name='add' />
                    </Button>
                </Grid.Column>
            </Grid.Row>
            
          </Grid>
        </Card>
    );
};

const TestCard = () => {
    return (
        <div>Test</div>
    );
};

const BoardCard = ({ type, data, handleTicketCreate, handleTicketUpdate, handleTicketDelete, handleCollectionDelete }: BoardCardProps) => {


    if (type === 'test') {
        return <TestCard />;
    }
    return (
        <TicketListCard 
            data={data as ITicketList} 
            handleTicketCreate={handleTicketCreate} 
            handleTicketUpdate={handleTicketUpdate}
            handleTicketDelete={handleTicketDelete}
            handleCollectionDelete={handleCollectionDelete}
        />
    );
};

export default BoardCard;