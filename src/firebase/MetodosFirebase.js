import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, /* deleteDoc */ } from "firebase/firestore";
import firebaseApp from "../firebase/Credenciales"
const db = getFirestore(firebaseApp)

// ! METODOS PARA LAS RESERVAS

// todo: funcion para guardar datos de las reservas en firebase
export const addData = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'reservas'), data);
    console.log('Documento agregado con ID: ', docRef.id, data);
  } catch (e) {
    console.error('Error al agregar documento: ', e);
  }
}; 

// todo: funcion para acceder a los datos de las reservas en firebase
export async function getReservas() {
  const reservasCollection = collection(db, "reservas");
  const reservasSnapshot = await getDocs(reservasCollection);
  const reservas = reservasSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return reservas;
}

// todo: funcion para actualizar los datos de las reservas en firebase
export async function actualizarDatos(id, nuevosDatos) {
  const docRef = doc(db, 'reservas', id);

  try {
    await updateDoc(docRef, nuevosDatos);
    console.log('Datos actualizados correctamente');
  } catch (error) {
    console.error('Error al actualizar datos:', error);
  }
}

// ! METODOS PARA LOS INFORMES

// todo: funcion para guardar datos de los informes en firebase
export const addDataInfo = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'informes'), data);
    console.log('Documento agregado con ID: ', docRef.id, data);
  } catch (e) {
    console.error('Error al agregar documento: ', e);
  }
}; 

// todo: funcion para acceder a los datos de los informes en firebase
export async function getInformes() {
  const informesCollection = collection(db, "informes");
  const informesSnapshot = await getDocs(informesCollection);
  const informes = informesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return informes;
}

// ! METODOS PARA LOS USUARIOS

// todo: funcion para acceder a los datos de los usuarios en firebase
export async function getUsuarios() {
  const reservasCollection = collection(db, "usuarios");
  const reservasSnapshot = await getDocs(reservasCollection);
  const reservas = reservasSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return reservas;
}
