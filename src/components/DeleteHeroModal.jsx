import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import '../assetss/css/App.css'; 

const DeleteHeroModal = ({ isOpen, toggle, hero, refresh }) => {
  const [error, setError] = useState(null);

  const deleteHero = async () => {
    try {
      setError(null); // Reset error state before attempting to delete

      // Eliminar heroe
      const urlHero = `${Apiurl}hero/deleteHero/${hero.idHero}`; // Assuming hero.id is the unique identifier
      const response = await axios.delete(urlHero);

      console.log("Heroe eliminado:", response.data);
      refresh();
      toggle();
    } catch (error) {
      console.error("Error al eliminar el heroe:", error);
      const errorMessage = error.response?.data?.message || 'Error desconocido al eliminar el heroe.';
      setError(errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Eliminando el heroe</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        {hero && <p>¿Estás seguro de eliminar al heroe {hero.nombreHero}?</p>}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={deleteHero}>Eliminar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteHeroModal;