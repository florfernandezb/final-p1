'use strict';

/*
 *	Fernández Bugna Florencia, Jaureguialzo Manuela 
 */

 let d = document;
 let contProdsCarrito = 0;
 let acumTotal = 0;

 let infoCarrito = {
    listaCarrito: [],
    productoId: [],
	cantidad: [],
	cantidadTotalProductos: 0, 
    getIndexProducto: function(producto) {
        return this.productoId[this.productoId.indexOf(producto)]
    }
}

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
            
            let productoSeleccionado = catalogo[indiceDeBotonApretado(btn)];
            acumTotal += productoSeleccionado.precio;
            contProdsCarrito++;
            
            itemsAgregadosAlCarrito(productoSeleccionado.id);

            if (infoCarrito.listaCarrito.length == 0) {
                infoCarrito.listaCarrito.push(productoSeleccionado);
            } else {
                for (let prod of infoCarrito.listaCarrito) {
                    if(prod.id == infoCarrito.getIndexProducto(productoSeleccionado.id)) {
                        infoCarrito.listaCarrito.splice(infoCarrito.listaCarrito.indexOf(prod), 1)
                    }
                }
                infoCarrito.listaCarrito.push(productoSeleccionado);
            }
            
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

const itemsAgregadosAlCarrito = function(productoId) {
     let indice = infoCarrito.productoId.indexOf(productoId)
    if (indice != -1) {
        infoCarrito.cantidad[indice]++;
    } else {
        infoCarrito.productoId.push(productoId)
        infoCarrito.cantidad.push(1)
    }

    infoCarrito.cantidadTotalProductos++

    let contador = d.getElementById('minicarrito');
    contador.firstElementChild.textContent = `${infoCarrito.cantidadTotalProductos} ítems agregados`;
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
    items.textContent = `${infoCarrito.cantidadTotalProductos} productos - Total: $${acumTotal}`;

    let ul = d.createElement('ul');
    
    for (let producto of infoCarrito.listaCarrito) {
        prod = d.createElement('li');
        titulo = crearEstructuraNombre(producto.nombre);
        precio = crearEstructuraPrecio(producto.precio);
        cantidad = d.createElement('p')
        cantidad.innerHTML = infoCarrito.cantidad[infoCarrito.productoId.indexOf(producto.id)]

        eliminar = d.createElement('a');
        eliminar.textContent = 'Eliminar';
        eliminar.setAttribute('class', 'eliminar');
        eliminar.addEventListener('click', e => { 
            e.target.parentNode.remove();
            carrito.splice(carrito.indexOf(producto),1);
            contProdsCarrito--;
            acumTotal = acumTotal - producto.precio;
            items.textContent = `${contProdsCarrito} productos - Total: $${acumTotal}`;

            itemsAgregadosAlCarrito(producto.id);
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




// Intento de contador por producto duplicado

// var productosFiltrados = carrito.filter(function(item, index, array) {
    //     // let contador = 1;
    //     if(array.indexOf(item) != index) {
            
    //         item.setCantidad(contador++)
    //         console.log("analizar", item.nombre, item.getCantidad())
    //     } else {
    //         return array.indexOf(item) === index;
    //     }
    // })

    // for (let producto of productosFiltrados) {
    //     prod = d.createElement('li')
    //     titulo = crearEstructuraNombre(producto.nombre)
    //     precio = crearEstructuraPrecio(producto.precio)
    //     eliminar = d.createElement('a')
    //     eliminar.textContent = 'Eliminar'
    //     eliminar.addEventListener = function() {
    //         prod.remove();
    //     }
    //     prod.append(titulo, precio, eliminar)
    //     ul.appendChild(prod)
    // }