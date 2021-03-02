import react, { useState } from "react";
import uniqid from "uniqid";

    const Listadonombres = () => {
        const [nombre, setNombre] = useState("");
        const [listaNombres, setListaNombres] = useState([]);
        const [modoEdicion, setModoEdicion] = useState(false);
        const [id, setId] = useState('')
        const [error, setError] = useState(null)



        const AddNombre = (e) => {
            e.preventDefault();
            if(!nombre.trim)
            {
                setError('El nombre esta vacio')
                return
            }
            const nuevoNombre = {
                id: uniqid(),
                tituloNombre: nombre
            };
            setListaNombres([...listaNombres, nuevoNombre]);
            setNombre("");
        };

        const DeleteNombre = (id) =>{
            const nuevoArray = listaNombres.filter(item => item.id !== id)
            setListaNombres(nuevoArray)
        }

        const Editar = (item) =>{
            setModoEdicion(true)
            setNombre(item.tituloNombre)
            setId(item.id)
        }

        const EditarNombre = (e) =>{
            e.preventDefault()
            const nuevoArray = listaNombres.map(item => item.id === id ? {id:id, tituloNombre:nombre} : item)
            setListaNombres(nuevoArray)
            setModoEdicion(false)
            setNombre('')
            setError(null)
        }
        

        return (
            <div>
                <h2>Aplicacion CRUD BASICA</h2>
                <div className="row">
                    <div className="col">
                        <h2>Listado nombres</h2>
                        <ul className="list-group">
                            {listaNombres.map((item) => (
                                <li key="{item.id}" className="list-group-item">
                                    {item.tituloNombre}
                                    <button
                                    className="btn btn-danger float-right"
                                    onClick={ () => DeleteNombre(item.id)}>
                                    Borrar
                                    </button>
                                    <button
                                    className="btn btn-info float-right"
                                    onClick={ () => {Editar(item)}}>
                                    Editar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col">
                        <h2>Formulario para añadir nombres</h2>

                        <form onSubmit={modoEdicion ? EditarNombre : AddNombre} className="form-group">
                            <input
                                onChange={(e) => setNombre(e.target.value)}
                                className="form-control mb-3"
                                type="text"
                                placeholder="Introduce tu nombre"
                                value={nombre}
                            />
                            <input
                                className="btn btn-info btn-block"
                                type="submit"
                                value={modoEdicion ? 'Editar' : 'Registrar nombre'}
                            />
                        </form>
                        {
                            error != null ?(
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        );
    };

export default Listadonombres;
