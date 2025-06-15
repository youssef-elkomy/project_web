const mongoose = require('mongoose');
const userdb = mongoose.createConnection("mongodb+srv://youssef2205641:iOwkHeXdqJSXCRrg@cluster0.hrelt99.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
});

userSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

userSchema.set('toJSON', {
    virtuals: true,
});

const User = userdb.model('User', userSchema);
module.exports = User;
