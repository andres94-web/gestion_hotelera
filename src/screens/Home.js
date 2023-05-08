import React from 'react'
import AdminView from "../components/AdminView"
import GerenView from "../components/GerenView"
import CajeroView from "../components/CajeroView"
import RecepView from "../components/RecepView"

import firebaseApp from "../firebase/Credenciales"
import { getAuth, signOut } from "firebase/auth"
const auth = getAuth(firebaseApp)

function Home({user}) {

  const view = function viewRol() {
    if (user.rol == "admin") {
      return <AdminView />
    }
    if (user.rol == "geren") {
      return <GerenView />
    }
    if (user.rol == "cajero") {
      return <CajeroView />
    }
    if (user.rol == "recep") {
      return <RecepView />
    }
  }

  return (
    <div>
      Home
      <button onClick={() => signOut(auth)}> Cerrar sesion </button>
      {view()}
    </div>
    
  )
}

export default Home