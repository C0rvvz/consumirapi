import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import '../assetss/css/App.css'; 

const InsertPowerModal = ({ isOpen, toggle, refresh, hero, nextId, incrementarId  }) => {
  const [form, setForm] = useState({
    idPower: nextId,
    nombrePower: "",
    fechaAdquisicionPower: "",
    nivelPower: "",
    descripcionPower: "",
  });
  const [error, setError] = useState(null);
  const [powerCreated, setPowerCreated] = useState(null);

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      idHero: nextId
    }));
  }, [nextId]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const insertarPower = async (e) => {
    e.preventDefault();
    console.log("Insertando poder");

    try {
      const url = Apiurl + "power/postPower";
      const response = await axios.post(url, {
        idPower: form.idPower,
        nombrePower: form.nombrePower,
        fechaAdquisicionPower: form.fechaAdquisicionPower,
        nivelPower: form.nivelPower,
        descripcionPower: form.descripcionPower
      });
      console.log("Poder insertado:", response.data);
      setPowerCreated(response.data); // Guardar el poder recién creado
      incrementarId(); // Incrementar el ID para el próximo héroe
      toggle();
      refresh();
    } catch (error) {
      console.error("Error al insertar poder:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <>
    <Modal isOpen={isOpen} toggle={toggle} className="custom-modal">
      <ModalHeader toggle={toggle}>Insertar nuevo Poder para {hero.nombreHero}</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <FormGroup>
          <Label>Nombre del Poder:</Label>
          <Input 
          type="text" 
          name="nombrePower"  
          id="nombrePower"
          value={form.nombrePower} 
          onChange={handleChange} 
          />
        </FormGroup>
        <FormGroup>
          <Label>Fecha de adquisicion del Poder:</Label>
          <Input 
          type="text" 
          name="fechaAdquisicionPower"  
          id="fechaAdquisicionPower"
          value={form.fechaAdquisicionPower} 
          onChange={handleChange} 
          />
        </FormGroup>
        <FormGroup>
          <Label>Nivel del Poder:</Label>
          <Input 
          type="text" 
          name="nivelPower"  
          id="nivelPower"
          value={form.nivelPower} 
          onChange={handleChange} 
          />
        </FormGroup>
        <FormGroup>
          <Label>Descripcion del Poder:</Label>
          <Input 
          type="text" 
          name="descripcionPower" 
          id="descripcionPower" 
          value={form.descripcionPower} 
          onChange={handleChange} 
          />
        </FormGroup>
        <FormGroup>
            <Label>Id del heroe:</Label>
            <Input
                type="text"
                value={hero.idHero}
                disabled
            />
          </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={insertarPower}>Insertar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
    {powerCreated && (
      <div>
        <p>POwer {powerCreated.nombrePower} creado exitosamente!</p>
        {/* O cualquier otra acción que necesites realizar con heroCreated */}
      </div>
    )}
    </>
  );
};

export default InsertPowerModal;