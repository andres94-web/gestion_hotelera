import React from 'react'
import AdminView from "../components/AdminView"
import GerenView from "../components/GerenView"
import CajeroView from "../components/CajeroView"
import RecepView from '../components/RecepView'
/* import UndefineView from '../components/UndefineView' */
import firebaseApp from "../firebase/Credenciales"
import { getAuth, signOut } from "firebase/auth"
const auth = getAuth(firebaseApp)

function Home({user}) {

  const view = function viewRol() {
    if (user.rol === "admin") {
      return <>
        <h1>Bienvenido, Sr(a) {user.email}</h1>
        <AdminView user={user}/>
      </> 
    }
    else if (user.rol === "geren") {
      return <>
      <h1>Bienvenido, Sr(a) {user.email}</h1>
      <GerenView user={user}/>
    </>
    }
    else if (user.rol === "cajero") {
      return <>
      <h1>Bienvenido, Sr(a) {user.email}</h1>
      <CajeroView user={user}/>
    </>
    }
    else if (user.rol === "recep") {
      return <>
      <h1>Bienvenido, Sr(a) {user.email}</h1>
      <RecepView user={user}/>
    </>
    }/*  else if (user.rol === "Undefine") {
      return <UndefineView user={user}/>
    } */
  }

  return (
    <div>
      <button onClick={() => signOut(auth)}> Cerrar sesion </button>
      {view()}
    </div>
    
  )
}

export default Home