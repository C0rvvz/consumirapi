import React, { Component } from 'react';
import { Table, Button, Container } from 'reactstrap';
import EditHeroModal from './EditHeroModal';
import InsertHeroModal from './InsertHeroModal';
import '../assetss/css/App.css'; 
import { Apiurl } from '../services/apirest';
import axios from 'axios';

class TableHero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      modalInsertar: false,
      modalEditar: false,
      hoverIndex: null,
      heroeToInsertPower: null
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

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  };

  ocultarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  mostrarModalEditar = (registro) => {
    this.setState({ modalEditar: true, form: registro });
  };

  ocultarModalEditar = () => {
    this.setState({ modalEditar: false });
  };

  guardarHeroeParaInsertarPoder = (heroe) => {
    this.setState({ heroeToInsertPower: heroe, modalInsertar: false });
  };

  insertar = () => {
    const { form, data } = this.state;
    const valorNuevo = {
      heroeid: form.heroe.name,
      alias: form.heroe.alias,
      poder: form.poder
    };
    const lista = [...data, valorNuevo];
    this.setState({ data: lista, modalInsertar: false, form: { heroe: { name: "", alias: "" }, poder: "" } });
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

  editar = () => {
    const { form, data } = this.state;
    const listaActualizada = data.map(item => {
      if (item.heroe.name === form.heroe.name) {
        return {
          ...item,
          alias: form.heroe.alias,
          poder: form.poder
        };
      }
      return item;
    });

    this.setState({
      data: listaActualizada,
      modalEditar: false,
      form: { heroe: { name:"", alias:"" }, poder: "" } // Limpiar el formulario después de editar
    });
  };

  eliminar = (dato) => {
    const opcion = window.confirm(`${dato.heroe.name} se eliminará, ¿está seguro de esto?`);
    if (opcion) {
      const lista = this.state.data.filter((item) => item.heroe.name !== dato.heroe.name);
      this.setState({ data: lista });
    }
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
    console.log(this.state.data)
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
                <td>
                  {elemento.alias}
                </td>
                <td>{elemento.poder && elemento.poder.map(x => x.name).join(" , ")}</td>
                <td>
                  <Button color="success" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button>{" "}
                  <Button color="danger" onClick={() => this.eliminar(elemento)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <InsertHeroModal
          isOpen={this.state.modalInsertar}
          toggle={this.ocultarModalInsertar}
          insertar={this.insertar}
        />
        <EditHeroModal
          isOpen={this.state.modalEditar}
          toggle={this.ocultarModalEditar}
          editar={this.editar}
          form={this.state.form}
        />
        <InsertHeroModal
          isOpen={this.state.modalInsertar}
          toggle={this.ocultarModalInsertar}
          guardarHeroe={this.guardarHeroeParaInsertarPoder} // Pasar función para guardar héroe
          editar={this.editar}          
          form={this.state.form}
        />
        <InsertHeroModal
          isOpen={this.state.modalInsertar}
          toggle={this.ocultarModalInsertar}
          refresh={this.obtenerheroes}
          guardarHeroe={this.guardarHeroeParaInsertarPoder} // Pasar función para guardar héroe
        />
      </Container>
    );
  }
}

export default TableHero;