import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TaxesController } from './taxes.controller';
import { TaxProfile } from './mapper';
import { TaxCommandHandlers } from './commands';
import { TaxQueryHandlers } from './queries';

@Module({
  imports: [CqrsModule],
  controllers: [TaxesController],
  providers: [...TaxCommandHandlers, ...TaxQueryHandlers, TaxProfile],
  exports: [],
})
export class TaxesModule {}
