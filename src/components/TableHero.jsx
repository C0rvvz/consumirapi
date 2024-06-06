import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import '../assetss/css/App.css'; // Ajusta la ruta según la estructura de tu proyecto
import EditHeroModal from './EditHeroModal';
import InsertHeroModal from './InsertHeroModal';
import InsertPowerModal from './InsertPowerModal';

class TableHero extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    form: {
      name: "",
      alias: ""
    },
    hoverIndex: null,
    heroeToInsertPower: null // Nuevo estado para guardar el héroe antes de insertar el poder
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
      poder: "" // Puedes inicializar el poder aquí o en otro momento según sea necesario
    };
    const lista = [...data, valorNuevo];
    this.setState({ data: lista, modalInsertar: false, form: { name: "", alias: "" } });
  };

  editar = () => {
    const { form, data } = this.state;
    const listaActualizada = data.map(item => {
      if (item.name === form.name) {
        return {
          ...item,
          alias: form.alias
        };
      }
      return item;
    });

    this.setState({
      data: listaActualizada,
      modalEditar: false,
      form: { name: "", alias: "" } // Limpiar el formulario después de editar
    });
  };

  eliminar = (dato) => {
    const opcion = window.confirm(`${dato.name} se eliminará, ¿está seguro de esto?`);
    if (opcion) {
      const lista = this.state.data.filter((item) => item.name !== dato.name);
      this.setState({ data: lista });
    }
  };

  guardarHeroeParaInsertarPoder = (heroe) => {
    this.setState({ heroeToInsertPower: heroe, modalInsertar: false });
  };

  render() {
    return (
      <React.Fragment>
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
          guardarHeroe={this.guardarHeroeParaInsertarPoder} // Pasar función para guardar héroe
        />
        {this.state.heroeToInsertPower && (
          <InsertPowerModal
            isOpen={true} // Abre automáticamente cuando hay un héroe para insertar poder
            toggle={() => this.setState({ heroeToInsertPower: null })}
            heroe={this.state.heroeToInsertPower}
          />
        )}
      </React.Fragment>
    );
  }
}

export default TableHero;