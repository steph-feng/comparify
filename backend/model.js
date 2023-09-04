const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    topArtists: [{ name: String }],
    topTracks: [{ name: String }]
}
)
module.exports = mongoose.model('User', userSchema);