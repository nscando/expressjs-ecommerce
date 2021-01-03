const { MongoClient, ObjectId } = require('mongodb')

const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}`


class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    this.dbName = DB_NAME;
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.client.connect(err => {
        if (err) {
          reject(err, err.message);
        }
        console.log('Connected succefully to mongo');
        resolve(this.client.db(this.dbName))
      })
    })
  }
  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray();
    });
  }

  getOne(collection, id) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .findOne({ _id: ObjectId(id) })
      })
  }

  createProduct(collection, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .insertOne(data)
      })
      .then(result => result.insertedId)
  }

  updateProduct(collection, id, data) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then(result => result.upsertedId || id);
  }

  deleteProduct(collection, id) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .deleteOne({ _id: ObjectId(id) })
      })
      .then(() => id, console.log(`The product ID:${id}, was deleted`))
  }

}

module.exports = MongoLib;