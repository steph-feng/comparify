const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const app = express();
dotenv.config();

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

async function connectToMongo() {
    mongoose.set("strictQuery", false);
    const uri = process.env.ATLAS_URI

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    const Schema = mongoose.Schema;
    const userSchema = new Schema({
        topArtists: [String],
        topTracks: [String]
    })

    const User = mongoose.model('User', userSchema);
}

connectToMongo();

app.post('/callback/save', (req, res) => {
    const topArtistsData = req.body.topArtistsResults.items.map(item => item.name);
    const topTracksData = req.body.topTracksResults.items.map(item => item.name);
    const User = mongoose.model('User');
    const user = new User({ topArtists: topArtistsData, topTracks: topTracksData });

    user.save()
      .then(() => {
        res.status(200).json({ message: 'Data saved successfully' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error saving top artists data' });
      });
  });
  
  

  







