import { Navigate, Route, Routes } from 'react-router-dom'
import { FormUploadPage, FormCompensationPage } from '@pages/sui'
import { FormEnerbitPage } from '@pages/enerbit'





export const PagesRoute = () => {
  return (
    <>
      <Routes>

        <Route path="sui/upload" element={<FormUploadPage />} />
        <Route path="sui/compensation" element={<FormCompensationPage />} />
        <Route path="enerbit/borders" element={<FormEnerbitPage />} />
        <Route path="/" element={<Navigate to="/sui/upload" />} />

      </Routes>
    </>
  )
}
