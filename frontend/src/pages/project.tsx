import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosResponse } from 'axios';
import projectAPI from '../api/project';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Header, Icon } from 'semantic-ui-react';
import Nav from '../components/nav';
import Board from '../components/project/board';
import TicketCollectionForm from '../components/project/forms/ticket-collection-form';
import { IProject } from '../types';


const ProjectPage = () => {
  
  const navigate = useNavigate();

  let params = useParams();

  const { getAccessTokenSilently } = useAuth0();
  const [projectData, setProjectData] = useState<IProject>({ id: '', title: '', description: '', board: []});
  const [formData, setFormData] = useState({ title: '', description: '', status: ''});

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response: AxiosResponse<IProject> = await projectAPI.getProject(params.id as string, getAccessTokenSilently) ;
        setProjectData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProject();
  }, []);

  const handleDelete = async () => {
    try {
      await projectAPI.deleteProject(params.id as string, getAccessTokenSilently);
    } catch (err) {
      console.log(err);
    }  finally {
      navigate('/dashboard');
    };
  }

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData,    
        [event.target.name]: event.target.value,
    });
  };

  const handleCollectionCreate = async () => {
    try {
      
      if (formData.title === '') {
        formData.title = 'Untitled';
      };

      if (formData.description === '') {
        formData.description = 'No description';
      };

      const newTicketCollection = formData; 

      const response: AxiosResponse<IProject> = await projectAPI.updateProject(params.id as string,  { newTicketCollection }, getAccessTokenSilently);
      setProjectData(response.data);

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='project'>
        <Nav />
        <Button inverted color='red' onClick={handleDelete}>Delete</Button>
        <Board {...projectData} />
        <TicketCollectionForm handleFormChange={handleFormChange} handleCollectionCreate={handleCollectionCreate}/>
    </div>
  );
};

export default ProjectPage;