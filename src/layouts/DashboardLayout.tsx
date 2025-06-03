import { JSX } from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Aside, Footer, Navbar } from "@components/shared"


export const DashboardLayout = (): JSX.Element => {

  return (
    <>
      <div className="wrapper">
        <div className="header-wrapper">
          <Navbar />
          <Aside />
          <Outlet />
          <Footer />
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
