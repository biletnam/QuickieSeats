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

        this._fetchMeeting(seatId);

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
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-meeting">
                            <form onSubmit={this._handleSubmit.bind(this)}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="yesterday">Yesterday</label>
                                        <textarea onChange={this._handleYesterdayChange.bind(this)} value={this.state.seat.yesterday} ref={(textarea) => this._yesterday = textarea} className="form-control" id="yesterday" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="today">Today</label>
                                        <textarea onChange={this._handleTodayChange.bind(this)} value={this.state.seat.today} ref={(textarea) => this._today = textarea} className="form-control" id="today" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="impediment">Impediment</label>
                                        <textarea onChange={this._handleImpedimentChange.bind(this)} value={this.state.seat.impediment} ref={(textarea) => this._impediment = textarea} className="form-control" id="impediment" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={this._handleClose.bind(this)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                </div>
                <div className="col-sm"></div>
            </div>
        </div>
        );
    }

    _handleYesterdayChange(e) {
        let seat = this.state.seat;

        this.setState({
            seat: Object.assign({}, seat,
                {
                    yesterday: e.target.value
                })
        });
    }

    _handleTodayChange(e) {
        let seat = this.state.seat;

        this.setState({
            seat: Object.assign({}, seat,
                {
                    today: e.target.value
                })
        });
    }

    _handleImpedimentChange(e) {
        let seat = this.state.seat;

        this.setState({
            seat: Object.assign({}, seat,
                {
                    impediment: e.target.value
                })
        });
    }

    _fetchMeeting(seatId) {
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
        <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-meeting">
                            <form onSubmit={this._handleSubmit.bind(this)}>
                                <div className="modal-body">
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" ref={(input) => this._name = input} className="form-control" id="name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="project">Project</label>
                                        <input type="text" ref={(input) => this._project = input} className="form-control" id="project" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="yesterday">Yesterday</label>
                                        <textarea ref={(textarea) => this._yesterday = textarea} className="form-control" id="yesterday" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="today">Today</label>
                                        <textarea ref={(textarea) => this._today = textarea} className="form-control" id="today" rows="3"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="impediment">Impediment</label>
                                        <textarea ref={(textarea) => this._impediment = textarea} className="form-control" id="impediment" rows="3"></textarea>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" onClick={this._handleClose.bind(this)} className="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <input type="submit" className="btn btn-primary" />
                                </div>
                            </form>
                </div>
                <div className="col-sm"></div>
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
            name: this._name.value,
            project: this._project.value,
            yesterday: this._yesterday.value,
            today: this._today.value,
            impediment: this._impediment.value
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
