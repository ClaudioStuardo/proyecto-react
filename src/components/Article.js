import React, {Component} from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import {Redirect, Link} from 'react-router-dom';
import Swal from 'sweetalert2';

import Global from '../Global';
import Sidebar from './Sidebar';

class Article extends Component {

    url = Global.url;

    state = {
        article: false,
        status: null
    }

    componentWillMount() {
        this.getArticle();
    }

    getArticle = () => {
        var id = this.props.match.params.id;

        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article,
                    status: 'success'
                })
            }).catch(() => {
                this.setState({
                    article: false,
                    status: 'success'
                });
            })
    }

    deleteArticle = (id) => {

        Swal.fire({
                title: 'Estás seguro?',
                text: "No hay vuelta atrás",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Borrar'
            }).then((result) => {
                if (result.value) {
                    axios.delete(this.url + 'article/' + id)
                    .then(res => {
                        this.setState({
                            article: res.data.article,
                            status: 'deleted'
                        })

                        Swal.fire(
                            'Artículo borrado',
                            'El artículo a sido borrado correctamente',
                            'success'
                        )
                    })
                } else {
                    Swal.fire(
                        'Operación cancelada',
                        'Eso estuvo cerca',
                        'success'
                    )
                }
            })

        
    }

    render() {

        if(this.state.status === 'deleted') {
            return <Redirect to='/blog' />
        }

        return(
            <div className="center">
                <section id="content">
                        {this.state.article &&
                            <article className="article-item article-detail">
                                <div className="image-wrap">
                                    {this.state.article.image !== null ? (
                                        <img src={this.url + 'get-image/' + this.state.article.image} alt={this.state.article.title} />
                                    ) : (
                                        <img src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8" alt="Paisaje" />
                                    )}
                                </div>
            
                                <h1 className="subheader">{this.state.article.title}</h1>
                                <span className="date">
                                    <Moment locale="es" fromNow>{this.state.article.date}</Moment>
                                </span>
                                <p>
                                    {this.state.article.content}
                                </p>

                                <button onClick={
                                    () => {
                                        this.deleteArticle(this.state.article._id)
                                    }
                                } className="btn btn-danger">Eliminar</button>
                                <Link to={'/blog/editar/' + this.state.article._id}  className="btn btn-warning">Editar</Link>
                                

                                <div className="clearfix"></div>
                            </article>
                        }
                        {!this.state.article && this.state.status === 'success' &&
                            <div id="article">
                                <h2 className="subheader">El artículo no existe</h2>
                                <p>Inténtalo de nuevo más tarde</p>
                            </div>
                        }
                        {!this.state.status === null &&
                            <div id="article">
                                <h2 className="subheader">Cargando...</h2>
                                <p>Espere por favor</p>
                            </div>
                        }
                </section>
                <Sidebar />
            </div>
        );
    }
}

export default Article;