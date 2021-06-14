const API = 'https://gatocorpapi.herokuapp.com'

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
          props.history.push('admin/dashboard')
        }
        else {
          message.classList.remove('active')
          error.classList.add('active')
        }
      })
      .catch(error => console.log(error))
  }
  return (
    <div class="login-container">
      <header>
        <h1 class="my-4">EMI - Usuarios del sistema</h1>
      </header>
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
  )
}

function Dashboard() {
  const [carreras, setCarreras] = React.useState([])
  const [carreraBuscada, setCarreraBuscada] = React.useState('todas')
  const [tabla, setTabla] = React.useState([])
  const [registros, setRegistros] = React.useState([])

  // esto se ejecuta solo una vez
  React.useEffect(() => {
    fetch('https://gatocorpapi.herokuapp.com/carreras_aux')
      .then(response => response.json())
      .then(data => setCarreras(data))

    fetch('https://gatocorpapi.herokuapp.com/registros')
      .then(response => response.json())
      .then(data => setRegistros(data))
  }, [])

  // esto se ejecuta cada vez que cambian las variables
  React.useEffect(() => {
    if (carreraBuscada === 'todas') {
      fetch('https://gatocorpapi.herokuapp.com/estudiantes')
        .then(response => response.json())
        .then(data => setTabla(data))
    }
    else {
      fetch(`https://gatocorpapi.herokuapp.com/estudiantes/carrera/${carreraBuscada}`)
        .then(response => response.json())
        .then(data => setTabla(data))
    }
  }, [carreraBuscada])

  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <span class="dashboard-title">Estudiantes y Registros Gestión I-2021</span>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03"
            aria-controls="navbarColor03" aria-expanded="true" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse collapse" id="navbarColor03">
            <ul class="navbar-nav me-auto">

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                  aria-haspopup="true" aria-expanded="true">Buscar Por Carreras</a>
                <div class="dropdown-menu" data-bs-popper="none">
                  <a class="dropdown-item" href="#" onClick={e => {
                    e.preventDefault()
                    setCarreraBuscada('todas')
                  }}> Todas Las Carreras </a>
                  {
                    carreras.map(carrera => (
                      <a class="dropdown-item" href="#" onClick={e => {
                        e.preventDefault()
                        setCarreraBuscada(carrera['nombre'])
                      }}> {carrera['nombre_completo']} </a>
                    ))
                  }
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav >
      <h2 class="table-title">Estudiantes</h2>
      <div class="container-tabla">
        <table class="table table-hover">
          <thead>
            <tr class="table-dark">
              <th>Código</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Carnet de identidad</th>
              <th>Correo</th>
              <th>Carrera</th>
              <th>Semestre</th>
              <th>Foto de estudiante</th>
              <th>Certificado de Nacimiento</th>
              <th>Título de Baciller</th>
              <th>Certificado Médico</th>
            </tr>
          </thead>
          <tbody>
            {
              tabla.map((fila) => (
                <tr>
                  <td> {fila['codigo']} </td>
                  <td> {fila['nombre']} </td>
                  <td> {fila['apellido']} </td>
                  <td> {fila['carnet']} </td>
                  <td> {fila['correo']} </td>
                  <td> {fila['carrera']} </td>
                  <td> {fila['semestre']} </td>
                  <td>
                    <a href={fila['foto']} target="_blank">ver foto</a>
                  </td>
                  <td>
                    <a href={fila['certificado_nacimiento']} target="_blank">ver documento</a>
                  </td>
                  <td>
                    <a href={fila['titulo_bachiller']} target="_blank">ver documento</a>
                  </td>
                  <td>
                    <a href={fila['certificado_medico']} target="_blank">ver documento</a>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <h2 class="table-title">Registros</h2>
      <div class="container-tabla">
        <table class="table table-hover">
          <thead>
            <tr class="table-dark">
              <th>id</th>
              <th>Código de Estudiante</th>
              <th>Fecha de Registro</th>
              <th>Hora de Registro</th>
            </tr>
          </thead>
          <tbody>
            {
              registros.map((fila) => (
                <tr>
                  <td> {fila['id']} </td>
                  <td> {fila['codigo_estudiante']} </td>
                  <td> {fila['fecha']} </td>
                  <td> {fila['hora']} </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
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
          <Route path="/emi/admin/dashboard" component={Dashboard} />
          <Route path="/" component={Login} />
          {/* <Route path="/" component={Dashboard} /> */}
        </Switch>
      </Router>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))