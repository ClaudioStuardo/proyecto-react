import React, {Component} from 'react';

import Sidebar from './Sidebar';


class Formulario extends Component {

    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    biografiaRef = React.createRef();
    generoHombreRef = React.createRef();
    generoMujerRef = React.createRef();
    generoOtroRef = React.createRef();

    state = {
        user: {}
    };

    recibirFormulario = (e) => {
        e.preventDefault();

        var genero = 'otro';

        if(this.generoHombreRef.current.checked) {
            genero = 'hombre'
        } else if(this.generoMujerRef.current.checked) {
            genero = 'mujer'
        } else {
            genero = 'otro'
        }

        var user = {
            nombre: this.nombreRef.current.value,
            apellido: this.apellidosRef.current.value,
            biografia: this.biografiaRef.current.value,
            genero: genero
        }

        this.setState({
            user
        })

        console.log(user)
    }
    
    render() {

        return(
            <div id="formulario">
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1>

                        {/* Mostrar datos del usuario */}
                        {this.state.user.nombre &&
                            <div id="user-data">
                                <p>Nombre: <strong>{this.state.user.nombre}</strong></p>
                                <p>Apellido: <strong>{this.state.user.apellido}</strong></p>
                                <p>Biografía: <strong>{this.state.user.biografia}</strong></p>
                                <p>Genero: <strong>{this.state.user.genero}</strong></p>
                            </div>
                        }

                        {/* Crear  formulario */}
                        <form className="mid-form" onSubmit={this.recibirFormulario} onChange={this.recibirFormulario}>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="apellidos">Apellidos</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="bio">Biografia</label>
                                <textarea name="bio" ref={this.biografiaRef}></textarea>
                            </div>

                            <div className="form-group radibuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHombreRef} /> Hombre 
                                <input type="radio" name="genero" value="mujer" ref={this.generoMujerRef} /> Mujer 
                                <input type="radio" name="genero" value="otro" ref={this.generoOtroRef} /> Otro
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success" />

                        </form>

                    </div>

                    <Sidebar
                        blog="false"
                    />

                </div>
            </div>
        );
    }
}

export default Formulario;