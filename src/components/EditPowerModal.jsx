import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';

const EditPowerModal = ({ isOpen, toggle, heroe }) => {
  const [error, setError] = useState(null);
  const [poder, setPoder] = useState('');
  const [data, setData] = useState([]); // Estado local para la lista de héroes

  const handleChange = (e) => {
    setPoder(e.target.value);
  };

  const editarPoder = async (e) => {
    e.preventDefault();
    try {
      const url = `${Apiurl}poder/poder/${poder.id}`; // Endpoint para editar el poder
      const response = await axios.put(url, {
        name: poder,
        heroe_name: heroe.name
      });

      const listaActualizada = data.map(item => {
        return {...item, name: poder};
      });

      setData(listaActualizada); // Actualiza el estado local
      console.log("Poder editado:", response.data);
      toggle();
    } catch (error) {
      console.error("Error al editar poder:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Editar poder de {heroe.name}</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <FormGroup>
          <Label for="name">Nombre del poder:</Label>
          <Input
            type="text"
            name="name"
            id="name"
            value={poder.name}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Nombre del héroe:</Label>
          <Input
            type="text"
            value={heroe.name}
            disabled
          />
        </FormGroup>
        <FormGroup>
          <Label>Alias del héroe:</Label>
          <Input
            type="text"
            value={heroe.alias}
            disabled
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={editarPoder}>Editar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditPowerModal;