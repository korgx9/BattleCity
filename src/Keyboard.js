function Keyboard(eventManager) {
  this._eventManager = eventManager;
  this._events = [];
  this._listen();
  this._keys = {};
}

Keyboard.Key = {
  SPACE:  32,
  LEFT:   37,
  UP:     38,
  RIGHT:  39,
  DOWN:   40,
  S:      83,
  SELECT: 17,
  START:  13
};

Keyboard.Event = {};
Keyboard.Event.KEY_PRESSED = 'Keyboard.Event.KEY_PRESSED';
Keyboard.Event.KEY_RELEASED = 'Keyboard.Event.KEY_RELEASED';

Keyboard.prototype._listen = function () {
  let self = this;
  $(document).keydown(function (event) {
    if (!self._keys[event.which]) {
      self._keys[event.which] = true;
      self._events.push({name: Keyboard.Event.KEY_PRESSED, key: event.which});
    }
    event.preventDefault();
  });
  $(document).keyup(function (event) {
    if (self._keys[event.which]) {
      self._keys[event.which] = false;
      self._events.push({name: Keyboard.Event.KEY_RELEASED, key: event.which});
    }
    event.preventDefault();
  });
};

Keyboard.prototype.fireEvents = function () {
  this._events.forEach(function (event) {
    this._eventManager.fireEvent(event);},
      this
  );
  this._events = [];
};
