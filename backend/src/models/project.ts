import mongoose from 'mongoose';
import TicketListSchema from './ticketList';

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        default: 'Untitled',
    },
    description: {
        type: String,
        default: 'No description',
    },
    owner: {
        type: String,
        required: true,
    },
    board: [TicketListSchema],
});

projectSchema.methods.toJSON = function() {
    let obj = this.toObject();
    obj.id = obj._id.toString();
    delete obj.__v;
    delete obj.owner;
    return obj;
};

export default mongoose.model('Project', projectSchema);