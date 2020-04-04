var params = new URLSearchParams(window.location.search);

//referencias de jQuery
var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

var nombre = params.get('nombre');
var sala = params.get('sala')

//Funciones para renderizar usuarios
function renderizarUsuarios(personas) {

    console.log(personas);

    var html = '';


    html += '<li>';
    html += '<a href="javascript:void(0)" class="active"> Chat de <span> ' + params.get('sala') + '</span></a>';
    html += '</li>';

    for (var i = 0; i < personas.length; i++) {
        html += '<li>';
        html += '<a data-id="' + personas[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + personas[i].nombre + ' <small class="text-success">online</small></span></a>';
        html += '</li>';
    }

    divUsuarios.html(html); //Le decimos que el html de ese div va a ser igual a todo el html que hemos creado ahí

}

function renderizarMensajes(mensaje, yo = false) {

    var html = '';
    var fecha = new Date(mensaje.fecha);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();

    var adminClass = 'info';

    var isAdmin = (mensaje.nombre === 'Administrador');

    if (isAdmin) {
        adminClass = 'danger';
    }

    if (yo) {
        html += '<li class="animated fadeIn">';
        if (!isAdmin)
            html += '<div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        html += '<div class="chat-content">';
        html += '<h5>' + mensaje.nombre + '</h5>';
        if (isAdmin) {
            html += '<div class="box bg-light-' + adminClass + '">' + mensaje.mensaje + '</div>';
        } else {
            html += '<div class="box bg-light-info">' + mensaje.mensaje + '</div>';
        }
        html += '</div>';
        html += '<div class="chat-time">' + hora + '/div>';
        html += '</li>';
    } else {
        html += '<li class="reverse">'
        html += '<div class="chat-content">'
        html += '<h5>' + mensaje.nombre + '</h5>'
        html += '<div class="box bg-light-inverse">' + mensaje.mensaje + '</div>'
        html += '</div>'
        html += '<div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>'
        html += '<div class="chat-time">' + hora + '</div>'
        html += '</li>'
    }

    divChatbox.append(html);

}

function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}

//Listener o escuchas de JQuery
divUsuarios.on('click', 'a', function() {

    var id = $(this).data('id'); //el this se refiere al a al que le hemos hecho click y el id es el de data-id

    if (id)
        console.log(id);
});


formEnviar.on('submit', function(evento) {

    evento.preventDefault(); //Previene que al darle al intro dispare el refresh y no borre el texto

    if (txtMensaje.val().trim().length === 0) {
        return; //Si quitandole los espacios la longitud es cero no haga nada
    }

    socket.emit('crearMensaje', {
        nombre: nombre,
        mensaje: txtMensaje.val()
    }, function(mensaje) {
        txtMensaje.val('').focus(); //limpio lo que había y pongo .focus para que el cursor se quede ahí
        renderizarMensajes(mensaje)
        scrollBottom();
    })

});