import { applyDecorators } from '@nestjs/common';
import * as responses from '../common/index';

export const CreatedResponse = () => {
  return applyDecorators(
    responses.CreatedResponse(),
    responses.NotFoundResponse(),
    responses.InternalServerErrorResponse(),
    responses.BadRequestResponse(),
  );
};
