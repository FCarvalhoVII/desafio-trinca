import mongoose from '../database/connection';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

export default User;