import { applyDecorators } from '@nestjs/common';
import * as responses from '../common/index';

export const DeletedResponse = () => {
  return applyDecorators(
    responses.InternalServerErrorResponse(),
    responses.DeletedResponse(),
    responses.BadRequestResponse(),
    responses.NotFoundResponse(),
  );
};
