import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Lista } from "./components/Lista"
import ModificarName from "./components/ModificarName"
import { ChangePassword } from "./components/ModificarPassword"
import ModificarUserName from "./components/ModificarUserName"

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Lista/>}/>
        <Route path="/modificarname/:id" element={<ModificarName/>}/>
        <Route path="/change-password" element={<ChangePassword />}/>
        <Route path="/change-username" element={<ModificarUserName />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
