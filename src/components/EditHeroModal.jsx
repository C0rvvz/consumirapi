import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input } from 'reactstrap';

const EditHeroModal = ({ isOpen, toggle, handleChange, editar, form }) => {
  if (!form) return null; // Verifica que form no sea undefined

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Editar Héroe</ModalHeader>
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
          <Label for="alias">Alias</Label>
          <Input
            type="text"
            name="alias"
            id="alias"
            onChange={handleChange}
            value={form.alias || ""}
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

export default EditHeroModal;