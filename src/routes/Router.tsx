import { DashboardLayout } from "@layouts/DashboardLayout"
import { FormCompensationPage, FormUploadPage, FormUtilityPage } from "@pages/sui";
import { NotFoundPage } from "@root/pages/common/not-found/NotFoundPage";
import { Root } from "@root/Root";




import { createBrowserRouter } from "react-router-dom";


export const Router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: 'dashboard',
                element: <DashboardLayout />,
                children: [
                    {
                        path: 'sui/upload',
                        element: <FormUploadPage />
                    },
                    {
                        path: 'sui/calc',
                        element: <FormCompensationPage />
                    },
                    {
                        path: 'sui/utility',
                        element: <FormUtilityPage />
                    },
                    {
                        path: '*',
                        element: <NotFoundPage />
                    }

                ]
            },
        ]
    }
])
