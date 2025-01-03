
export const SuiAlertMessage = () => {
  return (
    <>   
        <div className="col-md-12 alert-message"> 
            <div className="alert alert-warning border-0 bg-warning alert-dismissible fade show py-2">
                <div className="d-flex align-items-center">
                    <div className="font-35 text-dark"><i className="bx bx-info-circle"></i>
                    </div>
                    <div className="ms-3">
                        <h6 className="mb-0 text-dark">Alerta</h6>
                        <div className="text-dark">Se esta procesando la informacion!</div>
                    </div>
                </div>
            </div>
        </div>   
    </>
  )
}
