import React, { useState } from 'react';
import { Button, Dropdown, Input, InputOnChangeData, Modal, TextArea } from 'semantic-ui-react';
import { ITicket } from '../../types';
import TicketCard from './ticket-card';

interface TicketFormProps {
    listId: string;
    ticket: ITicket;
    handleTicketUpdate: (listId: string, updatedTicket: ITicket) => void;
    handleTicketDelete: (listId: string, ticketId: string) => void;
};

const TicketModal = ({ listId, ticket, handleTicketUpdate, handleTicketDelete }: TicketFormProps) => {
  const [open, setOpen] = useState(false);
  const [ticketData, setTicketData] = useState<ITicket>({...ticket});

  const options = [ 
    { key: 0, text: 'Not Started', value: 0 },
    { key: 1, text: 'In Progress', value: 1 },
    { key: 2, text: 'Completed', value: 2 },
  ];

  const handleStatusChange = (event: React.SyntheticEvent, data: any) => {
    const [value] = options.filter(option => option.value === data.value);
    setTicketData({ ...ticketData, status: value.text});
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>, data: any) => {
    setTicketData({ ...ticketData, title: event.target.value});
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>, data: any) => {
    setTicketData({ ...ticketData, description: event.target.value});
  };

  const handleClose = () => {
    setTicketData({ ...ticket });
    setOpen(false);
  };

  const handleSave = () => {
    handleTicketUpdate(listId, ticketData);
    setOpen(false);
  }

  const handleDelete = () => {
    handleTicketDelete(listId, ticketData._id);
    setOpen(false);
  }
  
  return (
    <Modal
       onClose={handleClose} 
       onOpen={() => setOpen(true)}
       open={open}
       trigger={<TicketCard {...ticket} />}
       className='ticket-modal'
    >
       <Modal.Header>
        <Input transparent focus placeholder={ticketData.title} onChange={handleTitleChange}/>
       </Modal.Header> 
       <Modal.Content>
        <TextArea 
          className='ticket-modal-description'
          style={{ 
                  marginBottom: '1rem', padding: '8px', 
                   width: '100%', height: '200px', resize: 'none', 
                  border: 'none', outlineColor: '#dbdbdb', 
                  borderRadius: '8px'
                 }}
          defaultValue={ticketData.description}
          onChange={handleDescriptionChange}
        />
        <Dropdown button text={ticketData.status} options={options} onChange={handleStatusChange} />
       </Modal.Content>
       <Modal.Actions>
        <Button primary onClick={handleSave}>Save</Button>
        <Button negative onClick={handleDelete}>Delete</Button>
       </Modal.Actions>
    </Modal>
  );
};

export default TicketModal;