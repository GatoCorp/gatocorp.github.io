function Navbar() {
  const Link = ReactRouterDOM.Link
  const [carreras, setCarreras] = React.useState([])

  React.useEffect(() => {
    fetch('https://gatocorpapi.herokuapp.com/carrera_aux')
      .then(response => response.json())
      .then(data => setCarreras(data))
  }, [])

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
              <a class="nav-link" href="../../emi/index.html">Inscripciones</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="../../emi/login.html">Perfil de estudiante</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button"
                aria-haspopup="true" aria-expanded="true">Carreras Ofertadas</a>
              <div class="dropdown-menu" data-bs-popper="none">
                {
                  carreras.map(carrera => (
                    <Link class="dropdown-item" to={`/carrera/${carrera['nombre']}`}>
                      {carrera['nombre_completo']}
                    </Link>
                  ))
                }
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

function Imagenes() {
  return (
    <div class="container-imagenes">
      <img src="https://santacruz.emi.edu.bo/images/Carrucel_carreras/ing_comercial.jpg" />
      <img src="https://santacruz.emi.edu.bo/images/Carrucel_carreras/ing_agronomica.jpg" />
      <img src="https://santacruz.emi.edu.bo/images/Carrucel_carreras/ing_civil.jpg" />
      <img src="https://santacruz.emi.edu.bo/images/Carrucel_carreras/ing_industrial.jpg" />
      <img src="https://santacruz.emi.edu.bo/images/Carrucel_carreras/ing_sistemas.jpg" />
      <img src="https://santacruz.emi.edu.bo/images/Carrucel_carreras/ing_ambiental.jpg" />
      <img src="https://santacruz.emi.edu.bo/images/Carrucel_carreras/ing_sist_electronicos.jpg" />
      <img src="https://santacruz.emi.edu.bo/images/Carrucel_carreras/ing_mecatronica.jpg" />
      <img src="https://santacruz.emi.edu.bo/images/Carrucel_carreras/ing_petrolera.jpg" />
    </div>
  )
}

function Objeto(props) {
  return (
    <div class="objeto">
      <img src={props.imageUrl} />
      <h2>{props.titulo}</h2>
      <p>{props.parrafo}</p>
    </div>
  )
}

function Home() {
  return (
    <div class="home">
      <img src="https://www.emi.edu.bo/images/emi-900.png" alt="castillo de la emi" class="logo-emi" />
      <h1>¿Quiénes Somos?</h1>
      <p>El año 1950, como resultado de un proceso de estudios organizacionales y analíticos el Estado Mayor del Ejército de Bolivia determinó la creación de un Instituto Técnico de nivel académico, con la responsabilidad de formar oficiales del Ejército, ampliándose la oferta académica en el año 1980.</p>
      <Imagenes />
      <div class="d-flex">
        <Objeto imageUrl="https://gatocorp.github.io/assets/prestigio.png" titulo="Prestigio"
          parrafo="Somos especialistas en la formación de Ingenieros, líderes en los campos científicos y tecnológicos." />
        <Objeto imageUrl="https://gatocorp.github.io/assets/disciplina.png" titulo="Disciplina"
          parrafo="Es el valor mas importante y fundamental en la formación de nuestros estudiantes." />
        <Objeto imageUrl="https://gatocorp.github.io/assets/opors.png" titulo="Mejores Oportunidades"
          parrafo="Nuestros profesionales #SelloEMI trabajando en las empresas mas prestigiosas a nivel nacional e internacional." />
      </div>
    </div>
  )
}

function carrera(props) {
  const [datos, setDatos] = React.useState([])

  React.useEffect(() => {
    fetch(`https://gatocorpapi.herokuapp.com/carrera/${props.match.params.name}`)
      .then(response => response.json())
      .then(data => setDatos(data))
  }, [props.match.params])

  return (
    <div class="container-carrera">
      <h1>{datos['nombre']}</h1>

      <div class="subcontainer-carrera">
        <div class="texto">
          <h2>OBJETIVO DE LA CARRERA</h2>
          <p>{datos['objetivo']}</p>
        </div>
        <img src={datos['logo']} />
      </div>

      <h2>OBJETO DE LA CARRERA</h2>
      <p>{datos['objeto']}</p>

      <h2>COMPETENCIA DEL PROFESIONAL</h2>
      <p>{datos['competencia']}</p>

      <h2>CAMPO LABORAL</h2>
      <p>{datos['campo']}</p>

      <div class="malla">
        <h2>MALLA CURRICULAR</h2>
        <img src={datos['malla']} />
      </div>
    </div>
  )
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
          <Route path="/carrera/:name" component={carrera} />
          <Route path="/" component={Home} />
        </Switch>
        <Footer />
      </Router>
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))