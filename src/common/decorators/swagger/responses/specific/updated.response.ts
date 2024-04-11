import { applyDecorators } from '@nestjs/common';
import * as responses from '../common/index';

export const UpdatedResponse = () => {
  return applyDecorators(
    responses.InternalServerErrorResponse(),
    responses.UpdatedResponse(),
    responses.BadRequestResponse(),
    responses.NotFoundResponse(),
  );
};
