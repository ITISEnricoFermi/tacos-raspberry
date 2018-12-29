import { EventEmitter } from "events";

namespace Bus {
  export const EventBus = new EventEmitter();
}

import EventBus = Bus.EventBus;

/**
 * Alias di EventEmitter.emit
 */
export const PushEvent = EventBus.emit;
/**
 * Alias di EventEmitter.on
 */
export const SubscriveToEvent = EventBus.on;

export { EventBus };
export default Bus;
