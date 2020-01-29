import {
  AGREGAR_PRODUCTO,
  AGREGAR_PRODUCTO_EXITO,
  AGREGAR_PRODUCTO_ERROR,
  LISTA_PRODUCTOS,
  LISTA_PRODUCTOS_EXITO,
  LISTA_PRODUCTOS_ERROR,
  PRODUCTO_ELIMINAR,
  PRODUCTO_ELIMINAR_EXITO,
  PRODUCTO_ELIMINAR_ERROR,
  EDITAR_PRODUCTO,
  PRODUCTO_EDITADO,
  PRODUCTO_EDITADO_EXITO,
  PRODUCTO_EDITADO_ERROR
} from "../types";
import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

// Crear nuevos productos
export function crearNuevoProductoActions(producto) {
  return async dispatch => {
    dispatch(agregarProducto());

    try {
      //insertar en la API
      await clienteAxios.post("/productos", producto);

      // Si todo OK
      dispatch(agregarProductoExito(producto));

      //Alter OK
      Swal.fire("Correcto", "El producto se agregó correctamente", "success");
    } catch (error) {
      console.log(error);

      // Si hay un error
      dispatch(agregarProductoError(true));

      //Alert Error
      Swal.fire({
        icon: "error",
        title: "Hubo un error",
        text: "Inténtalo de nuevo"
      });
    }
  };
}

const agregarProducto = () => ({
  type: AGREGAR_PRODUCTO,
  payload: true
});

const agregarProductoExito = producto => ({
  type: AGREGAR_PRODUCTO_EXITO,
  payload: producto
});

const agregarProductoError = estado => ({
  type: AGREGAR_PRODUCTO_ERROR,
  payload: estado
});

// Funcion para la carga de productos
export function obtenerProductosAction() {
  return async dispatch => {
    dispatch(listaProductos());

    try {
      const respuesta = await clienteAxios.get("/productos");
      dispatch(listaProductosExito(respuesta.data));
    } catch (error) {
      dispatch(listaProductosError());
    }
  };
}

const listaProductos = () => ({
  type: LISTA_PRODUCTOS,
  payload: true
});

const listaProductosExito = productos => ({
  type: LISTA_PRODUCTOS_EXITO,
  payload: productos
});

const listaProductosError = () => ({
  type: LISTA_PRODUCTOS_ERROR,
  payload: true
});

// Funcion para Eliminar productos
export function borrarProductoAction(id) {
  return async dispatch => {
    dispatch(productoEliminar(id));

    console.log(id);

    try {
      await clienteAxios.delete(`/productos/${id}`);
      dispatch(productoEliminarExito());

      //Si se elimina mostrar alerta
      Swal.fire("Eliminado!", "El item ha sido eliminado.", "success");

    } catch (error) {
      console.log(error);
      dispatch(productoEliminarError());
    }
  };
}

const productoEliminar = id => ({
  type: PRODUCTO_ELIMINAR,
  payload: id
});

const productoEliminarExito = () => ({
  type: PRODUCTO_ELIMINAR_EXITO
});

const productoEliminarError = () => ({
  type: PRODUCTO_ELIMINAR_ERROR,
  payload: true
});


// Para Editar producto

export function obtenerProductoEditar(producto) {
    return (dispatch) => {
        dispatch( obtenerProductoEditarAction(producto))
    }
}

const obtenerProductoEditarAction = producto => ({
    type: EDITAR_PRODUCTO,
    payload: producto
})


// Editado del registro
export function productoEditadoAction(producto) {
    return async (dispatch) => {
        dispatch( productoEditado());

        try {
            await clienteAxios.put(`/productos/${producto.id}`, producto);

            dispatch( productoEditadoExito(producto));
        } catch (error) {
            console.log(error);
            dispatch( productoEditadoError() );
        }
    }
}

const productoEditado = () => ({
    type: PRODUCTO_EDITADO
})

const productoEditadoExito = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
})

const productoEditadoError = () => ({
    type: PRODUCTO_EDITADO_ERROR, 
    payload: true   
})


