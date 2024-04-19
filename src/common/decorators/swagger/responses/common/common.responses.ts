import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export const SuccessResponse = () => {
  return applyDecorators(
    ApiResponse({ status: 200, description: 'The found record' }),
  );
};

export const NotFoundResponse = () => {
  return applyDecorators(
    ApiResponse({ status: 404, description: 'Record not found' }),
  );
};

export const BadRequestResponse = () => {
  return applyDecorators(
    ApiResponse({ status: 400, description: 'Bad Request' }),
  );
};

export const InternalServerErrorResponse = () => {
  return applyDecorators(
    ApiResponse({ status: 500, description: 'Internal Server Error' }),
  );
};

export const CreatedResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description: 'The record has been successfully created',
    }),
  );
};

export const DeletedResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'The record has been successfully deleted',
    }),
  );
};

export const UpdatedResponse = () => {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description: 'The record has been successfully updated',
    }),
  );
};
