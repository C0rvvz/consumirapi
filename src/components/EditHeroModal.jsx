import React from 'react';
import { Modal, ModalHeader, ModalBody, FormGroup, Label, Input, ModalFooter, Button } from 'reactstrap';
import '../assetss/css/App.css'; // Ajusta la ruta según la estructura de tu proyecto

const EditHeroModal = ({ isOpen, toggle, handleChange, editar, form }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        <div>
          <h3>Editar registro</h3>
        </div>
      </ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Heroe:</Label>
          <Input className="form-control" readOnly type="text" value={form.name} onChange={handleChange}/>
        </FormGroup>
        <FormGroup>
          <Label>Alias:</Label>
          <Input className="form-control" name="alias" type="text" value={form.alias} onChange={handleChange} />
        </FormGroup>
        <FormGroup>
          <Label>Poder:</Label>
          <Input className="form-control" name="poder" type="text" value={form.poder} onChange={handleChange} />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => editar(form)}>Editar</Button>{" "}
        <Button color="danger" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditHeroModal;
