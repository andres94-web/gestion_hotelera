import React, { useState, useEffect } from 'react'
import { actualizarDatos, getReservas } from '../firebase/MetodosFirebase'

function CajeroView() {

  const [id, setId] = useState('');
  const [nuevosDatos, setNuevosDatos] = useState({});
  const [mostrarReserva, setMostrarReserva] = useState([]);;

  useEffect(() => {
    async function fetchData() {
      const mostrarReserva = await getReservas();
      setMostrarReserva(mostrarReserva);
    }
    fetchData();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();


    actualizarDatos(id, nuevosDatos);
  }

  function handleIdChange(event) {
    setId(event.target.value);
  }

  function handleNuevosDatosChange(event) {
    const { name, value } = event.target;
    setNuevosDatos((prevNuevosDatos) => ({ ...prevNuevosDatos, [name]: value }));
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>

        <label>
          ID de la reserva:
          <input type="text" value={id} onChange={handleIdChange} required/>
        </label>

        <label>
          Pago realizado:
          <input type="text" name="Pago" value={nuevosDatos.campo1} onChange={handleNuevosDatosChange} required/>
        </label>

        <button type="submit">Actualizar estado</button>

      </form>
      
      <ul>
        {mostrarReserva.map((info) => (
          <li key={info.id}>
            <h3>{`reserva de ${info.nombre}`}</h3>
            <p>ID de la reserva: {info.id}</p>
            <p>Nombre: {info.nombre}</p>
            <p>Documento: {info.documento}</p>
            <p>Fecha: {info.fecha}</p>
            <p>Tipo de habitacion: {info.habitacion}</p>
            <p>Cantidad de dias: {info.cantDias}</p>
            <p>Pago realizado : {info.Pago}</p>
            <p>Pedidos : {info.Pedidos}</p>
            <p>Ingreso : {info.Ingreso}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CajeroView
