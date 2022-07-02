import React from 'react';
import { Button, Icon } from 'semantic-ui-react';

const NewProjectButton = ({ ...rest }) => {
  return (
    <Button icon labelPosition='left' {...rest}>
      <Icon name='add' />
      Project 
    </Button>
  );
};

export default NewProjectButton;