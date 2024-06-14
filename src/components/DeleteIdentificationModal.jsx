import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import '../assetss/css/App.css'; 

const DeleteIdentificationModal = ({ isOpen, toggle, refresh, identification, hero }) => {
  const [error, setError] = useState(null);

  const deleteIdentification = async () => {
    try {
      setError(null); // Reset error state before attempting to delete

      // Eliminar identification
      const urlIdentification = `${Apiurl}identification/deleteIdentification/${identification.idIdentification}`;
      const response = await axios.delete(urlIdentification);

      console.log("Identificación eliminada:", response.data);
      refresh();
      toggle();
    } catch (error) {
      console.error("Error al eliminar la identificación:", error);
      const errorMessage = error.response?.data?.message || 'Error desconocido al eliminar la identificación.';
      setError(errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Eliminando la Identificación</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        {identification && <p>¿Estás seguro de eliminar la identificación {identification.nombreIdentification}?</p>}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={deleteIdentification}>Eliminar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteIdentificationModal;
