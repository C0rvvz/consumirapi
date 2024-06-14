import React, { Component } from 'react';
import { Table, Button, Container } from 'reactstrap';
import EditPowerModal from './EditPowerModal';
import InsertPowerModal from './InsertPowerModal';
import DeletePowerModal from './DeletePowerModal';
import '../assetss/css/App.css'; 
import { Apiurl } from '../services/apirest';
import axios from 'axios';

class TablePower extends Component {
  
    constructor(props) {
      super(props);
      this.state = {
        data: [
          {
            "idPower": 1,
            "nombrePower": "volar",
            "fechaAdquisicionPower": "2020-08-09",
            "nivelPower": 9,
            "descripcionPower": "volar mucho"
        }],
        form: {
          idPower: "",
          nombrePower: "",
          fechaAdquisicionPower: "",
          nivelPower: "",
          descripcionPower: ""
        },
        modalInsertar: false,
        modalEditar: false,
        modalEliminar: false,
        hoverIndex: null,
        powerToEdit: null,
        powerToDelete: null,
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

    manejarBotonIdentification = () => {
        this.props.history.push("/identification");
      };
  
    manejarBotonHero = () => {
      this.props.history.push("/");
    };

    manejarBotonIdentification = () => {
        this.props.history.push("/identification");
      };
  
    mostrarModalEliminar = (power) => {
      this.setState({ modalEliminar: true, powerToDelete: power });
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
      this.setState({ modalEditar: true, powerToEdit: registro });
    };
  
    ocultarModalEditar = () => {
      this.setState({ modalEditar: false, powerToEdit: null });
    };
  
    obtenerPowers = async () => {
      try {
        const url = Apiurl + "power/getPowers";
        const response = await axios.get(url);
        this.setState({ data: response.data });
        console.log(response.data);
      } catch (error) {
        console.error("Error al obtener los heroes:", error);
      }
    };

    actualizarNextId = () => {
        const { data } = this.state;
        if (data.length > 0) {
          const maxId = Math.max(...data.map(power => power.idPower));
          this.setState({ nextId: maxId + 1 });
        } else {
          this.setState({ nextId: 1 });
        }
      };
  
    componentDidMount() {
      this.obtenerPower();
    };
  
    render() {
      return (
        <Container>
          <header>
            <h1 className="title">Proyecto Código Limpio: CRUD</h1>
          </header>
          <br />
          <Button color="success" onClick={this.mostrarModalInsertar}>Ingresar nuevo poder</Button>
          <br />
          <br />
          <Table striped bordered hover className="custom-table">
            <thead>
              <tr>
                <th>Id Poder</th>
                <th>Nombre del poder</th>
                <th>Fecha adquisicion del poder</th>
                <th>Nivel del poder</th>
                <th>Descripción del poder</th>
                <th>Id del heroe</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map((elemento, index) => (
                <tr key={elemento.idPower}>
                  <td>{elemento.idPower}</td>
                  <td>{elemento.nombrePower}</td>
                  <td>{elemento.aliasPower}</td>
                  <td>{elemento.fechaCreacionPower}</td>
                  <td>{elemento.estadoPower}</td>
                  <td>
                    <Button color="success" onClick={() => this.manejarBotonHero(elemento)}>Heroe</Button>{" "}
                    <Button color="success" onClick={() => this.manejarBotonIdentification(elemento)}>Identificacion</Button>{" "}
                    <Button color="success" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button>{" "}
                    <Button color="danger" onClick={() => this.mostrarModalEliminar(elemento)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <InsertPowerModal
            isOpen={this.state.modalInsertar}
            toggle={this.ocultarModalInsertar}
            refresh={this.obtenerPowers}
            nextId={this.state.nextId} // Pasar el próximo ID al modal
            incrementarId={this.actualizarNextId} // Pasar la función para incrementar el ID
          />
          <EditPowerModal
            isOpen={this.state.modalEditar}
            toggle={this.ocultarModalEditar}
            power={this.state.powerToEdit}
            refresh={this.obtenerPowers}
          />
          <DeletePowerModal
            isOpen={this.state.modalEliminar}
            toggle={this.ocultarModalEliminar}
            power={this.state.powerToDelete}
            refresh={this.obtenerPowers}
          />
        </Container>
      );
    }
  }
  
  export default TablePower;