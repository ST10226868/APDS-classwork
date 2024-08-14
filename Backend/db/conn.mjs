import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();


const connenctionString = process.env.ATLAS_URI || "";

console.log(connenctionString);

const client = new MongoClient(connenctionString);

let conn;
try{
    conn = await client.connect();
    console.log('mongoDB is CONNECTED!!');
} catch(e) {
    console.error(e);
}

let db = client.db("users");

export default db;