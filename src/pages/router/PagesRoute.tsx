import { Navigate, Route, Routes } from 'react-router-dom'
import { FormUploadPage, FormCompensationPage } from '@pages/sui'


export const PagesRoute = () => {
  return (
    <>
      <Routes>

        <Route path="sui/upload" element={<FormUploadPage />} />
        <Route path="sui/compensation" element={<FormCompensationPage />} />
        <Route path="/" element={<Navigate to="/sui/upload" />} />

      </Routes>
    </>
  )
}
