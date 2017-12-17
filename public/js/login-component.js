class LoginBox extends React.Component {

    constructor() {
        super();

        this.state ={
            message: "",
            redirect: false
        }
    }

    render() {

        if(this.state.redirect) {
            return (
                <Redirect to="/" />
            );
        }

        return (
          <div className="container-fluid">
            <div className="row">
                <div className="col-sm"></div>
                <div className="col-sm" id="col-sm-login">
                <div className="alert-login alert alert-danger invisible" role="alert">
                    {this.state.message}
                </div>
                    <form onSubmit={this._handleSubmit.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="name">Username</label>
                            <input type="text" ref={(input) => this._name = input} className="form-control" id="name" placeholder="Username" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" ref={(input) => this._password = input} className="form-control" id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        <button onClick={this.goToRegister.bind(this)} className="btn btn-default" type="button">Register</button>
                    </form>

                </div>
                <div className="col-sm"></div>
            </div>
        </div>
        );
    }

    goToRegister(e){
      e.preventDefault();
      console.log("RegisterClicked");
      this.props.history.push("/register/new");
    }

    _handleSubmit(e) {
        e.preventDefault();

        let session = {
            name: this._name.value,
            password: this._password.value
        }

        $.ajax({
            type: "POST",
            url: "/api/session",
            data: session
        }).done((res, status, xhr) => {
            sessionStorage.setItem("token", xhr.getResponseHeader("Authorization"));
            this.setState({ redirect: true });
        }).fail((xhr) => {
            if(xhr.status == 401) {
                this._showLoginError("Invalid name or password.");
            }
        });
    }

    _showLoginError(error) {
        this.setState({
            message: error
        });

        let loginAlert = $(".alert-login");

        if(loginAlert.hasClass("invisible")) {
            loginAlert.removeClass("invisible");
        }
    }
}
