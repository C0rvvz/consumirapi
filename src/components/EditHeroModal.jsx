import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import { Apiurl } from '../services/apirest';
import EditPowerModal from './EditPowerModal';

const EditHeroModal = ({ isOpen, toggle, heroe, refresh }) => {
  const [form, setForm] = useState({
    name: "",
    alias: ""
  });
  const [heroUpdated, setHeroUpdated] = useState(null);
  const [powerModalOpen, setPowerModalOpen] = useState(false);
  const [data, setData] = useState([]); // Estado local para la lista de héroes
  
  useEffect(() => {
    if (heroe) {
      setForm({
        name: heroe.name || "", // Verifica si heroe.name está definido antes de asignarlo
        alias: heroe.alias || "" // Verifica si heroe.alias está definido antes de asignarlo
      });
    }
  }, [heroe]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const guardarHeroe = async (e) => {
    e.preventDefault();
    try {
      const originalName = heroe.name; // Declare originalName here
      const url = `${Apiurl}heroe/heroe/${originalName}`;
      const response = await axios.put(url, {
        name: originalName,
        alias: form.alias
      });
  
      // Actualiza el estado del héroe editado
      const listaActualizada = data.map(item => {
        if (item.name === originalName) {
          return {...item, name: form.name, alias: form.alias};
        }
        return item;
      });
      setHeroUpdated(response.data);
      setData(listaActualizada); // Actualiza el estado local
      toggle(); // Cierra el modal de edición de héroe
      setPowerModalOpen(true); // Abrir el modal de edición de poder
    } catch (error) {
      console.error("Error al editar héroe:", error);
    }
  };

  const handleTogglePowerModal = () => {
    setPowerModalOpen(!powerModalOpen); // Alternar el estado del modal de poder
    setHeroUpdated(null); // Limpiar el estado del héroe editado
    refresh(); // Actualizar la lista de héroes
    toggle(); // Cerrar el modal de edición de héroe también al abrir el modal de poder
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Editar Héroe</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="name">Nombre</Label>
            <Input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="alias">Alias</Label>
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
          <Button color="primary" onClick={guardarHeroe}>Editar</Button>
          <Button color="secondary" onClick={toggle}>Cancelar</Button>
        </ModalFooter>
      </Modal>
      {heroUpdated && (
        <EditPowerModal
          isOpen={powerModalOpen}
          toggle={() => {
            setHeroUpdated(null);
            refresh();
            handleTogglePowerModal();
            setPowerModalOpen(false);
          }}
          heroe={heroUpdated} // Pasar el héroe editado al modal de poder
        />
      )}
    </div>
  );
};

export default EditHeroModal;