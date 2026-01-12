function PlayerTwoTankController(eventManager, tank) {
  SpriteController.call(this, eventManager, tank);
  this._eventManager.addSubscriber(this, [BaseExplosion.Event.DESTROYED]);
  this._active = true;
}

PlayerTwoTankController.subclass(SpriteController);

// Key codes for WASD controls
PlayerTwoTankController.Key = {
  W: 87,
  A: 65,
  S: 83,
  D: 68,
  ENTER: 13
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
  
  if (key == PlayerTwoTankController.Key.A) {
    this._sprite.setDirection(Sprite.Direction.LEFT);
    this._sprite.toNormalSpeed();
  }
  else if (key == PlayerTwoTankController.Key.D) {
    this._sprite.setDirection(Sprite.Direction.RIGHT);
    this._sprite.toNormalSpeed();
  }
  else if (key == PlayerTwoTankController.Key.W) {
    this._sprite.setDirection(Sprite.Direction.UP);
    this._sprite.toNormalSpeed();
  }
  else if (key == PlayerTwoTankController.Key.S) {
    this._sprite.setDirection(Sprite.Direction.DOWN);
    this._sprite.toNormalSpeed();
  }
  else if (key == PlayerTwoTankController.Key.ENTER) {
    this._sprite.shoot();
  }
};

PlayerTwoTankController.prototype.keyReleased = function (key) {
  if (this._sprite.getDirection() == Sprite.Direction.LEFT && key == PlayerTwoTankController.Key.A ||
      this._sprite.getDirection() == Sprite.Direction.RIGHT && key == PlayerTwoTankController.Key.D ||
      this._sprite.getDirection() == Sprite.Direction.UP && key == PlayerTwoTankController.Key.W ||
      this._sprite.getDirection() == Sprite.Direction.DOWN && key == PlayerTwoTankController.Key.S) {
    this._sprite.stop();
  }
};
