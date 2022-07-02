import React, { useState } from 'react';
import { Modal, Form, Button } from 'semantic-ui-react';
import NewProjectButton from '../../buttons/new-project-button';

interface ProjectFormProps {
    handleFormChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleProjectCreate: () => void;
};

const ProjectForm = ({ handleFormChange, handleProjectCreate }: ProjectFormProps) => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setOpen(false);
    handleProjectCreate();
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<NewProjectButton />}
    >
        <Form onSubmit={handleSubmit}>
          <Form.Field> 
            <label>Title</label>
            <input placeholder='Todo App' name='title' onChange={handleFormChange}/>
          </Form.Field>
          <Form.Field>
            <label>Description</label>
            <input placeholder='An app to track daily activities' name='description' onChange={handleFormChange} />
          </Form.Field> 
          <Button type="submit">Create</Button>
        </Form>
    </Modal>
  );
};

export default ProjectForm;