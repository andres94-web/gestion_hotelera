import { useState } from "react"

import firebaseApp from "../firebase/Credenciales"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import {getFirestore, doc, setDoc} from "firebase/firestore"
import '../styles/login.css'

const auth = getAuth(firebaseApp)
const firestore = getFirestore(firebaseApp)

function Login() {
  
  const [isRegistrando, setIsRegistrando] = useState(false)

  async function registrarUsuario(email, password, rol) {
    const infoUsuario = await createUserWithEmailAndPassword(
      auth,
      email,
      password
      ).then((usuarioFirebase)=>{
      return usuarioFirebase
    })

    console.log(infoUsuario.user.uid);
    const docuRef = doc(firestore, `usuarios/${infoUsuario.user.uid}`)
    setDoc(docuRef, {correo: email, rol: rol})
  }

  function submitHandler(e) {
    e.preventDefault()

    const email = e.target.elements.email.value
    const password = e.target.elements.password.value
    const rol = e.target.elements.rol.value

    console.log("submit", email, password, rol);

    if (isRegistrando) {
      //registrar
      registrarUsuario(email, password, rol)
    } else {
      //login
      signInWithEmailAndPassword(auth, email, password)
    }
  }

  return (
    <div class="container">
    <div class="form-box">
      <form class="form">
        <span class="title">{isRegistrando ? "Registrate" : "Inicia sesion"}</span>
        <span class="subtitle">{isRegistrando? "Crea una nueva cuenta" : "Recordemos tus datos"}</span>
      </form>

      <div class="form-container">
        <form onSubmit={submitHandler}>
          <label>
            <input type="email" id="email" class="input" placeholder="Correo electronico"/>
          </label>
  
        <label>
          <input type="password" id="password" class="input" placeholder="Contraseña"/>
        </label>

      
        <label> 
          Rol:
          <select id="rol">
            <option value="admin">Administrador</option>
            <option value="cajero">Cajero</option>
            <option value="geren">Gerente</option>
            <option value="recep">Recepcionista</option>
          </select>
        </label>

        <input 
          type="submit"
          value={isRegistrando ? "Crear" : "Iniciar"} class="iniciar" />
        </form>
      </div>
      <div class="form-section">
      <p>¿Qué quieres hacer?</p> 
    <button onClick={()=> setIsRegistrando(!isRegistrando)}>
        {isRegistrando ? "Ya tengo una cuenta" : "Registrarse"}
      </button>
      </div>
    </div>
    </div>
  )
}

export default Login