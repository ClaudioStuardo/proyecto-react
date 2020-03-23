import React, {Component} from 'react';

class SeccionPruebas extends Component {


    // contador = 0;

    constructor(props) {
        super(props);

        this.state = {
            contador: 0
        };

    }

    // state = {
    //     contador: 0
    // };

    sumar = (e) => {
        // this.contador++;
        this.setState({
            contador: (this.state.contador + 1)
        });
    }
    restar = (e) => {
        // this.contador--;
        this.setState({
            contador: (this.state.contador - 1)
        });
    }
    
    render() {
        return(
            <section id="content">
                <h2 className="subheader">Últimos artículos</h2>
                <div id="articles">
                    <article className="article-item" id="article-template">
                        <div className="image-wrap">
                            <img src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8" alt="Paisaje" />
                        </div>
    
                        <h2>Articulo de prueba</h2>
                        <span className="date">
                            Hace 5 minutos
                        </span>
                        {/* <a href="#">Leer más</a> */}

                        <p>Contador: {this.state.contador}</p>

                        <p>
                            <input type="button" value="Sumar" onClick={this.sumar} />
                            <input type="button" value="Restar" onClick={this.restar} />
                        </p>

                        <div className="clearfix"></div>
                    </article>
                </div>
            </section>
        );
    }

}

export default SeccionPruebas;