import React from 'react'
import { Loader, Segment } from 'semantic-ui-react';

const Loading = () => {
  return (
    <Segment>
       <Loader active/> 
    </Segment> 
  );
};

export default Loading;