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
      data: [],
      from: {
        heroe: {
          name: "",
          alias: ""
        },
        poder: ""
      },
      modalInsertar: false,
      modalEditar: false,
      hoverIndex: null,
      heroeToInsertPower: null,
      heroeToEdit: null // Añadir estado para el héroe a editar
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

  mostrarModalEliminar = (heroe) => {
    this.setState({ modalEliminar: true, heroeToDelete: heroe });
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
    this.setState({ modalEditar: true, heroeToEdit: registro });
  };

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false, heroeToEdit: null });
  };

  guardarHeroeParaEditarPoder = (heroe) => {
    this.serState({ heroeToEdit: heroe, modalEditar: false});
  };

  editarPoder = (Poder) => {

  }

  guardarHeroeParaInsertarPoder = (heroe) => {
    this.setState({ heroeToInsertPower: heroe, modalInsertar: false });
  };

  insertarPoder = (poder) => {
    const { data, heroeToInsertPower } = this.state;
    const newData = data.map(item => {
      if (item.heroe.name === heroeToInsertPower.heroe.name) {
        return {
          ...item,
          alias: heroeToInsertPower.heroe.alias,
          poder: poder
        };
      }
      return item;
    });

    this.setState({ data: newData, heroeToInsertPower: null });
  };

  

  obtenerheroes = async () => {
    try {
      const url = Apiurl + "heroe/heroe";
      const response = await axios.get(url);
      this.setState({data: response.data});
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching heroes:", error);
    }
  };

  componentDidMount () {
    this.obtenerheroes()
  };

  render() {
    return (
      <Container>
        <header>
          <h1 className="title">Proyecto Código Limpio: CRUD</h1>
        </header>
        <br />
        <Button color="success" onClick={this.mostrarModalInsertar}>Ingresar nuevo héroe</Button>
        <br />
        <br />
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th>Heroe</th>
              <th>Alias</th>
              <th>Poder</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((elemento, index) => (
              <tr key={elemento.name}>
                <td>{elemento.name}</td>
                <td>{elemento.alias}</td>
                <td>{elemento.poder && elemento.poder.map(x => x.name).join(" , ")}</td>
                <td>
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
          refresh={this.obtenerheroes}
        />
        <EditHeroModal
          isOpen={this.state.modalEditar}
          toggle={this.ocultarModalEditar}
          heroe={this.state.heroeToEdit} // Pasar el héroe seleccionado como prop
          refresh={this.obtenerheroes}
        />
        <InsertHeroModal
          isOpen={this.state.modalInsertar}
          toggle={this.ocultarModalInsertar}
          guardarHeroe={this.guardarHeroeParaInsertarPoder} // Pasar función para guardar héroe
          editar={this.editar}          
          form={this.state.form}
          refresh={this.obtenerheroes}
        />
        <DeleteHeroModal
          isOpen={this.state.modalEliminar}
          toggle={this.ocultarModalEliminar}
          heroe={this.state.heroeToDelete}
          refresh={this.obtenerheroes}
        />
      </Container>
    );
  }
}

export default TableHero;