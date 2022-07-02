// Represents a feature/bug/hotfix or any object that is meant to be implemented in the project 

import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    status: {
        type: String,
        enum: ['In Progress', 'Completed', 'Not Started'],
    },
});


export default ticketSchema;

