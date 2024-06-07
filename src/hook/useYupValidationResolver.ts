import {ObjectSchema, ValidationError} from 'yup';

export const useYupValidationResolver =
  <T extends object>(validationSchema: ObjectSchema<T>) =>
  async (data: T) => {
    try {
      const values = await validationSchema.validate(data, {
        abortEarly: false,
      });

      return {
        values,
        errors: {},
      };
    } catch (err) {
      const errors = err as ValidationError;
      return {
        values: {},
        errors: errors.inner.reduce(
          (allErrors, currentError) => ({
            ...allErrors,
            [`${currentError.path}`]: {
              type: currentError.type ?? 'validation',
              message: currentError.message,
            },
          }),
          {},
        ),
      };
    }
  };
