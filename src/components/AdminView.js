import React, { useState, useEffect } from 'react'
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { getUsuarios } from '../firebase/MetodosFirebase';
import firebaseApp from "../firebase/Credenciales"
import CajeroView from './CajeroView'
import RecepView from './RecepView'
import GerenView from './GerenView'
const db = getFirestore(firebaseApp);

function AdminView({ user }) {

  const [id, setId] = useState('');
  const [mostrarUsuarios, setMostrarUsuarios] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const mostrarUsuarios = await getUsuarios();
      setMostrarUsuarios(mostrarUsuarios);
    }
    fetchData();
  }, [])

  const handleClickEliminar = async (coleccion) => {
    const datoRef = doc(db, coleccion, id);
    await deleteDoc(datoRef);
    // Actualiza la lista de datos en la página
  }

  return (
    <div>
      <h2>Vista y tareas del administrador</h2>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={() => handleClickEliminar('usuarios')}>Eliminar Usuario</button>

      <ul>
        {mostrarUsuarios.map((info) => (
          <li key={info.id}>
            <h3>{`Usuario ${info.correo}`}</h3>
            <p>ID cliente: {info.id}</p>
            <p>Rol: {info.rol}</p>
          </li>
        ))}
      </ul>

      <h2>Vista y tareas del recepcionista</h2>
      <RecepView user = {user}/>
      <h2>Vista y tareas del cajero</h2>
      <CajeroView user = {user}/>
      <h2>Vista y tareas del gerente</h2>
      <GerenView user = {user}/>
    </div>
  )
}

export default AdminView