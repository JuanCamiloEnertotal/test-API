

export const Spinner = () => {

    return (
        <>
            <div className="d-flex justify-content-center">
                <button className="btn btn-danger" type="button" disabled>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    Descargando informaciòn...
                </button>
            </div>

        </>
    )
}
