import mongoose from '../database/connection';

const BarbecueSchema = new mongoose.Schema({
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    description: {
        type: String,
        require: true
    },
    additional_notes: {
        type: String,
        require: false
    },
    date: {
        type: Date,
        require: true
    },
    suggested_value: {
        type: Number,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Barbecue = mongoose.model('Barbecue', BarbecueSchema);

export default Barbecue;