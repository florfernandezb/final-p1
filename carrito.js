'use strict';

function Carrito(listadoProductos = [], productId = 0) {
    this.listadoProductos = listadoProductos,
    this.productoId = productId
    let cantidad = 0
    // total,
    let totalItems = 0

    this.addProducto = function(producto) {
        this.listadoProductos.push(producto)
    }

    this.getListadoProductos = function() {
        return this.listadoProductos;
    }

    this.getIdProducto = function() {
        return this.productoId;
    }

    this.setIdProducto = function(id) {
        this.productoId = id;
    }

    this.getCantidadProducto = function() {
        return this.cantidad;
    }

    this.setCantidadProducto = function(cant) {
       cantidad = cant++;
    }

    this.getTotalItems = function() {
        return this.totalItems;
    }

    this.setTotalItems = function(totalItems) {
        this.totalItems = totalItems++;
    }


}