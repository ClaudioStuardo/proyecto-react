import React, {Component} from 'react';

import Pelicula from './Pelicula';
import Slider from './Slider';
import Sidebar from './Sidebar';

class Peliculas extends Component {

    state = {
        peliculas: [
            { titulo: 'Batman vs Superman', image: 'https://i.ytimg.com/vi/Vzi5Q5aIGJU/maxresdefault.jpg' },
            { titulo: 'Gran Torino', image: 'https://www.artmajeur.com/medias/standard/f/a/fasquelolivier/artwork/11789156_gran-torino.jpg' },
            { titulo: 'Looper', image: 'https://pics.filmaffinity.com/Looper-713262202-large.jpg' }
        ],
        nombre: 'Claudio Stuardo',
        favorita: {}
    };

    cambiarTitulo = () => {

        var { peliculas } = this.state;
        // var random = Math.floor(Math.random() * 3);
        peliculas[0].titulo = 'Batman Begins';

        this.setState({
            peliculas
        });
    }

    favorita = (pelicula, indice) => {
        // console.log("FAVORITA MARCADA");
        console.log(pelicula, indice);
        this.setState({
            favorita: pelicula
        });
    }

    // ngOnInit
    // componentWillMount() {}

    render() {

        var pStyle = {
            background: 'green',
            color: 'white',
            padding: '10px'
        }

        return (
            <React.Fragment>
                <Slider 
                    title="Peliculas"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content" className="peliculas">
                        <h2 className="subheader">Listado de películas</h2>
                        <p>Selección de las películas favoritas de {this.state.nombre}</p>

                        <p>
                            <button onClick={this.cambiarTitulo}>
                                Cabiar titulo de Batman
                            </button>
                        </p>

                        {/* {this.state.favorita.titulo &&
                            <p className="favorita" style={pStyle}>
                                <strong>La película favorita es: </strong>
                                <span>{this.state.favorita.titulo}</span>
                            </p>
                        } */}

                        {this.state.favorita.titulo ? (
                            <p className="favorita" style={pStyle}>
                                <strong>La película favorita es: </strong>
                                <span>{this.state.favorita.titulo}</span>
                            </p>
                            ) : (
                                <p>No hay película favorita</p>
                            )
                        }

                        {/* Crear componente película */}

                        <div id="articles" className="peliculas">
                        {
                            this.state.peliculas.map((pelicula, i) => {
                                return(
                                    <Pelicula
                                        key={i}
                                        pelicula={pelicula}
                                        indice={i}
                                        marcarFavorita={this.favorita}
                                    />
                                );
                            })
                        }
                        </div>
                    </div>
                    <Sidebar
                        blog="false"
                    />
                </div>
            </React.Fragment>
        )
    }

}

export default Peliculas;