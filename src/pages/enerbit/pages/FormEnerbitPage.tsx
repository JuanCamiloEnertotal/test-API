

import { useEnerbitStore } from "@root/stores/enerbit/enerbit.store";
import { ActionsButtons, FindBorder, ModalEnerbitBorder, ModalExportData, Spinner, TableBorders, TableNavigation } from "../components"




export const FormEnerbitPage = () => {

    const spinner = useEnerbitStore(state => state.spinner);

    return (
        <>
            <div className="page-wrapper">
                <div className="page-content">
                    <div className="row">
                        <div className="col-12 col-lg-12 d-flex">
                            <div className="card radius-10 w-100">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between">


                                        <div className="row">
                                            <div className="col-12">
                                                <FindBorder />
                                            </div>
                                        </div>

                                        <div className="row">

                                            <div className="col-12">

                                                <ActionsButtons />

                                            </div>

                                        </div>

                                    </div>

                                </div>
                                <div className="card-body">


                                    {
                                        !spinner ? (

                                            <>
                                                <TableBorders />
                                                <div className="mt-3 d-flex justify-content-end">
                                                    <TableNavigation />
                                                </div>
                                            </>

                                        ) : <Spinner />
                                    }



                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <ModalEnerbitBorder />
            <ModalExportData />
        </>
    )
}
