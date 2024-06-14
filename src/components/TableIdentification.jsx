import React, { Component } from 'react';
import { Table, Button, Container } from 'reactstrap';
import EditIdentificationModal from './EditIdentificationModal';
import InsertIdentificationModal from './InsertIdentificationModal';
import DeleteIdentificationModal from './DeleteIdentificationModal';
import '../assetss/css/App.css'; 
import { Apiurl } from '../services/apirest';
import axios from 'axios';

class TableIdentification extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: [
            {
                "idIdentification": 1,
                "tipoIdentification": "codigo",
                "descripcionIdentification": "tarjeta de identidad"
            }],
        form: {
          idIdentification: "",
          tipoIdentification: "",
          descripcionIdentification: "",
        },
        modalInsertar: false,
        modalEditar: false,
        modalEliminar: false,
        hoverIndex: null,
        identificationToEdit: null,
        identificationToDelete: null,
        nextId: 1, // Estado para manejar el próximo ID
      };
    };
    
    handleChange = e => {
      this.setState({
        form: {
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      });
    };
  
    manejarBotonPower = () => {
      this.props.history.push("/power");
    };

    manejarBotonHero = () => {
        this.props.history.push("/");
      };
  
    mostrarModalEliminar = (identification) => {
      this.setState({ modalEliminar: true, identificationToDelete: identification });
    };
  
    ocultarModalEliminar = () => {
      this.setState({ modalEliminar: false });
    }
  
    mostrarModalInsertar = () => {
      this.setState({ modalInsertar: true });
    };
  
    ocultarModalInsertar = () => {
      this.setState({ modalInsertar: false });
    };
  
    mostrarModalEditar = (registro) => {
      this.setState({ modalEditar: true, identificationToEdit: registro });
    };
  
    ocultarModalEditar = () => {
      this.setState({ modalEditar: false, identificationToEdit: null });
    };
  
    obtenerIdentifications = async () => {
      try {
        const url = Apiurl + "identification/getIdentifications";
        const response = await axios.get(url);
        this.setState({ data: response.data });
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener la identificacion", error);
      }
    };
  
    actualizarNextId = () => {
        const { data } = this.state;
        if (data.length > 0) {
          const maxId = Math.max(...data.map(identification => identification.idIdentification));
          this.setState({ nextId: maxId + 1 });
        } else {
          this.setState({ nextId: 1 });
        }
      };
  
    componentDidMount() {
      this.obtenerIdentification();
    };
  
    render() {
      return (
        <Container>
          <header>
            <h1 className="title">Proyecto Código Limpio: CRUD</h1>
          </header>
          <br />
          <Button color="success" onClick={this.mostrarModalInsertar}>Ingresar nueva identificación: </Button>
          <br />
          <br />
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Id de la identificatio</th>
                <th>Tipo de identificación</th>
                <th>Descripción de la identification</th>
                <th>Tarjeta de identidad</th>
                <th>Id del heroe</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento, index) => (
                <tr key={elemento.idIdentification}>
                  <td>{elemento.idIdentification}</td>
                  <td>{elemento.nombreIdentification}</td>
                  <td>{elemento.aliasIdentification}</td>
                  <td>{elemento.fechaCreacionIdentification}</td>
                  <td>{elemento.estadoIdentification}</td>
                  <td>
                    <Button color="success" onClick={() => this.manejarBotonHero(elemento)}>Heroe</Button>{" "}
                    <Button color="success" onClick={() => this.manejarBotonPower(elemento)}>Poder</Button>{" "}
                    <Button color="success" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button>{" "}
                    <Button color="danger" onClick={() => this.mostrarModalEliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <InsertIdentificationModal
            isOpen={this.state.modalInsertar}
            toggle={this.ocultarModalInsertar}
            refresh={this.obtenerIdentifications}
            nextId={this.state.nextId} // Pasar el próximo ID al modal
            incrementarId={this.actualizarNextId} // Pasar la función para incrementar el ID
          />
          <EditIdentificationModal
            isOpen={this.state.modalEditar}
            toggle={this.ocultarModalEditar}
            identification={this.state.identificationToEdit}
            refresh={this.obtenerIdentifications}
          />
          <DeleteIdentificationModal
            isOpen={this.state.modalEliminar}
            toggle={this.ocultarModalEliminar}
            identification={this.state.identificationToDelete}
            refresh={this.obtenerIdentifications}
          />
        </Container>
      );
    }
  }
  
  export default TableIdentification;