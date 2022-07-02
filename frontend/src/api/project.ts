import axios from 'axios';
import { IProject } from '../types';


const createProject = async (body: object, getAccessTokenSilently: ({}) => any) => {
    const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
    });

    let response = await axios.post<IProject>(process.env.REACT_APP_API_BASE_URL + '/api/projects', 
        { ...body }, 
        {
        headers: {
            'Authorization': `bearer ${accessToken}`,
        }
    }); 

    return response;
};

const getProjects = async (getAccessTokenSilently: ({}) => any) => {
    const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
    });
    let response = await axios.get<IProject[]>(process.env.REACT_APP_API_BASE_URL + '/api/projects', {
        headers: {
            'Authorization': `bearer ${accessToken}`,
        },
    });

    return response;
};

const getProject = async (id: string, getAccessTokenSilently: ({}) => any) => {
    const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
    });
    let response = await axios.get<IProject>(process.env.REACT_APP_API_BASE_URL + `/api/projects/${id}`, {
        headers: {
            'Authorization': `bearer ${accessToken}`,
        },
    });

    return response;
};

const deleteProject = async (id: string, getAccessTokenSilently: ({}) => any) => {
    const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
    });
    await axios.delete(process.env.REACT_APP_API_BASE_URL + `/api/projects/${id}`, {
        headers: {
            'Authorization': `bearer ${accessToken}`,
        },
    });
};

const updateProject = async (id: string, body: {}, getAccessTokenSilently: ({}) => any) => {
    const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE
    });

    let response = await axios.put(process.env.REACT_APP_API_BASE_URL + `/api/projects/${id}`, 
        { ...body },
        {
        headers: {
            'Authorization': `bearer ${accessToken}`,
        },
    }); 
    
    return response; 
};

const projectAPI = { getProject, getProjects, createProject, deleteProject, updateProject };

export default projectAPI; 