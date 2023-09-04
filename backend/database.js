import { MongoClient } from "mongodb";

const uri = process.env.ATLAS_URI;

const client = new MongoClient(uri);

let connect;
try {
  connect = await client.connect();
  console.log('connected to db');
} catch(e) {
  console.error(e);
}

let db = connect.db("sample_training");

export default db;