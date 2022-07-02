import React from 'react'
import { Grid, Button, Icon } from 'semantic-ui-react';
import ProjectCard from './project-card';
import { IProject } from '../../types';

interface ProjectCollectionProps {
    collection: IProject[];
};

const ProjectCollection = ({ collection }: ProjectCollectionProps) => {

  return (
    <Grid>
        {collection.map(project => {
            return (
                <Grid.Column width={3} key={project.id}>
                    <ProjectCard project={project} />
                </Grid.Column>
            )
        })}
    </Grid>
  );
};

export default ProjectCollection;