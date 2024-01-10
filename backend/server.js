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
    _id: String,
    displayName: String,
    topArtistsNames: [String],
    topTracksNames: [String],
    topGenres: [String],
    popularity: Number
  })

  const User = mongoose.model('User', userSchema);
}

connectToMongo();

app.post('/save', async (req, res) => {
  const userId = req.body.userResults.id;
  const userDisplayName = req.body.userResults.display_name;
  const artistNames = req.body.topArtistsResults.items.map(item => item.name);
  const trackNames = req.body.topTracksResults.items.map(item => item.name);

  const User = mongoose.model('User');

  const existingUser = await User.findById(userId);

  if (existingUser) {
    existingUser.displayName = userDisplayName;
    existingUser.topArtistsNames = artistNames;
    existingUser.topTracksNames = trackNames;
    existingUser.topGenres = req.body.topGenreResults;
    existingUser.popularity = req.body.popularityScore;

    existingUser.save()
      .then(() => {
        res.status(200).json({ message: 'Data updated successfully' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error updating data' });
      });

  } else {
    const user = new User({
      _id: userId,
      displayName: userDisplayName,
      topArtistsNames: artistNames,
      topTracksNames: trackNames,
      topGenres: req.body.topGenreResults,
      popularity: req.body.popularityScore
    });

    user.save()
      .then(() => {
        res.status(200).json({ message: 'Data saved successfully' });
      })
      .catch((error) => {
        res.status(500).json({ message: 'Error saving data' });
      });
  }
});

app.get('/findFriend', async (req, res) => {
  const User = mongoose.model('User');

  const currentUserData = await User.findById(req.query.userId);
  const friendUserData = await User.findById(req.query.friendUserId);

  res.json({currentUserData, friendUserData});

})











