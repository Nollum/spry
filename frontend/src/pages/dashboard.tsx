import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse } from 'axios';
import projectAPI from '../api/project';
import Nav from '../components/nav';
import { Header } from 'semantic-ui-react';
import { useAuth0 } from '@auth0/auth0-react';
import ProjectCollection from '../components/project/project-collection';
import ProjectModalForm from '../components/project/forms/project-form';
import { IProject } from '../types';

const Dashboard = () => {
  
  const { getAccessTokenSilently } = useAuth0();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isBusy, setBusy] = useState(false);

  useEffect(() => {
      setBusy(true);
      const fetchProjects = async () => {
        try {
          const response: AxiosResponse<IProject[]> = await projectAPI.getProjects(getAccessTokenSilently);
          setProjects(response.data);
          setBusy(false);
        } catch (err) {
          console.log(err);
        }
      }
      fetchProjects();
    }, []);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData,    
        [event.target.name]: event.target.value,
    });
  };

  const handleProjectCreate = async () => {
    try {
      const title = formData.title ? formData.title : 'Untitled';
      const description = formData.description ? formData.description : 'No description';
      const body = { title, description };
      const response: AxiosResponse<IProject> = await projectAPI.createProject(body, getAccessTokenSilently); 
      setProjects([ ...projects, { ...response.data }]);
    } catch (err) {
      console.log(err);
    };
  };

  return (
    <div className='dashboard'>
        <Nav /> 
        <ProjectModalForm handleFormChange={handleFormChange} handleProjectCreate={handleProjectCreate} />
        {isBusy ? <p>Loading...</p> : projects.length === 0 ? 
          <Header as="h2">No projects</Header> : 
          <ProjectCollection collection={projects} /> 
        }
    </div>
  );
};

export default Dashboard;