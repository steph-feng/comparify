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
    topArtistsNames: [String],
    topTracksNames: [String],
    popularityScores: [Number],
    artistGenres: [String],
    finalPopularityScore: Number
  })

  const User = mongoose.model('User', userSchema);
}

connectToMongo();

app.post('/callback/save', async (req, res) => {
  const userId = req.body.userResults.id;
  const artistNames = req.body.topArtistsResults.items.map(item => item.name);
  const trackNames = req.body.topTracksResults.items.map(item => item.name);

  const popularityArray = req.body.topArtistsResults.items.map(item => item.popularity);
  let popularityAverage = 0;

  popularityArray.forEach((element) => {
    popularityAverage = popularityAverage + element;
  })
  popularityAverage = popularityAverage / popularityArray.length;

  let fetchedGenres = [];
  for (i = 0; i < req.body.topArtistsResults.items.length; i++) {
    fetchedGenres = fetchedGenres.concat(req.body.topArtistsResults.items[i].genres);
  }

  const User = mongoose.model('User');

  const existingUser = await User.findById(userId);

  if (existingUser) {
    existingUser.topArtistsNames = artistNames;
    existingUser.topTracksNames = trackNames;
    existingUser.popularityScores = popularityArray;
    existingUser.artistGenres = fetchedGenres;
    existingUser.finalPopularityScore = popularityAverage;

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
      topArtistsNames: artistNames,
      topTracksNames: trackNames,
      popularityScores: popularityArray,
      artistGenres: fetchedGenres,
      finalPopularityScore: popularityAverage
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

app.get('/callback/findFriend', async (req, res) => {
  const User = mongoose.model('User');

  const currentUserData = await User.findById(req.query.userId);
  const friendUserData = await User.findById(req.query.friendUserId);

  res.json({currentUserData, friendUserData});

})











