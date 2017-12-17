const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let seatSchema = new Schema({
    cinema: { type: String, required: true },
    movie: { type: String, required: true },
    time: {type: String, required: true},
    date: {type: Date, default: Date.now},
    numbers: {type: Array, required: true}
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

var Seat = mongoose.model("Seat", seatSchema);

module.exports = Seat;
