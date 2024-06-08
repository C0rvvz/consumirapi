import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';

const DeleteHeroModal = ({ isOpen, toggle, heroe, refresh, poder }) => {
  const [error, setError] = useState(null);

  const eliminarHeroe = async () => {
    try {
      // Eliminar poder
      const urlPoder = `${Apiurl}poder/poder/${poder}`;
      await axios.delete(urlPoder);
  
      // Eliminar héroe
      const urlHeroe = `${Apiurl}heroe/heroe/${heroe.name}`;
      const response = await axios.delete(urlHeroe);
  
      console.log("Héroe eliminado:", response.data);
      refresh(); 
      toggle(); 
    } catch (error) {
      console.error("Error al eliminar héroe:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Eliminando Héroe</ModalHeader>
      <ModalBody>
            {error && <Alert color="danger">{error}</Alert>}
            {heroe && <p>¿Estás seguro de eliminar al héroe {heroe.name}?</p>}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={eliminarHeroe}>Eliminar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteHeroModal;