import { Injectable } from "@nestjs/common";
import { PinoLogger, InjectPinoLogger } from "nestjs-pino";
import { BaseRedisService } from "./base-redis.service";
import { IBaseRedisService } from "./i-base-redis.service";
import { RedisOptions } from "./options";

@Injectable()
export class RedisService extends BaseRedisService implements IBaseRedisService {
  constructor(options: RedisOptions, @InjectPinoLogger(RedisService.name) logger: PinoLogger) {
    super(options, logger);
  }
}
