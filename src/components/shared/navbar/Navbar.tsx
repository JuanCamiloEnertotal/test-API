export const Navbar = () => {
  return (
    <>
      <header>
        <div className="topbar d-flex align-items-center">
          <nav className="navbar navbar-expand gap-3">
            <div className="topbar-logo-header d-none d-lg-flex">
              <div className="">
                <img src="/src/assets/images/logo-mini.png" className="logo-icon" alt="logo icon" />
              </div>
              <div className="">
                <h4 className="logo-text">PROCESOS SUI</h4>
              </div>
            </div>
            <div
              className="mobile-toggle-menu d-block d-lg-none"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
            >
              <i className="bx bx-menu"></i>
            </div>
            <div
              className="search-bar d-lg-block d-none"
              data-bs-toggle="modal"
              data-bs-target="#SearchModal"
            ></div>
            <div className="top-menu ms-auto">
              <ul className="navbar-nav align-items-center gap-1">
                <li
                  className="nav-item mobile-search-icon d-flex d-lg-none"
                  data-bs-toggle="modal"
                  data-bs-target="#SearchModal"
                >
                  <a className="nav-link" href="#">
                    <i className="bx bx-search"></i>
                  </a>
                </li>
              </ul>
            </div>

          </nav>
        </div>
      </header>
    </>
  )
}
