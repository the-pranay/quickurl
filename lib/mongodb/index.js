import { MongoClient } from 'mongodb';

// MongoDB connection URI
// Replace this with your own MongoDB Atlas connection string
const uri = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/quickurl?retryWrites=true&w=majority';

// Options for MongoDB client
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the connection
  // is reused across module reloads caused by HMR (Hot Module Replacement)
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise
export default clientPromise; 