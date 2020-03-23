import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import SimpleReactValidator from 'simple-react-validator';
import Swal from 'sweetalert2'

import Global from '../Global';

import Sidebar from './Sidebar';

// 1. Regoger el id del artículo a editar de la url
// 2. Crear método para sacar el objeto del backend
// 3. Rellenar el formulario con esos datos
// 4. Actualiar el objeto haciendo una petición al backend

class EditArticle extends Component {

    url = Global.url;

    articleId = null;

    titleRef = React.createRef();
    contentRef = React.createRef();

    state = {
        article: {},
        status: null,
        selectedFile: null
    }

    componentWillMount() {

        this.articleId = this.props.match.params.id;
        this.getArticle(this.articleId);

        this.validator = new SimpleReactValidator({
            messages: {
                required: 'Este campo es requerido'
            }
        })
    }

    getArticle = (id) => {
        axios.get(this.url + 'article/' + id)
            .then(res => {
                this.setState({
                    article: res.data.article
                })
            })
    }

    changeState = () => {
        this.setState({
            article: {
                title: this.titleRef.current.value,
                content: this.contentRef.current.value,
                image: this.state.article.image
            }
        });

        this.validator.showMessages();
        this.forceUpdate();
    }

    saveArticle = (e) => {
        e.preventDefault();

        // Rellenar state con formulario
        this.changeState();
        if(this.validator.allValid()) {
            // Peticion HTTP POST para editar el articulo
            axios.put(this.url + 'article/' + this.articleId, this.state.article)
                .then(res => {
                    if(res.data.article) {
                        this.setState({
                            article: res.data.article,
                            status: 'success'
                        });

                        Swal.fire(
                            'Articulo creado',
                            'El Artículo a sido creado correctamente',
                            'success'
                        );

                        // Subir la imagen
                        if(this.state.selectedFile !== null) {
                            // Sacar el id de el artículo guardado
                            var articleId = this.state.article._id;

                            // Crear un form data y añadir fichero
                            const formData = new FormData();

                            formData.append(
                                'file0',
                                this.state.selectedFile,
                                this.state.selectedFile.name
                            );

                            // Peticion ajax
                            axios.post(this.url + 'upload-image/' + articleId, formData)
                                .then(res => {
                                    if(res.data.article) {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'success'
                                        });
                                    } else {
                                        this.setState({
                                            article: res.data.article,
                                            status: 'failed'
                                        });
                                    }
                                })

                        } else {
                            this.setState({
                                status: 'waiting'
                            });
                        }
                    } else {
                        this.setState({
                            status: 'failed'
                        })
                    }
                })
        } else {
            this.setState({
                status: 'failed'
            });

            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    fileChange = (event) => {
        // event.preventDefault();
        this.setState({
            selectedFile: event.target.files[0]
        })
    }

    render() {

        if(this.state.status === 'success') {
            return <Redirect to="/blog" />;
        }

        return(
            <div className="center">

                <section id="content">
                    <h1 className="subheader">Editar artículo</h1>

                    {this.state.article.title &&

                        <form className="mid-form" onSubmit={this.saveArticle}>

                            <div className="form-group">
                                <label htmlFor="title">Título</label>
                                <input type="text" name="title" defaultValue={this.state.article.title} ref={this.titleRef} onChange={this.changeState} />

                                {this.validator.message('title', this.state.article.title, 'required|alpha_num_space')}

                            </div>

                            <div className="form-group">
                                <label htmlFor="content">Contenido</label>
                                <textarea name="content" defaultValue={this.state.article.content} ref={this.contentRef} onChange={this.changeState}></textarea>

                                {this.validator.message('content', this.state.article.content, 'required')}

                            </div>

                            <div className="form-group">
                                <label htmlFor="file0">Imagen </label>
                                <input type="file" name="file0" onChange={this.fileChange} />
                                <div className="image-wrap">
                                    {this.state.article.image !== null ? (
                                        <img className="thumb" src={this.url + 'get-image/' + this.state.article.image} alt={this.state.article.title} />
                                    ) : (
                                        <img className="thumb" src="https://unhabitatmejor.leroymerlin.es/sites/default/files/styles/header_category/public/2018-10/4%20paisaje%20macedonia.jpg?itok=AELknmF8" alt="Paisaje" />
                                    )}
                                </div>
                            </div>

                            <div className="clearfix"></div>

                            <input type="submit" value="Guardar" className="btn btn-success" />

                        </form>
                    }
                    {!this.state.article.title &&
                        <h1 className="subheader">Cargando...</h1>
                    }

                </section>

                <Sidebar />
            </div>
        );
    }
}

export default EditArticle;