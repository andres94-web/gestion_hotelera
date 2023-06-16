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
       <nav className="navbar">
        <div className="header">
        <h1 className="navbar-title">Bienvenido, Sr(a) {user.email}</h1></div>
        <AdminView user={user}/>
      </nav>
      </> 
    }
    else if (user.rol === "geren") {
      return <>
      <nav className="navbar">
      <div className="header">
      <h1 className="navbar-title">Bienvenido, Sr(a) {user.email}</h1></div>
      <GerenView user={user}/>
      </nav>
    </>
    }
    else if (user.rol === "cajero") {
      return <>
      <nav className="navbar">
      <div className="header">
      <h1 className="navbar-title">Bienvenido, Sr(a) {user.email}</h1></div>
      <CajeroView user={user}/>
      </nav>
    </>
    }
    else if (user.rol === "recep") {
      return <>
      <nav className="navbar">
      <h1 className="navbar-title">Bienvenido, Sr(a) {user.email}</h1>
      <RecepView user={user}/>
      </nav>
    </>
    }/*  else if (user.rol === "Undefine") {
      return <UndefineView user={user}/>
    } */
  }

  return (
    <nav className="navbar">
      <div className="header">
        <button className="navbar-button" onClick={() => signOut(auth)}> Cerrar sesion </button>
      </div>
      {view()}
    </nav>
  )
}

export default Home