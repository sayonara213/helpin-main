import { FieldErrors, FieldValues } from 'react-hook-form';

export const getValidationLocalization = <T extends FieldValues>(
  t: (key: string, values?: { [key: string]: any }) => string,
  errors: FieldErrors<T>,
): { [P in keyof T]?: string } => {
  const errorMessages = Object.keys(errors).reduce((acc, key) => {
    console.log();

    const error: any = errors[key];
    let message = '';

    if (error) {
      if (typeof error.message === 'string') {
        message = t(error.message); // Simple string message
      } else if (error.message && typeof error.message === 'object') {
        message = t(error.message.key, error.message.values); // Object with key and values for interpolation
      }
    }

    return {
      ...acc,
      [key]: message,
    };
  }, {});

  return errorMessages;
};
