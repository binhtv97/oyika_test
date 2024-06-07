export const REGEX_REQUIRED = /[a-zA-Z0-9-,]+/;
export const REGEX_DIGITS_ONLY = /^[0-9]*$/;
export const REGEX_MIN_MAX_PHONE = /^.{10,11}$/;
export const REGEX_MIN_PASSWORD = /^.{8,}$/;
export const REGEX_VALIDATION_EMAIL = /^\S+@\S+\.\S+$/;

export const REGEX_VALIDATION_PASSWORD =
  /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;

export const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])/;
