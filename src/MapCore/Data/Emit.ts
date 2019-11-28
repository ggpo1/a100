import events, { EventEmitter } from 'events';

export default class Emit {
    public static Emitter: EventEmitter = new events.EventEmitter();
}