module.exports = class PlayerState {
    constructor(food = [], players = [], playerIndex) {
        this.food = food;
        this.players = players;
        this.playerIndex = playerIndex;
    }
}