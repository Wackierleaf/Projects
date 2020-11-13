const { v4: uuidv4 } = require('uuid');
const express = require("express");
const app = express();
const PlayerState = require('./Objects/playerState');
const GameState = require('./Objects/gameState');
app.use(function (require, response, next) {
    let origin = 'http://127.0.0.1/8080/';
    response.header('Access-Control-Allow-Origin', require.headers.origin);
    response.header('Access-Control-Allow-Origin-Methods', 'GET');
    response.header('Access-Control-Allow-Origin-Headers', 'Origin, X-Requested-Width, Content-Type, Accept');
    next();
});
const R_PLAYER = 30;
const height = 937;
const width = 2560;
const foodSize = 18;
const AmountOfFood = 300;

let gameSt = new GameState(width, height);
gameSt.init(foodSize, AmountOfFood);
setInterval(() => gameSt.updateSt(), 15.625);
app.get("/get_state", (request, response) => {
    let player_id = request.query.id;
    if (gameSt.map.get(player_id) || gameSt.map.get(player_id) == 0) {
        gameSt.addTargetCoords(player_id, request.query.x, request.query.y);
        let playerState = new PlayerState(gameSt.food, gameSt.players,gameSt.map.get(player_id));
        response.send(JSON.stringify(playerState));
    }
    else {
        response.send(404);
    }
});
app.get("/create_player", (request, response) => {
    let playerId = uuidv4();
    gameSt.addPlayer(playerId, R_PLAYER);
    response.send(JSON.stringify({ "playerId": playerId, 'width': width, 'height': height }));
});
app.listen(3000, function () {
    console.log("сервер запущен");
});
