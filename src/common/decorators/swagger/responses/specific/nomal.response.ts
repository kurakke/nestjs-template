import { applyDecorators } from '@nestjs/common';
import * as responses from '../common/index';

export const NomalResponse = () => {
  return applyDecorators(
    responses.SuccessResponse(),
    responses.NotFoundResponse(),
    responses.InternalServerErrorResponse(),
  );
};
