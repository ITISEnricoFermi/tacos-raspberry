import { EventEmitter } from "events";

namespace Bus {
  export const EventBus = new EventEmitter();
}

import EventBus = Bus.EventBus;

export { EventBus };
export default Bus;
