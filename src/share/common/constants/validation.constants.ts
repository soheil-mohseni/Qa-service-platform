export class ValidationConstraints {
    static readonly maxIntegerValue = 2147483646;
    static readonly pageLimit = 50;
    static readonly passwordPattern =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  }
  
  export const DateValidation = RegExp(
    /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}|^\d{4}\/\d{2}\/\d{2})$/,
  );
  