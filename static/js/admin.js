const API = 'https://gatocorpapi.herokuapp.com'

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

    let usuario = document.getElementById('usuario').value
    let contrasena = document.getElementById('contrasena').value
    let message = document.getElementById('message')
    let error = document.getElementById('error')
    message.classList.add('active', 'spin')
    error.classList.remove('active')

    fetch(`${API}/login/administrador`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        usuario: usuario,
        contrasena: contrasena
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.correcto) {
          message.classList.remove('active', 'spin')
          props.history.push('admin.html/dashboard')
        }
        else {
          message.classList.remove('active')
          error.classList.add('active')
        }
      })
      .catch(error => console.log(error))
  }
  return (
    <React.Fragment>
      <div class="login-container">
        <Header />
        <div class="message" id="message">
          <img src="https://www.nicepng.com/png/detail/12-127874_stock-loading-svg-circle-loading-png.png" height="35" width="35" />
          <span class="px-2">verificando usuario...</span>
        </div>
        <div class="message error" id="error">
          <span>usuario y/o contraseña incorrectos.</span>
        </div>
        <form class="login form-group" onSubmit={handleSubmit}>
          <h4>Ingresar al sistema</h4>
          <div class="form-floating mb-4">
            <input class="form-control" id="usuario" placeholder="name@example.com" />
            <label for="floatingInput">Usuario</label>
          </div>
          <div class="form-floating mb-4">
            <input class="form-control" id="contrasena" placeholder="Password" />
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