import React from 'react';
import { Table, Button } from 'reactstrap';
///css
import '../assetss/css/TableHero.css';

class TableHero extends React.Component{
    render(){
        return(
            <React.Fragment>
                <Table striped bordered hover className="custom-table">
                    <thead>
                        <tr>
                        <th>HeroeID</th>
                        <th>Alias</th>
                        <th>Poderes</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((elemento, index) => (
                        <tr key={elemento.heroeid}>
                            <td>{elemento.heroeid}</td>
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
            </React.Fragment>
        );

    }
}

export default TableHero