const express = require('express');
const ws = require('ws');
const http = require('http');
const uuidv1 = require('uuid/v1');
const diskdb = require('diskdb');

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({server});
const port = 3000;
const db = diskdb.connect('./', ['lists']);

const connections = {
    // ID: [client]
}

wss.on('connection', (client) => {
    let id;

    client.on('message', (messageString) => {
        const message = JSON.parse(messageString);

        switch(message.command) {
            case "register":
                if (id && connections[id].indexOf(client) !== -1) {
                    connections[id].splice(connections[id].indexOf(client));
                }
                if (message.data.id) {
                    id = message.data.id;
                } else {
                    id = uuidv1();
                }
                connections[id] = connections[id] || [];
                connections[id].push(client);
                
                client.send(JSON.stringify({event: "registered", id: id}));
                client.send(JSON.stringify({event: "init", data: db.lists.findOne({listID: id})}));
                break;
            case "set":
                db.lists.update({listID: id}, {...message.data, listID: id}, {upsert: true});
                const fromDB = db.lists.findOne({listID: id});
                client.send(JSON.stringify({event: "dataSet", data: fromDB}));
                connections[id].forEach((connection) => connection !== client && connection.send(JSON.stringify({event: "listUpdate", data: fromDB})));
                break;
        }
    });

    client.on('error', () => {
        if (id && connections[id].indexOf(client) !== -1) {
            connections[id].splice(connections[id].indexOf(client));
        }
    });

    client.on('close', () => {
        if (id && connections[id].indexOf(client) !== -1) {
            connections[id].splice(connections[id].indexOf(client));
        }
    });
});

server.listen(port, () => {
    console.log(`Server started on ${server.address().port}!`)
});