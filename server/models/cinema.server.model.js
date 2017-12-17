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
  seats: [seatSchema]
});

let cinemaSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    movies: [movieSchema]
});

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
