const Cinema = require("../models/cinema.server.model.js");

exports.getAll = function(req, res) {

    Cinema.findAll()
        .then((seat) => {
            return res.status(200).json(cinema);
        })
        .catch((error) => {
            console.log(error);
            return res.status(400).send();
        });
}

exports.getById = function(req, res) {

     Cinema.findById(req.params.cinemaId, function(err, cinema) {
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(200).send(cinema);
        }
    });
}

exports.create = function(req, res) {
    let seat = new Seat(req.body);

    seat.save((err, seat) => {
        if(err) {
            console.log(err);
            return res.status(500).send();
        } else {
            return res.status(204).send();
        }
    });
}

exports.delete = function(req, res) {
    console.log(req.params.seatId);

    Seat.findByIdAndRemove(req.params.seatId, function(err, data) {
        if(!err) {
            res.status(204).send();
        } else {
            res.status(500).send();
        }
    });
}

exports.update = function(req, res) {
    console.log(req.params.seatId);
    let seat = {
        yesterday: req.body.yesterday,
        today: req.body.today,
        impediment: req.body.impediment
    }

    Seat.findByIdAndUpdate(req.params.seatId, seat, function(err, data) {
        if(!err) {
            res.status(204).send();
        } else {
            res.status(500).send();
        }
    })
}
