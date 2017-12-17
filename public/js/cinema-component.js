class CinemaBox extends React.Component {

    constructor() {
        super();

        this.state = {
            seats: [],
            auth: true
        }
    }

    componentWillMount() {
      // $.ajax({
      //     type: "GET",
      //     url: "/api/",
      //     headers: {
      //         "Authorization": sessionStorage.getItem("token")
      //     }
      // }).done((meetings, status, xhr) => {
      //     console.log("heh");
      // }).fail((xhr) => {
      //     console.log(xhr.status);
      //
      //     if(xhr.status == 401) {
      //         this.setState({
      //             auth: false
      //         });
      //     }
      // });

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
                      <h1>Seats</h1>
                    </div>
                </div>
            </div>
          </div>
      );
    }
}
