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
          pullRight: 'true'
        };

        return (
        <Router>
            <div>
              <header>
                <nav className="navbar navbar-light justify-content-start">
                  <a href="index.html" className="navbar-brand" >QuickieSeats</a>
                  <a href="movies.html" className="navbar-brand">Movies</a>
                  <a href="#" className="navbar-brand">Cinemas</a>
                  <a href="#" className="navbar-brand">About</a>
                  <a href="#" style={textRight} className="navbar-brand text-right" data-toggle="modal" data-target="#loginModal">Login/Register</a>
                </nav>
              </header>

              <div className="container" id="content">
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
const Home = () => <ScrumBox />
const MeetingNew = () => <MeetingNewBox />
const MeetingEdit = () => <MeetingEditBox />

ReactDOM.render(<AppBox />, document.getElementById("root"));
