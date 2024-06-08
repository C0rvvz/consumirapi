import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';

const InsertPowerModal = ({ isOpen, toggle, heroe }) => {
  const [error, setError] = useState(null);
  const [poder, setPoder] = useState('');

  const insertarPoder = async (e) => {
    e.preventDefault();
    console.log("Insertando poder");

    try {
      const url = Apiurl + "poder/poder";
      const response = await axios.post(url, {
        name: poder,
        heroe_name: heroe.name
      });
      console.log("Poder insertado:", response.data);
      toggle();
    } catch (error) {
      console.error("Error al insertar poder:", error);
      setError(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setPoder(e.target.value);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Insertar nuevo poder para {heroe.name}</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <FormGroup>
          <Label for="poder">Poder:</Label>
          <Input 
          type="text" 
          name="poder" 
          id="poder" 
          value={poder} 
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
        <Button color="primary" onClick={insertarPoder}>Insertar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default InsertPowerModal;