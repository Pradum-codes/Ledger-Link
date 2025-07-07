const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    businessName: { 
        type: String,
        required: true 
    },
    ownerName: { 
        type: String, 
        required: true },
    phoneNumber: { 
        type: String, 
        unique: true, 
        required: true, 
        match: /^\+?[1-9]\d{1,14}$/ },
    email: { 
        type: String, 
        unique: true, 
        required: true, 
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    password: { 
        type: String, 
        required: true },
    status: { 
        type: String, 
        enum: ['active', 'inactive', 'suspended'], 
        default: 'active' }
}, { timestamps: true });
userSchema.index({ phoneNumber: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });

userSchema.pre('save', async function(next){
    const user = this;

    if(!user.isModified('password')) return next();

    try{
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch(error) {
        next(error);    
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model("User", userSchema)