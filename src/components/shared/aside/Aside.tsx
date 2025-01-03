import { NavLink } from "react-router-dom"

export const Aside = () => {
  return (
    <>
      <div className="primary-menu">
        <nav className="navbar navbar-expand-lg align-items-center">
          <div
            className="offcanvas offcanvas-start"
            // tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-body">
              <ul className="navbar-nav align-items-center flex-grow-1">

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle dropdown-toggle-nocaret"
                    href="#"
                    data-bs-toggle="dropdown"
                  >
                    <div className="parent-icon">
                      <i className="bx bx-home-alt"></i>
                    </div>
                    <div className="menu-title d-flex align-items-center">Gestion SUI</div>
                    <div className="ms-auto dropy-icon">
                      <i className="bx bx-chevron-down"></i>
                    </div>
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <NavLink className="dropdown-item" to="sui/upload">
                        Cargar Archivos
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="sui/calc">
                        Compensacion
                      </NavLink>
                    </li>

                  </ul>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}
