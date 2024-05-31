import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import '../assetss/css/App.css'; // Ajusta la ruta según la estructura de tu proyecto
import EditHeroModal from './EditHeroModal';
import InsertHeroModal from './InsertHeroModal';
import { Apiurl } from '../services/apirest';
import axios from 'axios';

class TableHero extends Component {
  state = {
    data: [
      { name: 'SuperMan', alias: 'Clark Kent', poder: 'Laser' },
      { name: 'Batman', alias: 'Bruce Wayne', poder: 'Pelea' },
      { name: 'Wolverine', alias: 'James Logan', poder: 'Regeneracion' },
      { name: 'Iron Man', alias: 'Anthony Stark', poder: 'Cohetes' },
      { name: 'Spider-Man', alias: 'Peter Parker', poder: 'Telaraña' },
      { name: 'Mujer Maravilla', alias: 'Diana Prince', poder: 'Fuerza' },
      { name: 'Flash', alias: 'Barry Allen', poder: 'Velocidad' },
      { name: 'Capitan America', alias: 'Steve Rogers', poder: 'Escudo indestructible' },
      { name: 'Hulk', alias: 'Bruce Banner', poder: 'Super fuerza' },
      { name: 'Thor', alias: 'Thor', poder: 'Martillo mágico' },
    ],
    modalInsertar: false,
    modalEditar: false,
    form: {
      name: "",
      alias: "",
      poder: "",
    },
    hoverIndex: null
  };

  handleChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
  };

  manejadorBoton = async() => {
    let url = Apiurl + "heroe/heroe";
    console.log(this.state.form)
    await axios.post(url,{
      data: this.state.form
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error("There was an error with the request!", error);
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

  handleMouseEnter = (index) => {
    this.setState({ hoverIndex: index });
  };

  handleMouseLeave = () => {
    this.setState({ hoverIndex: null });
  };

  insertar = () => {
    const { form, data } = this.state;
    const valorNuevo = {
      name: form.name,
      alias: form.alias,
      poder: form.poder,
    };
    const lista = [...data, valorNuevo];
    this.setState({ data: lista, modalInsertar: false, form: { name: "", alias: "", poder: "" } });
  };

  editar = () => {
    const { form, data } = this.state;
    const listaActualizada = data.map(item => {
      if (item.name === form.name) {
        return {
          ...item,
          alias: form.alias,
          poder: form.poder
        };
      }
      return item;
    });

    this.setState({
      data: listaActualizada,
      modalEditar: false,
      form: { name: "", alias: "", poder: "" } // Limpiar el formulario después de editar
    });
  };

  eliminar = (dato) => {
    const opcion = window.confirm(`${dato.name} se eliminará, ¿está seguro de esto?`);
    if (opcion) {
      const lista = this.state.data.filter((item) => item.name !== dato.name);
      this.setState({ data: lista });
    }
  };

  render() {
    return (
      <React.Fragment>
        <br />
        <Button color="success" onClick={this.mostrarModalInsertar}>Ingresar nuevo héroe</Button>
        <br />
        <br />
        <Button color="primary" onClick={this.manejadorBoton}>Enviar Datos a API</Button>
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
                <td
                  onMouseEnter={() => this.handleMouseEnter(index)}
                  onMouseLeave={this.handleMouseLeave}
                >
                  {elemento.alias}
                </td>
                <td>{elemento.poder}</td>
                <td>
                  <Button color="success" onClick={() => this.mostrarModalEditar(elemento)}>Editar</Button>{"  "}
                  <Button color="danger" onClick={() => this.eliminar(elemento)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <EditHeroModal
          isOpen={this.state.modalEditar}
          toggle={this.ocultarModalEditar}
          handleChange={this.handleChange}
          editar={this.editar}
          form={this.state.form}
        />
        <InsertHeroModal
          isOpen={this.state.modalInsertar}
          toggle={this.ocultarModalInsertar}
          insertar={this.insertar}
          form={this.state.form}
          handleChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default TableHero;
