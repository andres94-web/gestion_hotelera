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
  <div className='content'>
    <div className='display'>
      <div className='display-admin-recep'>
        <div className="card-admin">
          <h2>Vista y tareas del administrador</h2>
          <input placeholder="Escribe un usuario" type="text" className='input' value={id} onChange={(e) => setId(e.target.value)} />
          <button className="boton-admin" onClick={() => handleClickEliminar('usuarios')}>Eliminar Usuario</button>
            <ul className="list">
              {mostrarUsuarios.map((info) => (
                <li key={info.id} className="list-item">
                  <h3>{`Usuario ${info.correo}`}</h3>
                  <p>ID cliente: {info.id}</p>
                  <p>Rol: {info.rol}</p>
                </li>
              ))}
            </ul>
        </div>
          <div className ="card-recep">
          <h2>Vista y tareas del recepcionista</h2>
          <RecepView user = {user}/></div>
    </div>
        <div className='display-cajero-geren'>
          <div className ="card-cajero">
          <h2>Vista y tareas del cajero</h2>
          <CajeroView user = {user}/></div>

          <div className ="card-geren">
          <h2>Vista y tareas del gerente</h2>
          <GerenView user = {user}/></div>
      </div>
    </div>
  </div>
  )
}

export default AdminView