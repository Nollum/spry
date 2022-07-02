import React, { useState } from 'react';
import { Modal, Form, Button, Icon } from 'semantic-ui-react';

interface TicketCollectionFormProps {
    handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCollectionCreate: () => void;
};

const TicketCollectionForm = ({ handleFormChange, handleCollectionCreate }: TicketCollectionFormProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setOpen(false);
    handleCollectionCreate();
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button icon labelPosition='left'>
          <Icon name='add' />
           Collection 
        </Button>}
    >
        <Form onSubmit={handleSubmit}>
          <Form.Field> 
            <label>Title</label>
            <input placeholder='Features' name='title' onChange={handleFormChange}/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input placeholder='Features to implement' name='description' onChange={handleFormChange} />
          </Form.Field> 
          <Button type="submit">Create</Button>
        </Form>
    </Modal>
  );
};

export default TicketCollectionForm;