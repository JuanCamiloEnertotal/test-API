import { Outlet } from "react-router-dom"
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
    </>
  )
}
