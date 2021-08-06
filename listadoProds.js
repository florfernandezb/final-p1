'use strict';

let catalogo = [];

let producto1 = new Producto(
    0,
    "Parlante Velvet",
    "Elegante parlante con conexión Bluetooth, entrada de tarjeta TF, entrada auxiliar de 3.5mm y micrófono integrado para recibir llamadas.",
    3500,
    "parlante-velvet.jpg"
)

let producto2 = new Producto(
    1,
    "Lámpara Lumi",
    "Práctica lámpara doble función. Para usar como farol o como linterna girando el panel LED. Tiene 3 niveles de intensidad de luz y un soporte para sujetarla.",
    2000,
    "lampara-lumi.jpg"
)

let producto3 = new Producto(
    2,
    "Ventilador pocket",
    "Ventilador de mano portátil con carga USB y tres velocidades. Ideal para llevar en la cartera, mochila o dejar fijo en el escritorio.",
    1500,
    "ventilador-pocket.jpg"
)

let producto4 = new Producto(
    3,
    "Casita organizadora",
    "Pieza de madera maciza imantada para combinar. Sus ranuras multipropósito sirven para usar como lapicero, porta celular, porta tarjetas o para organizar post-it, papeles, banditas elásticas, clips, ganchos y otros objetos de escritorio. Sus caras con imanes permiten combinarlas entre sí o sujetar clips o pequeños objetos metálicos.",
    1000,
    "casita-organizadora.jpg"
)

let producto5 = new Producto(
    4,
    "Vaso térmico",
    "Vaso térmico para mantener tus bebidas frías o calientes. Vaso de plástico doble pared 450ml. BPA free. Reutilizable. Tapa a rosca con cierre anti-vuelco. Funda siliconada para un agarre antideslizante. Apto para microondas y lavavajillas. Dejar abierto el pico de la tapa para poner en el microondas.",
    1200,
    "vaso-termico.jpg"
)

let producto6 = new Producto(
    5,
    "Lámpara balloon",
    "Mágica lámpara globo con aplique superior para techo. Se enciende tirando suavemente de su hilo. Emite una luz tenue y climática.",
    2000,
    "lampara-balloon.jpg"
)

catalogo.push(producto1, producto2, producto3, producto4, producto5, producto6);
