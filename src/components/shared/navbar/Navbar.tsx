export const Navbar = () => {
  return (
    <>
      <header>
        <div className="topbar d-flex align-items-center">
          <nav className="navbar navbar-expand gap-3">
            <div className="topbar-logo-header d-none d-lg-flex">

              <div className="">
                <img src="/src/assets/images/logo-ettc1.png" className="logo-icon" alt="logo icon" />
              </div>

              <div className="">
                <img src="/src/assets/images/logo-ettc2.png" className="logo-text" style={{ height: '30px' }} alt="logo icon" />
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

            {/* <div className="user-box dropdown px-3">
              <a className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <img src="/src/assets/images/avatars/ingeniero.png" className="user-img" alt="user avatar" />
                <div className="user-info">
                  <p className="user-name mb-0">Centro de Gestion de Medida</p>
                  <p className="designattion mb-0">Administrador</p>
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li><a className="dropdown-item d-flex align-items-center" href="#"><i className="bx bx-user fs-5"></i><span>Profile</span></a>
                </li>
                <li><a className="dropdown-item d-flex align-items-center" href="#"><i className="bx bx-cog fs-5"></i><span>Settings</span></a>
                </li>
                <li><a className="dropdown-item d-flex align-items-center" href="#"><i className="bx bx-home-circle fs-5"></i><span>Dashboard</span></a>
                </li>
                <li><a className="dropdown-item d-flex align-items-center" href="#"><i className="bx bx-dollar-circle fs-5"></i><span>Earnings</span></a>
                </li>
                <li><a className="dropdown-item d-flex align-items-center" href="#"><i className="bx bx-download fs-5"></i><span>Downloads</span></a>
                </li>
                <li>
                  <div className="dropdown-divider mb-0"></div>
                </li>
                <li><a className="dropdown-item d-flex align-items-center" href="javascript:;"><i className="bx bx-log-out-circle"></i><span>Logout</span></a>
                </li>
              </ul>
            </div> */}

          </nav>
        </div>
      </header>
    </>
  )
}
