import { NavLink } from "react-router-dom"

export const NotFoundPage = () => {
  return (
    <>
    <div className="error-404 d-flex align-items-center justify-content-center">
			<div className="container">
				<div className="card py-5">
					<div className="row g-0">
						<div className="col col-xl-5">
							<div className="card-body p-4">
								<h1 className="display-1"><span className="text-primary">4</span><span className="text-danger">0</span><span className="text-success">4</span></h1>
								<h2 className="font-weight-bold display-4">Pagina no encontrada</h2>
								<p>La pagina ingresada no existe, verifique.</p>
								<div className="mt-5"> 
                                   <NavLink className="btn btn-primary btn-lg px-md-5 radius-30" to={'/dashboard/sui/upload'}>Regresar</NavLink>
								</div>
							</div>
						</div>
						<div className="col-xl-7">
							<img src="https://cdn.searchenginejournal.com/wp-content/uploads/2019/03/shutterstock_1338315902.png" className="img-fluid" alt="" />
						</div>
					</div>
					
				</div>
			</div>
		</div>

    </>
  )
}
