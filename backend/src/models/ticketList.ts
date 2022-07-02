import mongoose from 'mongoose';
import ticketSchema from './ticket';

const TicketListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    tickets: {
        type: [ticketSchema],
        default: [ { title: 'New Ticket', description: 'No description', status: 'Not Started' } ],
    },
});


export default TicketListSchema; 