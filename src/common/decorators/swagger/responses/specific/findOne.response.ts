import { applyDecorators } from '@nestjs/common';
import * as responses from '../common/index';

export const FindOneResponse = () => {
  return applyDecorators(
    responses.SuccessResponse(),
    responses.BadRequestResponse(),
    responses.NotFoundResponse(),
    responses.InternalServerErrorResponse(),
  );
};
