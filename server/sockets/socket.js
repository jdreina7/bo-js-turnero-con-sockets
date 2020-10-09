const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');


const ticketControl = new TicketControl();

io.on('connection', (client) => {
    
    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguienteTicket();
        console.log(siguiente);
        callback(siguiente);
    });

    // Emitir el evento que me muestre el ultimo ticket
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    // Escuchar el evento que atiende un ticket
    client.on('atenderTicket', (data, callback) => {
        
        if( !data.escritorio ) {
            return callback({
                error: true,
                mensaje: 'El Escritorio es necesario para la asignación de tickets!'
            });
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio );

        callback( atenderTicket );

        // Transmitir los cambios en los ultimos4
        client.broadcast.emit('ultimos4', {
            actual: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        });

    });
});