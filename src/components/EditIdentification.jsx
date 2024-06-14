import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import '../assetss/css/App.css'; 

const EditIdentificationModal = ({ isOpen, toggle, refresh, hero }) => {
    const [form, setForm] = useState({
        idIdentification: "",
        tipoIdentification: "",
        descripcionIdentification: "",
      });
  const [identification, setIdentification] = useState('');
  const [identificationCreated, setIdentificationCreated] = useState(null);
  const [data, setData] = useState([]); // Estado local para la lista de héroes
  const [error, setError] = useState(null);
  

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const editarIdentification = async (e) => {
    e.preventDefault();
    try {
      const url = `${Apiurl}identification/putIdentification/${identification.idIdentification}`; // Endpoint para editar el poder
      const response = await axios.put(url, {
        idIdentification: form.idIdentification,
        tipoIdentification: form.tipoIdentification,
        descripcionIdentification: form.descripcionIdentification,
      });
      const listaActualizada = data.map(item => {
        return {...item, name: identification};
      });
      console.log("Identificacion insertada:", response.data);
      setIdentificationCreated(response.data); // Guardar el héroe recién creado
      setData(listaActualizada); // Actualiza el estado local
      console.log("Identificaion editada:", response.data);
      toggle();
      refresh();
    } catch (error) {
      console.error("Error al editar la identificacion:", error);
      setError(error.response.data.message);
    }
  };

  return (
        <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar identificacion de {hero.nombreHero}</ModalHeader>
        <ModalBody>
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
            <Label for="name">Tipo de identificacion:</Label>
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
        <ModalFooter style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button color="primary" onClick={editarIdentification}>Editar</Button>
            <Button color="secondary" onClick={() => { console.log('Cancelar clicked'); toggle(); }}>Cancelar</Button>
        </ModalFooter>
        </Modal>
  );
};

export default EditIdentificationModal;