import { BrowserRouter, Routes, Route } from "react-router-dom"
import Photos from "./pages/Photos"
import Cart from "./pages/Cart"
import Layout from "./components/Layout"
import { PhotoContextProvider } from "./components/Context"

export default function App() {
  return (
    <PhotoContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Photos />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PhotoContextProvider>
  )
}
