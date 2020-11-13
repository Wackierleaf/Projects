const p5 = require('../node_modules/p5/lib/p5');
export class LeaderBoard {
    title: string;
    boardX: number;
    boardY: number;

    constructor(title: string, public s: any) {
        this.title = title;
    }

    show(playerX: number, playerY: number) {
        this.s.fill(128,128,128,60);
        this.boardX = playerX + innerWidth ;
        this.boardY = playerY -innerHeight;
        this.s.rect(innerWidth, innerHeight, 150, 200);
        this.s.fill(255);
        this.s.textSize(26);
        //this.s.text('LeaderBoard', 0.0-innerWidth, 0.0 - innerHeight);
        console.log(innerWidth, this.boardY);
    };
}