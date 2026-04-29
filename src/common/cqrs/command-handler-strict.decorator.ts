import 'reflect-metadata';
import { CommandBase } from './command-base';

export const COMMAND_METADATA         = '__command__';
export const COMMAND_HANDLER_METADATA = '__commandHandler__';

let _seq = 0;
const nextId = () => `cqrs_${++_seq}`;

/**
 * Drop-in replacement for @nestjs/cqrs `@CommandHandler` that works
 * with our local `CommandBase` subclasses.
 */
export const CommandHandlerStrict = (command: new (...args: any[]) => CommandBase): ClassDecorator => {
  return (target: object) => {
    if (!Reflect.hasOwnMetadata(COMMAND_METADATA, command)) {
      Reflect.defineMetadata(COMMAND_METADATA, { id: nextId() }, command);
    }
    Reflect.defineMetadata(COMMAND_HANDLER_METADATA, command, target);
  };
};
