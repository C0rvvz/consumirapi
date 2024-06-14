import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import '../assetss/css/App.css'; // Asegúrate de corregir la ruta a assets

const DeletePowerModal = ({ isOpen, toggle, refresh, power }) => {
  const [error, setError] = useState(null);

  const deletePower = async () => {
    try {
      setError(null); // Reset error state before attempting to delete

      // Eliminar power
      const urlPower = `${Apiurl}power/deletePower/${power.idPower}`;
      const response = await axios.delete(urlPower);

      console.log("Poder eliminado:", response.data);
      refresh();
      toggle();
    } catch (error) {
      console.error("Error al eliminar el power:", error);
      const errorMessage = error.response?.data?.message || 'Error desconocido al eliminar el poder.';
      setError(errorMessage);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Eliminando el poder</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        {power && <p>¿Estás seguro de eliminar el poder {power.nombrePower}?</p>}
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={deletePower}>Eliminar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeletePowerModal;
