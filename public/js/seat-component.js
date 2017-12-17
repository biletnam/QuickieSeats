class SeatingEditBox extends React.Component {

    constructor() {
        super();

        this.state = {
            seat: {},
            auth: true,
            done: false
        }
    }

    componentWillMount() {
        let seatId = this.props.match.params.seatId;

        this._fetchSeat(seatId);

        if(!sessionStorage.getItem("token")) {
            this.setState({
                auth: false
            });
        }
    }

    render() {

        if(!this.state.auth) {
            return (
                <Redirect to="/session/new" />
            );
        }

        if(this.state.done) {
            return (
                <Redirect to="/" />
            );
        }

        return(
        <div className="container">
            <div className="row">
                <div className="col-sm" id="col-sm-meeting">
                  <form onSubmit={this._handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="movie">Movie</label>
                        <select
                          onChange={this._handleMovieChange.bind(this)}
                          id="movie"
                          value={this.state.seat.movie}
                          className="form-control"
                          ref={(select) => this._movie = select}>
                          <option value="Star Wars: The Last Jedi">Star Wars: The Last Jedi</option>
                          <option value="Justice League">Justice League</option>
                          <option value="Coco">Coco</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cinema">Cinema</label>
                        <select
                          onChange={this._handleCinemaChange.bind(this)}
                          id="cinema"
                          value={this.state.seat.cinema}
                          className="form-control"
                          ref={(select) => this._cinema = select}>
                          <option value="Greenbelt 1">Greenbelt 1</option>
                          <option value="Glorietta">Glorietta</option>
                          <option value="SM Bicutan">SM Bicutan</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                          ref={(input) => this._date = select}
                          className="form-control"
                          value={this.state.seat.date}
                          onChange={this._handleDateChange.bind(this)}
                          type="date"
                          id="date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <select
                          onChange={this._handleTimeChange.bind(this)}
                          id="time"
                          value={this.state.seat.time}
                          className="form-control"
                          ref={(select) => this._time = select}>
                          <option value="9:00AM-10:30AM">9:00AM-10:30AM</option>
                          <option value="11:00AM-12:30PM">11:00AM-12:30PM</option>
                          <option value="1:00PM-2:30PM">1:00PM-2:30PM</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numbers">Seats</label>
                        <select multiple
                          className="form-control"
                          onChange={this._handleNumbersChange.bind(this)}
                          id="numbers"
                          value={this.state.seat.numbers}
                          ref={(select) => this._numbers = select}>
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="A3">A3</option>
                          <option value="A4">A4</option>
                          <option value="A5">A5</option>
                        </select>
                    </div>
                    <button
                      type="button"
                      onClick={this._handleClose.bind(this)}
                      className="btn btn-secondary"
                      data-dismiss="modal">
                      Close
                    </button>
                    <input type="submit" className="btn btn-primary" />
                  </form>
                </div>
            </div>
        </div>
        );
    }

    _handleMovieChange(e) {
        let seat = this.state.seat;

        this.setState({
            seat: Object.assign({}, seat,
                {
                    movie: e.target.value
                })
        });
    }

    _handleCinemaChange(e) {
        let seat = this.state.seat;

        this.setState({
            seat: Object.assign({}, seat,
                {
                    cinema: e.target.value
                })
        });
    }

    _handleTimeChange(e) {
        let seat = this.state.seat;

        this.setState({
            seat: Object.assign({}, seat,
                {
                    time: e.target.value
                })
        });
    }

    _handleDateChange(e) {
        let seat = this.state.seat;

        this.setState({
            seat: Object.assign({}, seat,
                {
                    date: e.target.value
                })
        });
    }

    _handleNumbersChange(e) {
        let seat = this.state.seat;

        this.setState({
            seat: Object.assign({}, seat,
                {
                    numbers: e.target.value
                })
        });
    }

    _fetchSeat(seatId) {
        $.ajax({
            type: "GET",
            url: `/api/seat/${seatId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((seat, status, xhr) => {
            console.log(seat);
            this.setState({
                seat
            });
        }).fail((xhr) => {
            if(xhr.status == 401)
            {
                this.setState({
                    auth: false
                });
            }
        });
    }

    _handleSubmit(e) {
        e.preventDefault();

        let seatId = this.props.match.params.seatId;

        let seat = {
            yesterday: this._yesterday.value,
            today: this._today.value,
            impediment: this._impediment.value
        }

        $.ajax({
            type: "PUT",
            url: `/api/seat/${seatId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            },
            data: seat
        }).done((data, status, xhr) => {
            this.setState({
                done: true
            });
        }).fail((xhr) => {

            if(xhr.status == 401) {
                this.setState({
                    auth: false
                });
            }
        });

        console.log(seat);

    }

    _handleClose(e) {
        e.preventDefault();

        this._close();
    }

    _close() {
        this.setState({
            done: true
        });
    }
}

class SeatingNewBox extends React.Component {

    constructor() {
        super();

        this.state = {
            done: false,
            auth: true
        }
    }

    componentWillMount() {
        if(!sessionStorage.getItem("token")) {
            this.setState({
                auth: false
            });
        }
    }

    render() {

        if(!this.state.auth) {
            return (
                <Redirect to="/session/new" />
            );
        }

        if(this.state.done) {
            return (
                <Redirect to="/" />
            );
        }

        return (
        <div className="container">
            <div className="row">
                <div className="col-sm" id="col-sm-meeting">
                  <form onSubmit={this._handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="movie">Movie</label>
                        <select
                          id="movie"
                          className="form-control"
                          ref={(select) => this._movie = select}>
                          <option selected value="Star Wars: The Last Jedi">Star Wars: The Last Jedi</option>
                          <option value="Justice League">Justice League</option>
                          <option value="Coco">Coco</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cinema">Cinema</label>
                        <select
                          id="cinema"
                          className="form-control"
                          ref={(select) => this._cinema = select}>
                          <option selected value="Greenbelt 1">Greenbelt 1</option>
                          <option value="Glorietta">Glorietta</option>
                          <option value="SM Bicutan">SM Bicutan</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                          ref={(input) => this._date = select}
                          className="form-control"
                          type="date"
                          id="date" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="time">Time</label>
                        <select
                          id="time"
                          className="form-control"
                          ref={(select) => this._time = select}>
                          <option selected value="9:00AM-10:30AM">9:00AM-10:30AM</option>
                          <option value="11:00AM-12:30PM">11:00AM-12:30PM</option>
                          <option value="1:00PM-2:30PM">1:00PM-2:30PM</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numbers">Seats</label>
                        <select multiple
                          className="form-control"
                          id="numbers"
                          ref={(select) => this._numbers = select}>
                          <option value="A1">A1</option>
                          <option value="A2">A2</option>
                          <option value="A3">A3</option>
                          <option value="A4">A4</option>
                          <option value="A5">A5</option>
                        </select>
                    </div>
                    <button
                      type="button"
                      onClick={this._handleClose.bind(this)}
                      className="btn btn-secondary"
                      data-dismiss="modal">
                      Close
                    </button>
                    <input type="submit" className="btn btn-primary" />
                  </form>
                </div>
            </div>
        </div>
        );
    }

    _handleClose(e) {
        e.preventDefault(e);

        this._close();
    }

    _handleSubmit(e) {
        e.preventDefault();

        let seat = {
            movie: this._movie.value,
            cinema: this._cinema.value,
            date: this._date.value,
            time: this._time.value,
            numbers: this._numbers.value
        }

        $.ajax({
            type: "POST",
            url: "/api/seat",
            headers: {
                "Authorization": sessionStorage.getItem("token")
            },
            data: seat
        }).done((seat, status, xhr) => {
            this._close();
        }).fail((xhr) => {
            console.log(xhr.status);
        });


    }

    _close() {

        this.setState({
            done: true
        });
    }
}
