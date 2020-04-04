var socket = io();

var params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html';
    window.alert('El nombre es necesario');
    throw new Error('El nombre y sala son necesario');
}

var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
}

socket.on('connect', function() {

    console.log('Conectado al servidor');

    // socket.emit('entrarChat', usuario); Si me acepta tengo que hacer un callback, por eso hago la función de abajo
    socket.emit('entrarChat', usuario, function(resp) {
        //console.log('Usuarios Conectados', resp);
        renderizarUsuarios(resp);
    })

});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    nombre: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('enviarMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);


});

// Escuchar broadcast administrador
socket.on('crearMensaje', function(mensaje) {

    renderizarMensajes(mensaje, false);
    scrollBottom();

});

socket.on('listaPersonas', function(usuarios) {

    // console.log(usuarios);
    renderizarUsuarios(usuarios);

});


//Mensajes Privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('Mensaje privado', mensaje);
})