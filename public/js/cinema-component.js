class CinemaBox extends React.Component {

    constructor() {
        super();

        this.state = {
            seats: [],
            auth: true
        }
    }

    componentWillMount() {

      $.ajax({
          type: "GET",
          url: "/api/seat",
          headers: {
              "Authorization": sessionStorage.getItem("token")
          }
      }).done((seats, status, xhr) => {
          this.setState({ seats });
          console.log(seats);
      }).fail((xhr) => {
          console.log(xhr.status);

          if(xhr.status == 401) {
              this.setState({
                  auth: false
              });
          }
      });

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

      if(this.state.editMode) {
            return (
                <Redirect to="/seat/new" />
            );
        }

      return (
          <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                  <button type="button" onClick={this._handleClick.bind(this)} className="btn btn-primary float-right">
                    Reserve a Seat
                </button>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="card-deck">
                      <SeatingList seats={this.state.seats} />
                    </div>
                </div>
            </div>
          </div>
      );
    }

    _handleClick(e) {
        e.preventDefault();

        this.setState({
            editMode: true
        });
    }
}

class SeatingList extends React.Component {

    render() {
        let seats = this._getSeats();

        return(
            seats.map((seat) =>
                    <SeatCard
                        key={seat._id}
                        seatId={seat._id}
                        cinema={seat.cinema}
                        movie={seat.movie}
                        time={seat.time}
                        date={seat.date}
                        numbers={seat.numbers} />
                )
        );
    }

    _getSeats() {
        return this.props.seats;
    }
}

class SeatCard extends React.Component {

    constructor() {
        super();

        this.state = {
            refresh: false,
            edit: ""
        }
    }

    render() {

        if(this.state.edit != "") {
            return (
                <Redirect to={`/seats/${this.state.edit}`} />
            );
        }

        if(this.state.refresh) {
            return (
                <Redirect to="/" />
            );
        }

        return(
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">{this.props.movie}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">Cinema</h6>
                            <p className="card-text">{this.props.cinema}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Time</h6>
                            <p className="card-text">{this.props.time}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Date</h6>
                            <p className="card-text">{this.props.date}</p>
                            <h6 className="card-subtitle mb-2 text-muted">Seat Numbers</h6>
                            <p className="card-text">{this.props.numbers}</p>
                            <ManageButton seatId={this.props.seatId} action={this._handleEdit.bind(this)} text="Edit" />
                            <ManageButton seatId={this.props.seatId} action={this._handleDelete.bind(this)} text="Delete" />
                        </div>
                    </div>
        );
    }

    _handleEdit(seatId) {
        console.log(seatId);

        this.setState({
            edit: seatId
        });
    }

    _handleDelete(seatId) {
        console.log(seatId);

        $.ajax({
            type: "DELETE",
            url: `/api/seat/${seatId}`,
            headers: {
                "Authorization": sessionStorage.getItem("token")
            }
        }).done((res, status, xhr) => {
            this.setState({
                refresh: true
            });
        }).fail((xhr) => {
            console.log(xhr.status);
        });
    }

}

class ManageButton extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <a href="#" onClick={this._handleEdit.bind(this)} className="card-link">{this.props.text}</a>
        );
    }

    _handleEdit(e) {
        e.preventDefault();
        this.props.action(this.props.seatId);
    }

}
