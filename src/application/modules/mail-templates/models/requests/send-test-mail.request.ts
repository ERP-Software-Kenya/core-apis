import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class SendTestMailRequest {
  @ApiProperty({ example: 'user@example.com', description: 'Recipient email address' })
  @IsEmail()
  @IsNotEmpty()
  public to: string;

  @ApiProperty({ example: 'Test Subject', description: 'Email subject' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  public subject: string;

  @ApiProperty({ example: 'bill-receipt', description: 'Template slug from the email_templates table' })
  @IsNotEmpty()
  @IsString()
  public templateSlug: string;

  @ApiPropertyOptional({
    description: 'Context variables to inject into the template',
    example: { billNumber: 'BILL-001', customerName: 'John Doe', totalAmount: '₹1,500.00' },
  })
  @IsOptional()
  public context?: Record<string, unknown>;
}
