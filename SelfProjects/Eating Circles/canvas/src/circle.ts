const p5 = require('../node_modules/p5/lib/p5');
export class Circle {
    pos: any;
    r: any;

    constructor(public x: number, public y: number, r: number, public s: any) {
        this.pos = s.createVector(x, y);
        this.r = r;
    }
    show() {
        this.s.fill(255);
        this.s.ellipse(this.pos.x, this.pos.y,  this.r*2, this.r*2);
        if(this.r > 20) {
        this.s.textSize(18);
        this.s.text('Circle', this.x, this.y);
        }
    };
}