import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import '../assetss/css/App.css'; 

const EditPowerModal = ({ isOpen, toggle, refresh, hero }) => {
  const [form, setForm] = useState({
    idPower: "",
    nombrePower: "",
    fechaAdquisicionPower: "",
    nivelPower: "",
    descripcionPower: "",
  });
  const [power, setPower] = useState('');
  const [powerCreated, setPowerCreated] = useState(null);
  const [data, setData] = useState([]); // Estado local para la lista de héroes
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const editarPower = async (e) => {
    e.preventDefault();
    try {
      const url = `${Apiurl}power/putPower/${power.idPower}`; // Endpoint para editar el poder
      const response = await axios.put(url, {
        idPower: form.idPower,
        nombrePower: form.nombrePower,
        fechaAdquisicionPower: form.fechaAdquisicionPower,
        nivelPower: form.nivelPower,
        descripcionPower: form.descripcionPower,
      });
      const listaActualizada = data.map(item => {
        return {...item, name: power};
      });
      console.log("Poder insertado:", response.data);
      setPowerCreated(response.data); 
      setData(listaActualizada); 
      console.log("Poder editado:", response.data);
      toggle();
      refresh();
    } catch (error) {
      console.error("Error al editar poder:", error);
      setError(error.response.data.message);
    }
  };

  return (
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar poder de {hero.nombreHero}</ModalHeader>
        <ModalBody>
          {error && <Alert color="danger">{error}</Alert>}
          <FormGroup>
            <Label for="name">Nombre del poder:</Label>
            <Input
              type="text"
              name="nombrePower"
              id="nombrePower"
              value={power.nombrePower}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Fecha de adquisicion del poder:</Label>
            <Input
              type="text"
              name="fechaAdquisicionPower"
              id="nombrefechaAdquisicionPowerower"
              value={power.fechaAdquisicionPower}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">Nivel del poder:</Label>
            <Input
              type="text"
              name="nivelPower"
              id="nivelPower"
              value={power.nivelPower}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="name">descripcion del poder:</Label>
            <Input
              type="text"
              name="descripcionPower"
              id="descripcionPower"
              value={power.descripcionPower}
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
          <Button color="primary" onClick={editarPower}>Editar</Button>
          <Button color="secondary" onClick={() => { console.log('Cancelar clicked'); toggle(); }}>Cancelar</Button>
        </ModalFooter>
      </Modal>
  );
};

export default EditPowerModal;