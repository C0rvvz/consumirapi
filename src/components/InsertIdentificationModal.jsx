import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import '../assetss/css/App.css'; 

const InsertIdentificationModal = ({ isOpen, toggle, refresh, hero, nextId, incrementarId  }) => {
  const [form, setForm] = useState({
    idIdentification: nextId,
    tipoIdentification: "",
    descripcionIdentification: "",
  });
  const [error, setError] = useState(null);
  const [identificationCreated, setIdentificationCreated] = useState(null);

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

  const insertarIdentification = async (e) => {
    e.preventDefault();
    console.log("Insertando identificaion");

    try {
      const url = Apiurl + "identification/postIdentification";
      const response = await axios.post(url, {
        idIdentification: form.idIdentification,
        nombreIdentification: form.nombreIdentification,
        fechaAdquisicionIdentification: form.fechaAdquisicionIdentification,
        nivelIdentification: form.nivelIdentification,
        descripcionIdentification: form.descripcionIdentification
      });
      console.log("Identificaion insertado:", response.data);
      setIdentificationCreated(response.data); // Guardar la identificacion recién creado
      incrementarId(); // Incrementar el ID para el próximo héroe
      toggle();
      refresh();
    } catch (error) {
      console.error("Error al insertar identificaion:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <>
    <Modal isOpen={isOpen} toggle={toggle} className="custom-modal">
      <ModalHeader toggle={toggle}>Insertar nuevo Poder para {hero.nombreIdentification}</ModalHeader>
      <ModalBody>
        {error && <Alert color="danger">{error}</Alert>}
        <FormGroup>
          <Label>Tipo de la identificación:</Label>
          <Input 
          type="text" 
          name="tipoIdentification"  
          id="tipoIdentification"
          value={form.tipoIdentification} 
          onChange={handleChange} 
          />
        </FormGroup>
        <FormGroup>
          <Label>Descripcion de la identificacion:</Label>
          <Input 
          type="text" 
          name="descripcionIdentification"  
          id="descripcionIdentification"
          value={form.descripcionIdentification} 
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
        <Button color="primary" onClick={insertarIdentification}>Insertar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
    {identificationCreated && (
      <div>
        <p>Identificacion {identificationCreated.nombreIdentification} creado exitosamente!</p>
        {/* O cualquier otra acción que necesites realizar con heroCreated */}
      </div>
    )}
    </>
  );
};

export default InsertIdentificationModal;