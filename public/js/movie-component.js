class MovieBox extends React.Component {

    constructor() {
        super();

        this.state = {
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

      return (
          <div className="container-fluid">
            <div className="row">
                <div className="col-sm">
                  <h1>What is this</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <div className="card-deck">
                      <h1>MOvies</h1>
                    </div>
                </div>
            </div>
          </div>
      );
    }
}
