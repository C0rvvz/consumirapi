import React, { Component } from 'react';
import { Table, Button, Container } from 'reactstrap';
import EditHeroModal from './EditHeroModal';
import InsertHeroModal from './InsertHeroModal';
import DeleteHeroModal from './DeleteHeroModal';
import '../assetss/css/App.css'; 
import { Apiurl } from '../services/apirest';
import axios from 'axios';

class TableHero extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          "idHero": 1,
          "nombreHero": "Wolverine",
          "aliasHero": "James Logan",
          "fechaCreacionHero": "2020-20-19",
          "estadoHero": "vivo"
      }],
      form: {
        idHero: "",
        nombreHero: "",
        aliasHero: "",
        fechaCreacionHero: "",
        estadoHero: ""
      },
      modalInsertar: false,
      modalEditar: false,
      modalEliminar: false,
      hoverIndex: null,
      heroToEdit: null,
      heroToDelete: null,
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

  manejarBotonIdentification = () => {
    this.props.history.push("/identification");
  };

  mostrarModalEliminar = (hero) => {
    this.setState({ modalEliminar: true, heroToDelete: hero });
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
    this.setState({ modalEditar: true, heroToEdit: registro });
  };

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false, heroToEdit: null });
  };

  obtenerHeros = async () => {
    try {
      const url = Apiurl + "hero/getHeros";
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
      const maxId = Math.max(...data.map(hero => hero.idHero));
      this.setState({ nextId: maxId + 1 });
    } else {
      this.setState({ nextId: 1 });
    }
  };

  componentDidMount() {
    this.obtenerHeros();
  };

  render() {
    return (
      <Container>
        <header>
          <h1 className="title">Proyecto Código Limpio: CRUD</h1>
        </header>
        <br />
        <Button color="success" onClick={this.mostrarModalInsertar}>Ingresar nuevo heroe</Button>
        <br />
        <br />
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Id del heroe</th>
              <th>Nombre del heroe</th>
              <th>Alias del heroe</th>
              <th>Fecha de creación del heroe</th>
              <th>Estado del heroe</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((elemento, index) => (
              <tr key={elemento.idHero}>
                <td>{elemento.idHero}</td>
                <td>{elemento.nombreHero}</td>
                <td>{elemento.aliasHero}</td>
                <td>{elemento.fechaCreacionHero}</td>
                <td>{elemento.estadoHero}</td>
                <td>
                  <Button color="success" onClick={() => this.manejarBotonPower(elemento)}>Poder</Button>{" "}
                  <Button color="success" onClick={() => this.manejarBotonIdentification(elemento)}>Identificacion</Button>{" "}
                  <Button color="success" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button>{" "}
                  <Button color="danger" onClick={() => this.mostrarModalEliminar(elemento)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <InsertHeroModal
          isOpen={this.state.modalInsertar}
          toggle={this.ocultarModalInsertar}
          refresh={this.obtenerHeros}
          nextId={this.state.nextId} // Pasar el próximo ID al modal
          incrementarId={this.actualizarNextId} // Pasar la función para incrementar el ID
        />
        <EditHeroModal
          isOpen={this.state.modalEditar}
          toggle={this.ocultarModalEditar}
          hero={this.state.heroToEdit}
          refresh={this.obtenerHeros}
        />
        <DeleteHeroModal
          isOpen={this.state.modalEliminar}
          toggle={this.ocultarModalEliminar}
          hero={this.state.heroToDelete}
          refresh={this.obtenerHeros}
        />
      </Container>
    );
  }
}

export default TableHero;