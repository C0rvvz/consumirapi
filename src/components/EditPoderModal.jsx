import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';

const EditPoderModal = ({ isOpen, toggle, handleChange, editar, form }) => {
  if (!form) return null; // Verifica que formp no sea undefined

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Editar Poder</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label for="name">Nombre</Label>
          <Input
            type="text"
            name="name"
            id="name"
            onChange={handleChange}
            value={form.name || ""}
          />
        </FormGroup>
        <FormGroup>
          <Label for="heroe_name">Nombre del Héroe</Label>
          <Input
            type="text"
            name="heroe_name"
            id="heroe_name"
            onChange={handleChange}
            value={form.heroe_name || ""}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={editar}>Guardar</Button>
        <Button color="secondary" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditPoderModal;
