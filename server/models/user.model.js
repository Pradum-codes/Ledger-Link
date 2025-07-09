const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        // required: true,
    },
    businessName: {
        type: String,
        required: true
    },
    ownerName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true,
        match: /^\+?[1-9]\d{1,14}$/
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended'],
        default: 'active'
    }
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    const user = this;

    // Hash password if modified
    if (user.isModified('password')) {
        try {
        user.password = await bcrypt.hash(user.password, 10);
        } catch (err) {
        return next(err);
        }
    }

    // Generate UID only if it's missing
    if (!user.uid) {
        try {
        console.log('Generating UID...');
        const lastUser = await mongoose.model('User').findOne({}, {}, { sort: { createdAt: -1 } });

        const lastId = lastUser?.uid?.replace(/[^\d]/g, '') || '10000';
        user.uid = `USR${parseInt(lastId) + 1}`;

        console.log('Generated UID:', user.uid);
        } catch (err) {
        return next(err);
        }
    }

    next();
});


userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);