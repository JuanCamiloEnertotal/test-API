import { useEnerbitStore } from "@root/stores/enerbit/enerbit.store"



export const FindBorder = () => {

    const buscarFrontera = useEnerbitStore(state => state.buscarFrontera);
    const setTerminoBusqueda = useEnerbitStore(state => state.setTerminoBusqueda);
    const fronteras = useEnerbitStore(state => state.fronteras);

    const buscarRegistro = (termino: string) => {
        setTerminoBusqueda(termino);
        buscarFrontera(termino, fronteras.paginaActual);
    }

    return (
        <>
            <div className="input-group mb-3">
                <input type="text"
                    className="form-control"
                    placeholder="Codigo Sic"
                    onChange={(event) => buscarRegistro(event.target.value)}
                />
                <span className="input-group-text" id="basic-addon2"><i className="lni lni-magnifier"></i></span>
            </div>
        </>
    )
}
