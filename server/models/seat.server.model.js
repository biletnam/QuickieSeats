const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let seatSchema = new Schema({
    name: { type: String, required: true },
    project: { type: String, required: true },
    yesterday: String,
    today: String,
    impediment: String,
    createdOn: { type: Date, default: Date.now }
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
