const { MongoClient } = require('mongodb')

const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${DB_NAME}`


class MongoLib {
	constructor() {
		console.log('MONGO_URI', MONGO_URI);
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
}

module.exports = MongoLib;