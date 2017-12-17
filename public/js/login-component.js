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
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="loginModalLabel">Login</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <h1>Login Stuff</h1>
              </div>
            </div>
          </div>
        );
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
