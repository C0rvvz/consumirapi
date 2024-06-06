import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Button } from 'reactstrap';
import '../assetss/css/App.css'; // Ajusta la ruta según la estructura de tu proyecto
import axios from 'axios';
import { Apiurl } from '../services/apirest';

const InsertPoderModal = ({ isOpen, toggle}) => {

  const crearPoder = function(e){
    e.preventDefault()
    console.log("recibiendo informacion")
    let name = document.getElementById("name").value
    let alias = document.getElementById("alias").value
    console.log(name + alias)
    let url = Apiurl + "poder/poder";
    axios.post(url,{
      name: name,
      alias: alias
    })
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalHeader toggle={toggle}>Insertar nuevo héroe</ModalHeader>
      <ModalBody>
        <FormGroup>
          <Label>Heroe:</Label>
          <Input type="text" name="heroe" id="name"  />
        </FormGroup>
        <FormGroup>
          <Label>Alias:</Label>
          <Input type="text" name="alias" id="alias"  />
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={crearSuperH} >Insertar</Button>
        <Button color="danger" onClick={toggle}>Cancelar</Button>
      </ModalFooter>
    </Modal>
  );
};

export default InsertPoderModal;