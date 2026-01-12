function EventManager() {
  this._subscribers = {};
}

EventManager.prototype.addSubscriber = function (subscriber, events) {
  for (let i in events) {
    if (!this._subscribers[events[i]]) {
      this._subscribers[events[i]] = [];
    }
    this._subscribers[events[i]].push(subscriber);
  }
};

EventManager.prototype.removeSubscriber = function (subscriber) {
  for (let i in this._subscribers) {
    for (let j in this._subscribers[i]) {
      if (this._subscribers[i][j] === subscriber) {
        this._subscribers[i].splice(j, 1);
      }
    }
  }
};

EventManager.prototype.removeAllSubscribers = function () {
  this._subscribers = {};
};

EventManager.prototype.fireEvent = function (event) {
  let subscribers = this._subscribers[event.name];
  for (let i in subscribers) {
    subscribers[i].notify(event);
  }
};
