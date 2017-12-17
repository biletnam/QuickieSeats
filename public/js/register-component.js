class RegisterBox extends React.Component {

      constructor() {
          super();

          this.state = {
              done: false
          }
      }

      render() {
          if(this.state.done) {
              return (
                  <Redirect to="/session/new" />
              );
          }

          return (
          <div className="container-fluid">
              <div className="row">
                  <div className="col-sm"></div>
                  <div className="col-sm" id="col-sm-user">
                    <h1>Create Account</h1>
                    <form onSubmit={this._handleSubmit.bind(this)}>
                      <div className="form-group">
                          <label htmlFor="name">Username</label>
                          <input type="text" ref={(input) => this._name = input} className="form-control" id="name" placeholder="Username"/>
                      </div>
                      <div className="form-group">
                          <label htmlFor="project">Password</label>
                          <input type="password" ref={(input) => this._password = input} className="form-control" id="password" placeholder="Password"/>
                      </div>
                      <input type="submit" className="btn btn-primary" />
                      <button type="button" className="btn btn-danger" onClick={this._close.bind(this)}>Cancel</button>
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

          let user = {
              name: this._name.value,
              password: this._password.value,
          }

          $.ajax({
              type: "POST",
              url: "/api/register",
              data: user
          }).done((user, status, xhr) => {
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
