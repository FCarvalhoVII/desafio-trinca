import mongoose from '../database/connection';

const ContributorSchema = new mongoose.Schema({
    barbecue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Barbecue',
        require: true
    },
    name: {
        type: String,
        require: true
    },
    value: {
        type: Number,
        require: true
    },
    with_drink: {
        type: Boolean,
        require: true
    },
    paid: {
        type: Boolean,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

const Contributor = mongoose.model('Contributor', ContributorSchema);

export default Contributor;