import { body } from 'express-validator';

export const movieCreateValidation = () => {
  return [
    body('title')
      .isString()
      .withMessage('Title must not be empty and a valid string')
      .isLength({min: 5})
      .withMessage('The title should have at least 5 letters!'),

    body('rating')
      .isNumeric()
      .withMessage('Rating must be numeric!')
      .custom((value: number) => {
        if (value < 0 || value > 10) {
          throw new Error('The rating must be between 0 and 10.');
        }
        return true;
      }),
      body('description')
        .isString()
        .withMessage('Description must not be empty'),
      body('director')
        .isString()
        .withMessage('Director must not be empty'),
      body('poster')
        .isURL()
        .withMessage('The image should be a URL'),
  ]
};
