import { useEnerbitStore } from "@root/stores/enerbit/enerbit.store"


export const TableNavigation = () => {

    const listadoFronteras = useEnerbitStore(state => state.listadoFronteras);
    const fronteras = useEnerbitStore(state => state.fronteras);



    const cambiarPagina = async (pagina: number) => {
        if (pagina <= 0 || pagina > fronteras.totalPaginas) return;

        await listadoFronteras(pagina)

    }

    // Número máximo de páginas a mostrar en el paginador
    const maxPaginasVisibles = 5;

    // Calcular rango dinámico de páginas a mostrar
    let inicio = Math.max(0, fronteras.paginaActual - Math.floor(maxPaginasVisibles / 2));
    let fin = inicio + maxPaginasVisibles;

    // Ajustar si el rango sobrepasa el total de páginas
    if (fin > fronteras.totalPaginas) {
        fin = fronteras.totalPaginas;
        inicio = Math.max(0, fin - maxPaginasVisibles);
    }

    // Construir el array de páginas visibles (números base 1 para mostrar)
    const paginasVisibles = [];
    for (let i = inicio; i < fin; i++) {
        paginasVisibles.push(i + 1);
    }

    return (
        <>
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className={`page-item ${fronteras.paginaActual === 0 ? "disabled" : ""}`}>
                        <button className="page-link" aria-label="Previous" onClick={() => cambiarPagina(fronteras.paginaActual - 1)}>
                            <span aria-hidden="true">«</span>
                        </button>
                    </li>
                    {paginasVisibles.map((pagina) => (
                        <li key={pagina} className={`page-item ${fronteras.paginaActual === pagina ? "active" : ""}`}>
                            <button className="page-link" onClick={() => cambiarPagina(pagina)}>{pagina}</button>
                        </li>
                    ))}

                    <li className={`page-item ${fronteras.paginaActual === fronteras.totalPaginas ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => cambiarPagina(fronteras.paginaActual + 1)}>
                            <span aria-hidden="true">»</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </>
    )
}
