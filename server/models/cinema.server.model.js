const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let seatSchema = new Schema({
  number: String,
  taken: Boolean
});

let movieSchema = new Schema({
  name: String,
  date: Date,
  time: String,
  seats: [seatSchema]
});

let cinemaSchema = new Schema({
    name: String,
    location: String,
    movies: [movieSchema]
});

cinemaSchema.statics = {
    findAll() {
        return new Promise((resolve, reject) => {
            this.find({}, (err, cinemas) => {
                if(!err) {
                    resolve(cinemas);
                } else {
                    reject(err);
                }
            });
        });
    }
};

movieSchema.statics = {
    findAll() {
        return new Promise((resolve, reject) => {
            this.find({}, (err, movies) => {
                if(!err) {
                    resolve(movies);
                } else {
                    reject(err);
                }
            });
        });
    }
};

seatSchema.statics = {
    findAll() {
        return new Promise((resolve, reject) => {
            this.find({}, (err, seats) => {
                if(!err) {
                    resolve(seats);
                } else {
                    reject(err);
                }
            });
        });
    }
};

var Cinema = mongoose.model("Cinema", cinemaSchema);

module.exports = Cinema;
