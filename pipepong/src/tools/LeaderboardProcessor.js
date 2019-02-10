function processLeaderBoardList(leaderboard, height){
    leaderboard.sort(compareLifetimes);
    var total = leaderboard.sum("timeAlive");
    var offset = 0;
    leaderboard.map((player)=>{
        player.height = height*player.timeAlive/total;
        player.y = offset;
        offset += player.height;
        player.color = getRandomColor();
    })
}

function compareLifetimes(b, a){
    if (a.timeAlive < b.timeAlive) return -1;
    if (a.timeAlive > b.timeAlive) return 1;
    return 0;
}

Array.prototype.sum = function(prop){
    var total = 0;
    for (var i = 0, _len = this.length; i<_len; i++){
        total += this[i][prop]
    }
    return total
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

export {processLeaderBoardList}