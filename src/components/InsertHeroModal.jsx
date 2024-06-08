import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import InsertPowerModal from './InsertPowerModal';

const InsertHeroModal = ({ isOpen, toggle, refresh }) => {
  const [form, setForm] = useState({
    name: "",
    alias: ""
  });
  const [heroCreated, setHeroCreated] = useState(null);
  const [powerModalOpen, setPowerModalOpen] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const crearSuperH = async (e) => {
    e.preventDefault();
    try {
      const url = Apiurl + "heroe/heroe";
      const response = await axios.post(url, {
        name: form.name,
        alias: form.alias
      });
      setHeroCreated(response.data); // Guardar el héroe recién creado
      toggle(); // Cerrar el modal de inserción de héroe
      setPowerModalOpen(true); // Abrir el modal de inserción de poder
    } catch (error) {
      console.error("Error al crear héroe:", error);
      // Manejar el error según sea necesario
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Insertar nuevo héroe</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label>Nombre del héroe:</Label>
            <Input 
            type="text" 
            name="name" 
            id="name" 
            value={form.name} 
            onChange={handleChange} 
            />
          </FormGroup>
          <FormGroup>
            <Label>Alias:</Label>
            <Input 
            type="text" 
            name="alias" 
            id="alias" 
            value={form.alias} 
            onChange={handleChange} 
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={crearSuperH}>Insertar</Button>
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      {heroCreated && (
        <InsertPowerModal
          isOpen={powerModalOpen}
          toggle={() => {
            setPowerModalOpen(false);
            setHeroCreated(null); // Limpiar el estado del héroe creado
            refresh()
          }}
          heroe={heroCreated} // Pasar el héroe creado al modal de poder
        />
      )}
    </div>
  );
};

export default InsertHeroModal;