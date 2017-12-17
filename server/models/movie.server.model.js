const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

let movieSchema = new Schema({
    name: { type: String, required: true },
    project: { type: String, required: true },
    yesterday: String,
    today: String,
    impediment: String,
    createdOn: { type: Date, default: Date.now }
});

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

var Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
