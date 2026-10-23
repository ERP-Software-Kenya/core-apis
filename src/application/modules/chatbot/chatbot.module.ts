import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ChatbotController } from './chatbot.controller';
import { ChatbotCommandHandlers } from './commands';
import { ChatbotQueryHandlers } from './queries';
import { DbToolsService } from './db-tools';

@Module({
  imports: [CqrsModule],
  controllers: [ChatbotController],
  providers: [...ChatbotCommandHandlers, ...ChatbotQueryHandlers, DbToolsService],
})
export class ChatbotModule {}
