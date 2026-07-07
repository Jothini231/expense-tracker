const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required:true, unique: true},
    password: {
        type: String, 
        required: function() { return this.authProvider === 'local'; }
    },
    authProvider: { type: String, default: 'local' },
    profileImageUrl: {type: String, default: null},
    otp: {type: String, default: null},
    otpExpiry: {type: Date, default: null}
},
  {timestamps: true}
);

UserSchema.pre("save",async function (){
    if(!this.isModified("password") || !this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
    
});

UserSchema.methods.comparePassword = async function(candidatePassword){
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword,this.password);
}

module.exports = mongoose.model("User" , UserSchema);