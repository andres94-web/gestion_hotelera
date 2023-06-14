import React, { useState, useEffect } from 'react'
import { addDataInfo, getInformes, getReservas} from '../firebase/MetodosFirebase'

function GerenView() {

  const [informe, setInforme] = useState("")
  const [mostrarInforme, setMostrarInforme] = useState([]);
  const [mostrarReserva, setMostrarReserva] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = {
      informe
    }

    addDataInfo(data)

    setInforme("")
  }

  useEffect(() => {
    async function fetchData() {
      const mostrarInforme = await getInformes();
      setMostrarInforme(mostrarInforme);
      const mostrarReserva = await getReservas();
      setMostrarReserva(mostrarReserva);
    }
    fetchData();
  }, []);

  return (
    <div className='contenedor-geren'>
      <div className='display-geren'>
        <form onSubmit={handleSubmit}>

          <textarea id="informe" placeholder="Escribe un informe" cols="30" rows="5" value={informe} onChange={(e) => setInforme(e.target.value)} required>
          </textarea>

          <button type='submit'>generar informe</button>
        </form>
        
        <ul  className="list">
          {mostrarInforme.map((info) => (
            <li key={info.id}  className="list-item">
              <p>Informe: {info.informe}</p>
            </li>
          ))}
        </ul>
        <ul  className="list">
          {mostrarReserva.map((info) => (
            <li key={info.id}  className="list-item">
              <h3>{`Reserva de ${info.nombre}`}</h3>
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
    </div>
  )
}

export default GerenView
