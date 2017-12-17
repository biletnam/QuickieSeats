const Router = window.ReactRouterDOM.HashRouter;
const Route =  window.ReactRouterDOM.Route;
const Link =  window.ReactRouterDOM.Link;
const Prompt =  window.ReactRouterDOM.Prompt;
const Switch = window.ReactRouterDOM.Switch;
const Redirect = window.ReactRouterDOM.Redirect;
const hashHistory = window.ReactRouterDOM.hashHistory;


class AppBox extends React.Component {

    render() {
        const textRight = {
          float: 'right'
        };

        return (
        <Router>
            <div>
              <header>
                <nav className="navbar navbar-light navbar-expand-lg">
                  <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <a className="navbar-brand" href="index.html">QuickieSeats</a>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                      <li><a href="#" className="navbar-brand">Movies</a></li>
                      <li><a href="#" className="navbar-brand">Cinemas</a></li>
                      <li><a href="#" className="navbar-brand">About</a></li>
                      </ul>
                  </div>
                </nav>
              </header>

              <div className="container" id="content">
                <Route exact path="/session/new" component={LoginBox} />
                <Route exact path="/seats/:seatId" component={SeatingEditBox} />
                <Route exact path="/seat/new" component={SeatingNewBox} />
                <Route exact path="/" component={CinemaBox} />
              </div>

              <footer>
                <span className="footer-text">(c) QuickieSeats 2017.</span>
              </footer>

            </div>
        </Router>

        );
    }
}
const Login = () => <LoginBox />
const Home = () => <CinemaBox />
const SeatingNew = () => <SeatingNewBox />
const SeatingEdit = () => <SeatingEditBox />

ReactDOM.render(<AppBox />, document.getElementById("root"));
