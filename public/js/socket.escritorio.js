// Cargar la libreria de Socket.io
var socket = io();
var ticketActual = $('small');

socket.on('connect', function() {
    console.log('Conectados al servidor desde LOS ESCRITORIOS!');
});

socket.on('disconnect', function() {
    console.log('Desconectado del servidor desde LOS ESCRITORIOS!');
});

// Recuperamos un parámetro de la URL
var buscarParametro = new URLSearchParams(window.location.search);

if ( !buscarParametro.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El Escritorio es obligatorio!');
}

var escritorio = buscarParametro.get('escritorio');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp){

        if (resp === 'No hay más tickets por atender') {
            ticketActual.text(resp);
            alert(resp);
            return;
        }

        ticketActual.text('Ticket ' + resp.numero);
    });
    
})