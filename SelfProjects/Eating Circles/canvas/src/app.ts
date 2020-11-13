const p5 = require('../node_modules/p5/lib/p5');
const http = require('http');
import { Circle } from './circle';
import { LeaderBoard } from './leaderBoard'

const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: '',
    method: 'Get'
}
let leadersBoard: any;
let playerId: string;
let width: number;
let height: number;
let playerIndex: number;
let food: any = [];
let players: any = [];
let serverPlayers: any = [];
let serverFood: any = [];
let zoom: number = 1.8;//1.8
let newzoom = zoom;
let serverResp: any;
let prevR: number;
function sendData(mx: number, my: number) {
    options.path = '/get_state?id=' + playerId + '&x=' + mx + '&y=' + my;
    let req = http.request(options, (res: any) => {
        res.on('data', (body: any) => {
            serverResp = JSON.parse(new TextDecoder("utf-8").decode(body));
            playerIndex = serverResp.playerIndex;
            serverFood = serverResp.food;
            serverPlayers = serverResp.players;
        });
        res.on('end', () => {
            console.log('req');
        });
    });
    req.end();
}
const sketch = (s: typeof p5) => {
    let FixedsysFont: any;
    s.preload = () => {
        FixedsysFont = s.loadFont('./assets/Fixedsys.ttf');
        s.loadJSON('http://127.0.0.1:3000/create_player', (response: any) => {
            playerId = response.playerId;
            width = response.width;
            height = response.height;

            s.loadJSON(`http://127.0.0.1:3000/get_state?id=${playerId}&x=${Number.EPSILON}&y=${Number.EPSILON}`, (response: any) => {
                serverFood = response.food;
                playerIndex = response.playerIndex;
                serverPlayers = response.players;
            })
        });
    }
    s.setup = () => {
        s.createCanvas(width, height);
        s.background(220);
        s.frameRate(64);
        s.textFont(FixedsysFont);
    }

    s.draw = () => {
        s.background(220);
        food = [];
        for (let i = 0; i < serverFood.length; i++) {
            food[i] = new Circle(serverFood[i].x, serverFood[i].y, serverFood[i].r, s);
        }
        players = [];
        for (let i = 0; i < serverPlayers.length; i++) {
            players[i] = new Circle(serverPlayers[i].x, serverPlayers[i].y, serverPlayers[i].r, s);
        }
        s.translate(s.width / 2, s.height / 2);
        if (prevR != serverPlayers[playerIndex].r) {
            newzoom -= 0.0065;
        }
        zoom = s.lerp(zoom, newzoom, 0.1);
        s.scale(zoom);
        s.translate(-serverPlayers[playerIndex].x, -serverPlayers[playerIndex].y);
        for (let i = -s.width; i < s.width; i = i + 50) {
            s.line(i, -s.height, i, s.height);
            s.stroke(126);
        }
        for (let i = -s.height; i < s.height; i = i + 50) {
            s.line(-s.width, i, s.width, i);
            s.stroke(126);
        }

        for (let i = 0; i < food.length; i++) {
            food[i].show();
        }
        for (let i = players.length - 1; i >= 0; i--) {
            players[i].show();
        }
        leadersBoard = new LeaderBoard('adfs',s);
        leadersBoard.show(serverPlayers[playerIndex].x+serverPlayers[playerIndex].r,serverPlayers[playerIndex].y);
        prevR = serverPlayers[playerIndex].r;
        sendData(s.mouseX - s.width / 2, s.mouseY - s.height / 2);
    }

}
console.log(window.innerHeight, '  ', window.innerWidth);
const sketchInst = new p5(sketch);
