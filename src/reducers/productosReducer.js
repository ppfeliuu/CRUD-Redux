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
  PRODUCTO_EDITADO_ERROR,
  PRODUCTO_EDITADO_EXITO
} from "../types";

const initialState = {
  productos: [],
  error: null,
  loading: false,
  productoEliminar: null,
  productoEditar: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LISTA_PRODUCTOS:
    case AGREGAR_PRODUCTO:
      return {
        ...state,
        loading: action.payload
      };
    case AGREGAR_PRODUCTO_EXITO:
      return {
        ...state,
        loading: false,
        productos: [...state.productos, action.payload]
      };
    case AGREGAR_PRODUCTO_ERROR:
    case LISTA_PRODUCTOS_ERROR:
    case PRODUCTO_ELIMINAR_ERROR:
    case PRODUCTO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case LISTA_PRODUCTOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        productos: action.payload
      };
    case PRODUCTO_ELIMINAR:
      return {
        ...state,
        productoEliminar: action.payload
      };
    case PRODUCTO_ELIMINAR_EXITO:
      return {
        ...state,
        productos: state.productos.filter(
          producto => producto.id !== state.productoEliminar
        ),
        productoEliminar: null
      };
    case EDITAR_PRODUCTO:
      return {
        ...state,
        productoEditar: action.payload
      };
    case PRODUCTO_EDITADO_EXITO:
      return {
        ...state,
        productoEditar: null,
        productos: state.productos.map(producto =>
          producto.id === action.payload.id
            ? (producto = action.payload)
            : producto
        )
      };
    default:
      return state;
  }
}
