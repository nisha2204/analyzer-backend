import mongoose from "mongoose"
//Schema = mongoose.Schema;
const SearchSchema = new mongoose.Schema({
    email: String,
    asin: String,
    time: Date
  });

const Searches = mongoose.model('Searches', SearchSchema)
export default Searches;