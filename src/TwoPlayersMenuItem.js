function TwoPlayersMenuItem(sceneManager) {
  MainMenuItem.call(this, sceneManager);
  this.setName("2 PLAYERS");
}

TwoPlayersMenuItem.subclass(MainMenuItem);

TwoPlayersMenuItem.prototype.execute = function () {
  this._sceneManager.toGameScene();
};
