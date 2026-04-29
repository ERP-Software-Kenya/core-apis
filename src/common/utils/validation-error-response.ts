import { BadRequestException, ValidationError } from "@nestjs/common";

export const ValidationErrorResponse = (validationErrors: ValidationError[]) => {
  const formattedErrors = validationErrors.map((error: any) => {
    return {
      field: error.property, // The field name
      message: Object.values(error.constraints).map(String).join(", "), // Extract error messages
    };
  });

  // Return the custom BadRequestException with the formatted errors
  return new BadRequestException({
    statusCode: 400,
    error: "INVALID_INPUT",
    errors: formattedErrors,
  });
};
