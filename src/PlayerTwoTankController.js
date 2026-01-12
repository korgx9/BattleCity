function PlayerTwoTankController(eventManager, tank) {
  SpriteController.call(this, eventManager, tank);
  this._eventManager.addSubscriber(this, [BaseExplosion.Event.DESTROYED]);
  this._active = true;
}

PlayerTwoTankController.subclass(SpriteController);

// Key codes for arrow keys + / for shoot
PlayerTwoTankController.Key = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  SHOOT: 191 // / key
};

PlayerTwoTankController.prototype.notify = function (event) {
  SpriteController.prototype.notify.call(this, event);
  
  if (event.name == BaseExplosion.Event.DESTROYED) {
    this._sprite.stop();
    this._active = false;
  }
};

PlayerTwoTankController.prototype.keyPressed = function (key) {
  if (!this._active || !this._sprite.canMove()) {
    return;
  }
  
  // Player 2 controls: Arrow keys for movement + / for shoot
  if (key == PlayerTwoTankController.Key.LEFT) {
    this._sprite.setDirection(Sprite.Direction.LEFT);
    this._sprite.toNormalSpeed();
  }
  else if (key == PlayerTwoTankController.Key.RIGHT) {
    this._sprite.setDirection(Sprite.Direction.RIGHT);
    this._sprite.toNormalSpeed();
  }
  else if (key == PlayerTwoTankController.Key.UP) {
    this._sprite.setDirection(Sprite.Direction.UP);
    this._sprite.toNormalSpeed();
  }
  else if (key == PlayerTwoTankController.Key.DOWN) {
    this._sprite.setDirection(Sprite.Direction.DOWN);
    this._sprite.toNormalSpeed();
  }
  else if (key == PlayerTwoTankController.Key.SHOOT) {
    this._sprite.shoot();
  }
};

PlayerTwoTankController.prototype.keyReleased = function (key) {
  if (this._sprite.getDirection() == Sprite.Direction.LEFT && key == PlayerTwoTankController.Key.LEFT ||
      this._sprite.getDirection() == Sprite.Direction.RIGHT && key == PlayerTwoTankController.Key.RIGHT ||
      this._sprite.getDirection() == Sprite.Direction.UP && key == PlayerTwoTankController.Key.UP ||
      this._sprite.getDirection() == Sprite.Direction.DOWN && key == PlayerTwoTankController.Key.DOWN) {
    this._sprite.stop();
  }
};
