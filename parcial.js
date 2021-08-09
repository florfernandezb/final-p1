'use strict';

/*
 *	Fernández Bugna Florencia, Jaureguialzo Manuela 
 */

 let d = document;
 let contProdsCarrito = 0;
 let acumTotal = 0;

 let infoCarrito = [
//      {
//     listaCarrito: [],
//     productoId: [],
// 	cantidad: [],
// 	cantidadTotalProductos: 0, 
//     getIndexProducto: function(producto) {
//         return this.productoId[this.productoId.indexOf(producto)]
//     }
// }
]

// TODO Aca filtrar por categoria
const crearProducto = function(producto) {
    for (let producto of catalogo) {
        let padre = d.createElement('div');
        padre.id = `producto-${producto.id}`;
        let img, titulo, precio, boton;

        img = crearEstructuraImagen(producto.imagen);
        titulo = crearEstructuraNombre(producto.nombre);
        precio = crearEstructuraPrecio(producto.precio);
        boton = crearBotonAgregar();
        
        padre.append(img, titulo, precio, boton);
    
        d.getElementById('productos').appendChild(padre);
    }
}

const crearBotonAgregar = function() {
    let boton = d.createElement('button');
    boton.textContent = "Agregar";
    return boton;
}

const crearEstructuraNombre = function(nombre) {
    let titulo = d.createElement('h3');
    titulo.setAttribute('class', 'ver-mas');
    titulo.textContent = nombre;
    return titulo;
}

const crearEstructuraDescripcion = function(descripcion) {
    let desc = d.createElement('p');
    desc.innerHTML = descripcion;
    desc.className = "descripcion";
    return desc;
}

const crearEstructuraPrecio = function(precio) {
    let valor = d.createElement('p');
    valor.textContent = `$${precio}`;
    return valor;
}

const crearEstructuraImagen = function(imagen) {
    let img = d.createElement('img');
    img.setAttribute('class', 'ver-mas');
    img.src = `recursos/${imagen}`;
    return img;
}

const crearbotonCerrar = function() {
    let cerrar;
    cerrar = d.createElement('a');
    cerrar.setAttribute('href', 'javascript:void(0)');
    cerrar.className = "cerrar";
    cerrar.textContent = 'X';
    return cerrar;
}

const crearModalProducto = function() {
    let imagenes = d.querySelectorAll('img');
    let indice;
    for (let img of imagenes) {
        img.addEventListener('click', (e) => {
        let div = d.createElement('div');
        div.className = "modal";
        d.body.appendChild(div);
            for (let producto of catalogo) {
                if(producto.id == img.parentNode.id.slice(9)) {
                    let cerrar, img, titulo, precio, descripcion, boton;
                    indice = producto.id;
                    cerrar = d.createElement('a');
                    cerrar = crearbotonCerrar();
                    cerrar.onclick = function(  ) {
                        div.remove();
                        return false;
                    }
                    img = crearEstructuraImagen(producto.imagen);
                    titulo = crearEstructuraNombre(producto.nombre);
                    precio = crearEstructuraPrecio(producto.precio);
                    descripcion = crearEstructuraDescripcion(producto.descripcion);
                    boton = crearBotonAgregar();
                    boton.addEventListener('click', e => {
                        acumTotal += producto.precio;
                        contProdsCarrito++;
                        
                        itemsAgregadosAlCarrito(producto.id);
                        carrito.push(catalogo[indiceDeBotonApretado(boton)])
                        let agregado = d.getElementById("alerta");
                        agregado.className = "show";
                        setTimeout(function(){ agregado.className = agregado.className.replace("show", ""); }, 3000);
                    })
                div.id = `producto-${indice}`;
                div.append(img, titulo, precio, descripcion, boton, cerrar);
            }
            }
        div.id += " modalProducto";
        })
    }
}

function agregarAlCarrito() {
    for (let btn of d.querySelectorAll('button')) {
        btn.addEventListener('click', e => {
            let carrito = new Carrito()
            carrito.cantidad = 0
            
            let productoSeleccionado = catalogo[indiceDeBotonApretado(btn)];
            let exist = true;

            acumTotal += productoSeleccionado.precio;
            contProdsCarrito++;
            
            if(infoCarrito.length == 0) {
                infoCarrito.push({listaProductos: productoSeleccionado, productoId: productoSeleccionado.id, cantidad: 1});
            } else {
                for (let prod of infoCarrito) {
                    if (prod.productoId == productoSeleccionado.id) {
                        prod.cantidad++;
                        exist = true;
                        break;
                    } else {
                        exist = false;
                    }
                }
            }

            if(!exist) {
                infoCarrito.push({listaProductos: productoSeleccionado, productoId: productoSeleccionado.id, cantidad: 1});
            }
           
            let contador = d.getElementById('minicarrito');
            contador.firstElementChild.textContent = `${contProdsCarrito} ítems agregados`;

            let agregado = d.getElementById("alerta");
            agregado.className = "show";
            setTimeout(function(){ agregado.className = agregado.className.replace("show", ""); }, 800);
        })
    }
}

function indiceDeBotonApretado(btn) {
    let indice;
        indice = btn.parentNode.id;
        if(indice.includes('modalProducto')) {
            indice = indice.split(' ')[0].slice(9)
        } else if (indice.includes('minicarrito')) {
            indice = null;
        } else {
            indice = indice.slice(9);
        }

        return indice;    
}

const crearMiniCarrito = function() {
    let miniCarrito = d.getElementById('minicarrito');
    let items = d.createElement('p');
    let precioTotal = d.createElement('p');
    let botonCarrito = d.createElement('button');
    
    items.textContent = '0 ítems agregados';
    precioTotal.textContent = 'Total: $0';
    botonCarrito.textContent = 'Ver carrito';
    botonCarrito.addEventListener('click', e => {
        crearModalCarrito(botonCarrito);
    })
    miniCarrito.append(items, precioTotal, botonCarrito);
}

const crearModalCarrito = function() {
    let cerrar, items, prod, titulo, precio, eliminar, cantidad, vaciarCarrito;
    let div = d.createElement('div');
    div.className = "modal";
    d.body.appendChild(div);

    cerrar = crearbotonCerrar();
    cerrar.addEventListener('click', () => {
        div.remove();
        return false;
    })
    
    items = d.createElement('p')
    items.textContent = `${contProdsCarrito} productos - Total: $${acumTotal}`;

    let ul = d.createElement('ul');
    
    for (let item of infoCarrito) {
        prod = d.createElement('li');
        titulo = crearEstructuraNombre(item.listaProductos.nombre);
        precio = crearEstructuraPrecio(item.listaProductos.precio * item.cantidad);
        cantidad = d.createElement('p');
        cantidad.innerHTML = infoCarrito[infoCarrito.indexOf(item)].cantidad;

        eliminar = d.createElement('a');
        eliminar.textContent = 'Eliminar';
        eliminar.setAttribute('class', 'eliminar');
        eliminar.addEventListener('click', e => { 
            
            if(infoCarrito[infoCarrito.indexOf(item)].cantidad != 1) {
                infoCarrito[infoCarrito.indexOf(item)].cantidad--
                let parent = e.target.parentNode
                parent.querySelectorAll('p')[1].textContent = infoCarrito[infoCarrito.indexOf(item)].cantidad
                parent.querySelectorAll('p')[0].textContent = `$${item.listaProductos.precio * item.cantidad}`
            } else {
                e.target.parentNode.remove();
                infoCarrito.splice(infoCarrito.indexOf(item), 1);
            }
            contProdsCarrito--;
            acumTotal = acumTotal - item.listaProductos.precio;
            items.textContent = `${contProdsCarrito} productos - Total: $${acumTotal}`;
        })

        vaciarCarrito = d.createElement('a')
        vaciarCarrito.textContent = 'Vaciar';
        vaciarCarrito.addEventListener('click', e => { 
            infoCarrito.listaCarrito = []
            infoCarrito.productoId = []
            infoCarrito.cantidad = []
            infoCarrito.cantidadTotalProductos = 0;
    
            e.target.parentNode.parentNode.remove()
            contProdsCarrito = 0;
            acumTotal = 0;
            items.textContent = `${contProdsCarrito} productos - Total: $${acumTotal}`;
        })

        prod.append(titulo, precio, eliminar, cantidad, vaciarCarrito);
        ul.appendChild(prod);
    }
    
    div.append(cerrar, items, ul);
}
