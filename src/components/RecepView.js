import React, { useState, useEffect } from 'react'
import { addData, getReservas, actualizarDatos } from '../firebase/MetodosFirebase';


function RecepView() {

  const [nombre, setNombre] = useState("")
  const [documento, setDocumento] = useState("")
  const [fecha, setFecha] = useState("")
  const [cantDias, setCantDias] = useState("")
  const [habitacion, setHabitacion] = useState("")
  const [mostrarReserva, setMostrarReserva] = useState([]);
  const [id, setId] = useState('');
  const [nuevosDatos, setNuevosDatos] = useState({});
  const [idd, setIdd] = useState('');
  const [nuevosDatoss, setNuevosDatoss] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      nombre,
      documento,
      fecha,
      cantDias,
      habitacion,
    }

    addData(data)

    setNombre("")
    setDocumento("")
    setFecha("")
    setCantDias("")
    setHabitacion("")
  }

  useEffect(() => {
    async function fetchData() {
      const mostrarReserva = await getReservas();
      setMostrarReserva(mostrarReserva);
    }
    fetchData();
  }, []);

  function handleSubmitt(event) {
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

  function handleSubmittt(event) {
    event.preventDefault();

    actualizarDatos(idd, nuevosDatoss);
  }

  function handleIdChangee(event) {
    setIdd(event.target.value);
  }

  function handleNuevosDatosChangee(event) {
    const { name, value } = event.target;
    setNuevosDatoss((prevNuevosDatos) => ({ ...prevNuevosDatos, [name]: value }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        <label>
          Nombre al que se hace la reserva:
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required/>
        </label>

        <label>
          Documento de identidad:
          <input type="number" value={documento} onChange={(e) => setDocumento(e.target.value)} required/>
        </label>

        <label>
          Fecha de entrada:
          <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required/>
        </label>

        <label>
          Cantidad de dias que ocupara la habitacion:
          <input type="number" value={cantDias} onChange={(e) => setCantDias(e.target.value)} required/>
        </label>

        <label>
          Tipo de habitacion:
          <select id='tipoH' value={habitacion} onChange={(e) => setHabitacion(e.target.value)}>
            <option value="sencilla">Sencilla</option>
            <option value="doble">Doble</option>
            <option value="matrimonial">Matrimonial</option>
            <option value="suite-s">Suite sencilla</option>
            <option value="suite-p">Suite precidencial</option>
          </select>
        </label>

        <button type='submit'>Realizar reserva</button>
      </form>

      <ul>
        {mostrarReserva.map((info) => (
          <li key={info.id}>
            <h3>{`reserva de ${info.nombre}`}</h3>
            <p>ID cliente: {info.id}</p>
            <p>Nombre: {info.nombre}</p>
            <p>Documento: {info.documento}</p>
            <p>Fecha: {info.fecha}</p>
            <p>Tipo de habitacion: {info.habitacion}</p>
            <p>Cantidad de dias: {info.cantDias}</p>
            <p>Pago realizado: {info.Pago}</p>
            <p>Pedidos : {info.Pedidos}</p>
            <p>Ingreso : {info.Ingreso}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmitt}>
        <label>
          ID de la reserva:
          <input type="text" value={id} onChange={handleIdChange} required/>
        </label>

        <label>
          Pedidos realizados:
          <input type="text" name="Pedidos" value={nuevosDatos.campo1} onChange={handleNuevosDatosChange} required/>
        </label>

        <button type="submit">Aagregar pedidos</button>
      </form>

      <form onSubmit={handleSubmittt}>
        <label>
          ID de la reserva:
          <input type="text" value={idd} onChange={handleIdChangee} required/>
        </label>

        <label>
          Estado ocupacional de la habitacion:
          <input type="text" name="Ingreso" value={nuevosDatoss.campo1} onChange={handleNuevosDatosChangee} required/>
        </label>

        <button type="submit">Agregar estado</button>
      </form>
    </div>
  )
}

export default RecepView

