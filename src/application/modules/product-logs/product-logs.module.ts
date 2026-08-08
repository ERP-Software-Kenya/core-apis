import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProductLogsController } from './product-logs.controller';
import { ProductLogQueryHandlers } from './queries';
import { ProductLogProfile } from './mapper';

@Module({
  imports:     [CqrsModule],
  controllers: [ProductLogsController],
  providers:   [
    ...ProductLogQueryHandlers,
    ProductLogProfile,
  ],
})
export class ProductLogsModule {}
