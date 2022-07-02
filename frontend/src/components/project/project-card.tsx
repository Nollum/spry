import React from 'react'
import { Card } from 'semantic-ui-react';
import { IProject } from '../../types';

interface ProjectCardProps {
  project: IProject;
}

const ProjectCard = ({ project }: ProjectCardProps) => {

  const projectLink = `/project/${project.id}`;

  return (
    <Card href={projectLink}>
       <Card.Content>
            <Card.Header>{project.title}</Card.Header> 
            <Card.Description>{project.description}</Card.Description>
        </Card.Content> 
    </Card>
  );
};

export default ProjectCard;