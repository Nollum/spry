import Project from '../models/project';
import { Request, Response } from 'express';
import mongoose from 'mongoose';


const getAllProjects = async (req: Request, res: Response) => {
    try {
        const auth0EmailField = process.env.AUTH0_ACCESS_TOKEN_NAMESPACE + 'email';
        const userEmail = req.auth?.payload[auth0EmailField] as string; 

        const projects = await Project.find({ owner: userEmail });

        return res.json(projects);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

const getProject = async (req: Request, res: Response) => {
    const { id } = req.params; 
    try {
        const auth0EmailField = process.env.AUTH0_ACCESS_TOKEN_NAMESPACE + 'email';
        const userEmail = req.auth?.payload[auth0EmailField];
        const project = await Project.findById(id);

        if (!project?.owner === userEmail) {
            return res.status(403).json({ error: 'access denied' });
        }
        return res.json(project);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

const createProject = async (req: Request, res: Response) => {

    const { title, description }: { title: string, description: string } = req.body;
    try {
        const auth0EmailField = process.env.AUTH0_ACCESS_TOKEN_NAMESPACE + 'email';
        const userEmail = req.auth?.payload[auth0EmailField];
        const newProj = new Project({ title, description, owner: userEmail });
        let response = await newProj.save();
        return res.json(response);
    } catch (err) {
        return res.status(400).json({ error: err }); 
    }
};

const deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const auth0EmailField = process.env.AUTH0_ACCESS_TOKEN_NAMESPACE + 'email';
        const userEmail = req.auth?.payload[auth0EmailField] as string; 
        await Project.findOneAndDelete({ _id: id, owner: userEmail });
        return res.status(200).send();
    } catch (err) {
        return res.status(400).json({ error: err });
    };
};

const updateProject = async (req: Request, res: Response) => {
    let { id } = req.params;
    const 
    { 
       newTitle, 
       newDescription,
       newBoard, 
       newTicketCollection, 
       listId, 
       newTicket
    } = req.body;

    try {
        let filter: any = {};
        let update: any = {};

        filter['_id'] = id;

        if (newTitle) {
            update['title'] = newTitle;
        }

        if (newDescription) {
            update['description'] = newDescription; 
        }

        if (newTicketCollection) {
            update = { $push: { board: { title: newTicketCollection.title, description: newTicketCollection.description } } };
        }

        if (newBoard) {
            update['board'] = newBoard;
        }

        if (newTicket) {
            filter['board._id'] = listId;
            update = { $push: { 'board.$.tickets': newTicket } };
        }

        const response = await Project.findOneAndUpdate(filter, update, { new: true });

        return res.json(response);
    } catch (err) {
        return res.status(400).json({ error: err });
    }
};

export {
    createProject,
    getAllProjects,
    getProject,
    deleteProject,
    updateProject 
};