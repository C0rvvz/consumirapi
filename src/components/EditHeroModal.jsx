import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import '../assetss/css/App.css'; 

const InsertHeroModal = ({ isOpen, toggle, refresh }) => {
  const [form, setForm] = useState({
    idHero: "",
    nombreHero: "",
    aliasHero: "",
    fechaCreacionHero: "",
    estadoHero: "",
  });
  const [hero, setHero] = useState('');
  const [heroCreated, setHeroCreated] = useState(null);
  const [data, setData] = useState([]); // Estado local para la lista de héroes
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const EditarHero = async (e) => {
    e.preventDefault();
    try {
      const url = Apiurl + "hero/postHero";
      const response = await axios.post(url, {
        idHero: form.idHero,
        nombreHero: form.nombreHero,
        aliasHero: form.aliasHero,
        fechaCreacionHero: form.fechaCreacionHero,
        estadoHero: form.estadoHero
      });
      const listaActualizada = data.map(item => {
        return {...item, name: hero};
      });
      console.log("Heroe insertado:", response.data);
      setHeroCreated(response.data); // Guardar el héroe recién creado
      setData(listaActualizada); // Actualiza el estado local
      toggle();
      refresh(); 
    } catch (error) {
      console.error("Error al crear héroe:", error);
      setError(error.response.data.message);
      // Manejar el error según sea necesario
    }
  };

  return (
      <Modal isOpen={isOpen} toggle={toggle}>
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
        <ModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button color="primary" onClick={EditarHero}>Insertar</Button>
          <Button color="secondary" onClick={() => { console.log('Cancelar clicked'); toggle(); }}>Cancelar</Button>
        </ModalFooter>
      </Modal>
  );
};

export default InsertHeroModal;