import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique : true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password: { type: String, required: true },
    matches : [
        {type : mongoose.Types.ObjectId, required : true, ref : 'Match'}
    ]
});

export const User = mongoose.model('User', userSchema);


