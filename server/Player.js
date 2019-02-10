module.exports = class Player {
  constructor(name, sessionId, color) {
    this.name = name;
    this.sessionId = sessionId;
    this.color = color;
    this.time = Date.now();
  }
}
