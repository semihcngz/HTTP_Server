const net = require('net');

const PORT = 4221;
const response = 'HTTP/1.1 200 OK\r\n\r\n';

// TCP Server
const server = net.createServer((socket) => {
    console.log('new connection');

    socket.on('data', (data) => {
        const request = data.toString();
        console.log('Coming request:\n' + request);

        // Get request line
        const requestLine = request.split('\r\n')[0];
        const [method, path, version] = requestLine.split(' ');

        console.log(`Method: ${method}
Path: ${path}
Version: ${version}`);

        let response;
        if(path == '/'){
            response = 'HTTP/1.1 200 OK\r\n\r\n'
        }else{
            response = 'HTTP/1.1 404 NOT FOUND\r\n\r\n'
        }


        // HTTP 200 response
        socket.write(response);

        // Close connection
        socket.end();
    });

    socket.on('end', () => {
        socket.end()
        console.log('connection is dead');
    });
});


server.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
})


