function Navbar() {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">EMI Santa Cruz</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03"
          aria-controls="navbarColor03" aria-expanded="true" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="navbarColor03">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">Dropdown</a>
              <div class="dropdown-menu" data-bs-popper="none">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Copyright GatoCorp</p>

    </footer>
  )
}

function Home() {
  const Link = ReactRouterDOM.Link
  return (
    <div class="home">
      <img src="https://www.emi.edu.bo/images/emi-900.png" alt="castillo de la emi" class="logo-emi" />
      <h3>Página principal</h3>
      <Link to="/uno/nombreDePrueba">uno</Link>
      <br />
      <Link to="/dos">dos</Link>
    </div>
  )
}
function paginauno(props) {
  return (<h1>soy el uno {props.match.params.name}</h1>)
}

function paginados() {
  return (<h1>soy el dos</h1>)
}

function App() {
  const Router = ReactRouterDOM.BrowserRouter
  const Route = ReactRouterDOM.Route
  const Switch = ReactRouterDOM.Switch
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/uno/:name" component={paginauno} />
          <Route path="/dos" component={paginados} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))