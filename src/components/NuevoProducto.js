import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Actions de Redux
import { crearNuevoProductoActions } from "../actions/productoActions";
import { mostrarAlertaAction, ocultarAlertaAction } from "../actions/alertaActions";

const NuevoProducto = ({ history }) => {
  const [nombre, guardarNombre] = useState("");
  const [precio, guardarPrecio] = useState(0);

  //utilizar useDispatch y devuelve una funcion
  const dispatch = useDispatch();

  //Acceder al State del Store
  const cargando = useSelector(state => state.productos.loading);
  const error = useSelector(state => state.productos.error);
  const alerta = useSelector(state => state.alerta.alerta);

  //llamar al action del producto actions
  const agregarProducto = producto =>
    dispatch(crearNuevoProductoActions(producto));

  const submitNuevoProducto = e => {
    e.preventDefault();

    //validar formulario

    if (nombre.trim === "" || precio <= 0) {
      const alerta = {
        msg: "Ambos campos son obligatorios",
        clases: "alert alert-danger text-center text-uppercase p-3"
      };

      dispatch(mostrarAlertaAction(alerta));
      return;
    }

    //si no hay errores

    dispatch( ocultarAlertaAction() );

    //crear el nuevo producto
    agregarProducto({
      nombre,
      precio
    });

    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>
            {alerta ? <p className={alerta.clases}>{alerta.msg}</p> : ""}
            <form onSubmit={submitNuevoProducto}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Producto"
                  name="nombre"
                  value={nombre}
                  onChange={e => guardarNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Precio Producto"
                  name="precio"
                  value={precio}
                  onChange={e => guardarPrecio(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
              >
                Agregar
              </button>
            </form>

            {cargando ? <p>Cargando...</p> : ""}
            {error ? (
              <p className="alert alert-danger p-2 mt-4 text-center">
                Hubo un error
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
