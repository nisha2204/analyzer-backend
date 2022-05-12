import mongoose from "mongoose"
//Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    refresh_token: String
  });

const User=mongoose.model('User', UserSchema)
export default User;