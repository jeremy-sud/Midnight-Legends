/**
 * EventBus — Lightweight pub/sub event system for decoupled communication.
 * Used to eliminate circular references between Engine ↔ UIManager.
 */
class EventBusClass {
  constructor() {
    this._listeners = {};
  }

  /**
   * Subscribe to an event.
   * @param {string} event - Event name
   * @param {Function} handler - Callback function
   */
  on(event, handler) {
    if (!this._listeners[event]) this._listeners[event] = [];
    this._listeners[event].push(handler);
  }

  /**
   * Unsubscribe from an event.
   * @param {string} event - Event name
   * @param {Function} handler - The same function reference passed to on()
   */
  off(event, handler) {
    if (!this._listeners[event]) return;
    this._listeners[event] = this._listeners[event].filter(h => h !== handler);
  }

  /**
   * Emit an event to all subscribers.
   * @param {string} event - Event name
   * @param {*} data - Data to pass to handlers
   */
  emit(event, data) {
    const handlers = this._listeners[event];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      handlers[i](data);
    }
  }

  /** Remove all listeners (useful for testing/reset). */
  clear() {
    this._listeners = {};
  }
}

export const EventBus = new EventBusClass();
