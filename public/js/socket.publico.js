// Cargar la libreria de Socket.io
var socket = io();
var ultimo;

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

var arrLabels = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
var arrescritorio = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];


socket.on('estadoActual', function(data){
    actualizaHtml(data.ultimos4);
});

socket.on('ultimos4', function(data){
    
    var notificacion = new Audio('audio/new-ticket.mp3');
    notificacion.play();

    actualizaHtml(data.ultimos4);
});

// Función para poblar el HTML
function actualizaHtml(ultimos4) {
    
    for( var i=0; i <= ultimos4.length -1; i++ ) {
        arrLabels[i].text('Ticket ' + ultimos4[i].numero);
        arrescritorio[i].text('Escritorio ' + ultimos4[i].escritorio);
    }
}