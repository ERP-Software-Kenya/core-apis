import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { AuthenticatedUser, ClerkAuthGuard, CqrsMediator, CurrentUser, RolesGuard } from '../../../common';
import { SeedKnowledgeCommand } from './commands/seed-knowledge';
import { ChatAnswer } from './domain';
import { AskQuestionRequest, ChatAnswerResponse } from './models';
import { AskQuestionQuery } from './queries/ask-question';

@ApiBearerAuth()
@ApiTags('Chatbot')
@UseGuards(ClerkAuthGuard, RolesGuard)
@Controller({ path: 'chatbot', version: '1' })
export class ChatbotController {
  public constructor(
    protected readonly mediator: CqrsMediator,
    @InjectPinoLogger(ChatbotController.name) protected readonly logger: PinoLogger,
  ) {}

  @ApiOperation({ summary: 'Ask the ERP assistant a question' })
  @ApiOkResponse({ type: ChatAnswerResponse })
  @HttpCode(HttpStatus.OK)
  @Post('ask')
  public async ask(
    @Body() body: AskQuestionRequest,
    @CurrentUser() user: AuthenticatedUser,
  ): Promise<ChatAnswerResponse> {
    const query = new AskQuestionQuery();
    query.question = body.question;
    query.organizationId = user.organizationId;
    const result = await this.mediator.execute<AskQuestionQuery, ChatAnswer>(query);
    const response = new ChatAnswerResponse();
    response.answer = result.answer;
    response.sources = result.sources;
    return response;
  }

  @ApiOperation({ summary: 'Re-seed the chatbot knowledge base from docs/chatbot/ (admin only)' })
  @ApiCreatedResponse({ type: Number, description: 'Number of vectors upserted' })
  @HttpCode(HttpStatus.CREATED)
  @Post('seed')
  public async seed(@CurrentUser() user: AuthenticatedUser): Promise<number> {
    this.logger.info(`Knowledge base seed requested by user ${user.dbUserId}`);
    const command = new SeedKnowledgeCommand();
    command.performedById = user.dbUserId;
    return this.mediator.execute<SeedKnowledgeCommand, number>(command);
  }
}
