import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { BillsController } from './bills.controller';
import { BillCommandHandlers } from './commands';
import { BillQueryHandlers } from './queries';
import { BillProfile } from './mapper/bill.profile';
import { BillFeatureOptions } from './options/bill-feature.options';
import { BillFilterNormalizer } from './helpers/bill-filter.normalizer';

@Module({
  imports:     [CqrsModule],
  controllers: [BillsController],
  providers:   [
    ...BillCommandHandlers,
    ...BillQueryHandlers,
    BillProfile,
    BillFeatureOptions,
    BillFilterNormalizer,
  ],
})
export class BillsModule {}
