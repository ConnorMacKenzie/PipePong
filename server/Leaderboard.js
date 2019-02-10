class Leaderboard {
  constructor() {
    this.players = [];
  }

   getPlayers(){
    return this.players;
  }

   addPlayer(player){
    this.players.push(player);
  }

  removePlayer(player){
    this.players = this.players.filter(el => el.sessionId !== player.sessionId);
  }
}

module.exports = Leaderboard;
