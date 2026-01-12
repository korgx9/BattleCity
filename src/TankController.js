function TankController(eventManager, tank) {
  SpriteController.call(this, eventManager, tank);
  this._eventManager.addSubscriber(this, [BaseExplosion.Event.DESTROYED]);
  this._active = true;
}

TankController.subclass(SpriteController);

TankController.prototype.notify = function (event) {
  SpriteController.prototype.notify.call(this, event);
  
  if (event.name == BaseExplosion.Event.DESTROYED) {
    this._sprite.stop();
    this._active = false;
  }
};

TankController.prototype.keyPressed = function (key) {
  if (!this._active || !this._sprite.canMove()) {
    return;
  }
  
  // Player 1 controls: W/A/S/D for movement + E for shoot
  if (key == 87) { // W = Up
    this._sprite.setDirection(Sprite.Direction.UP);
    this._sprite.toNormalSpeed();
  }
  else if (key == 65) { // A = Left
    this._sprite.setDirection(Sprite.Direction.LEFT);
    this._sprite.toNormalSpeed();
  }
  else if (key == 83) { // S = Down
    this._sprite.setDirection(Sprite.Direction.DOWN);
    this._sprite.toNormalSpeed();
  }
  else if (key == 68) { // D = Right
    this._sprite.setDirection(Sprite.Direction.RIGHT);
    this._sprite.toNormalSpeed();
  }
  else if (key == 69) { // E = Shoot
    this._sprite.shoot();
  }
};

TankController.prototype.keyReleased = function (key) {
  if (this._sprite.getDirection() == Sprite.Direction.LEFT && key == 65 ||
      this._sprite.getDirection() == Sprite.Direction.RIGHT && key == 68 ||
      this._sprite.getDirection() == Sprite.Direction.UP && key == 87 ||
      this._sprite.getDirection() == Sprite.Direction.DOWN && key == 83) {
    this._sprite.stop();
  }
};
