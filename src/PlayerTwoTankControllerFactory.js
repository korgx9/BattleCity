function PlayerTwoTankControllerFactory(eventManager) {
  this._eventManager = eventManager;
  this._eventManager.addSubscriber(this, [PlayerTankFactory.Event.PLAYER_TANK_CREATED]);
}

PlayerTwoTankControllerFactory.prototype.notify = function (event) {
  if (event.name == PlayerTankFactory.Event.PLAYER_TANK_CREATED) {
    if (event.tank && event.tank.getType() === Tank.Type.PLAYER_2) {
      this.create(event.tank);
    }
  }
};

PlayerTwoTankControllerFactory.prototype.create = function (tank) {
  var controller = new PlayerTwoTankController(this._eventManager, tank);
  return controller;
};
