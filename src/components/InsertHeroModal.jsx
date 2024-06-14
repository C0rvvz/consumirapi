import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import '../assetss/css/App.css'; 

const InsertHeroModal = ({ isOpen, toggle, refresh, nextId, incrementarId }) => {
  const [form, setForm] = useState({
    idHero: nextId,
    nombreHero: "",
    aliasHero: "",
    fechaCreacionHero: "",
    estadoHero: "",
  });
  const [error, setError] = useState(null);
  const [heroCreated, setHeroCreated] = useState(null);

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

  const crearSuperHero = async (e) => {
    e.preventDefault();
    try {
      const url = Apiurl + "hero/postHero";
      const response = await axios.post(url, form);
      console.log("Heroe insertado:", response.data);
      setHeroCreated(response.data); // Guardar el héroe recién creado
      incrementarId(); // Incrementar el ID para el próximo héroe
      toggle(); // Cerrar el modal de inserción de héroe
      refresh();
    } catch (error) {
      console.error("Error al crear héroe:", error);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle} className="custom-modal">
        <ModalHeader toggle={toggle}>Insertar nuevo heroe</ModalHeader>
        <ModalBody>
          {error && <Alert color="danger">{error}</Alert>}
          <FormGroup>
            <Label>Nombre del heroe:</Label>
            <Input 
              type="text" 
              name="nombreHero" 
              id="nombreHero" 
              value={form.nombreHero} 
              onChange={handleChange} 
            />
          </FormGroup>
          <FormGroup>
            <Label>Alias del heroe:</Label>
            <Input 
              type="text" 
              name="aliasHero" 
              id="aliasHero" 
              value={form.aliasHero} 
              onChange={handleChange} 
            />
          </FormGroup>
          <FormGroup>
            <Label>Fecha creacion del heroe:</Label>
            <Input 
              type="text" 
              name="fechaCreacionHero" 
              id="fechaCreacionHero" 
              value={form.fechaCreacionHero} 
              onChange={handleChange} 
            />
          </FormGroup>
          <FormGroup>
            <Label>Estado del heroe:</Label>
            <Input 
              type="text" 
              name="estadoHero" 
              id="estadoHero" 
              value={form.estadoHero} 
              onChange={handleChange} 
            />
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={crearSuperHero}>Insertar</Button>
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>

      {heroCreated && (
        <div>
          <p>Heroe {heroCreated.nombreHero} creado exitosamente!</p>
          {/* O cualquier otra acción que necesites realizar con heroCreated */}
        </div>
      )}
    </>
  );
};

export default InsertHeroModal;