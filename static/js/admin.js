
function Header() {
  return (
    <header>
      <h1 class="my-4">EMI - Usuarios del sistema</h1>
    </header>
  )
}

function Login(props) {
  function handleSubmit(e) {
    e.preventDefault()
    props.history.push('admin.html/dashboard')
  }
  return (
    <React.Fragment>
      <div class="login-container">
        <Header />
        <form class="login form-group" onSubmit={handleSubmit}>
          <h4>Ingresar al sistema</h4>
          <div class="form-floating mb-4">
            <input class="form-control" id="floatingInput" placeholder="name@example.com" />
            <label for="floatingInput">Usuario</label>
          </div>
          <div class="form-floating mb-4">
            <input class="form-control" id="floatingPassword" placeholder="Password" />
            <label for="floatingPassword">Contraseña</label>
          </div>
          <button class="ripple">Ingresar</button>
        </form>
      </div>
    </React.Fragment>
  )
}

function Dashboard() {
  return (
    <h1>I'm in!</h1>
  )
}

function App() {
  const Router = ReactRouterDOM.BrowserRouter
  const Route = ReactRouterDOM.Route
  const Switch = ReactRouterDOM.Switch
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {/* la hardodeada is real */}
          <Route path="/emi/admin.html/dashboard" component={Dashboard} />
          <Route path="/" component={Login} />
        </Switch>
      </Router>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))