import { TValidatorSet } from "./types";
import {
  dateValidator,
  emailValidator,
  nameValidator,
  phoneValidator,
  textValidator,
} from "./utils";

// EMail
export const EMAIL_REG: RegExp = new RegExp(
  "^\\w+([\\w-]?\\w+)*@\\w+([\\w-]?\\w+)*(\\.\\w{2,3})+$"
);

export enum EMailError {
  Incorrect = "Incorrect email. Example box@domain.region",
}

// Name
export const MIN_NAME_LENGTH: number = 3;
export const MAX_NAME_LENGTH: number = 30;
export const DOUBLE_WORD_REG = new RegExp("^[\\w]+[ ][\\w]+$");

export enum NameError {
  WordCount = "Enter first and last name separated by a space",
  FirstNameMinLength = "Min first name length is 3",
  FirstNameMaxLength = "Max first name length is 30",
  LastNameMinLength = "Min last name length is 3",
  LastNameMaxLength = "Max last name length is 30",
}

// Date
export enum DateError {
  DateLaterToday = "Date of birth can't be later than today",
}

// Phone
export const PHONE_REG: RegExp = new RegExp("^[7|8][0-9]{0,10}$");
export const PHONE_PATTERN: string = "+_ (___) ___-__-__";
export const PHONE_CHARACTER_COUNT: number =
  PHONE_PATTERN.split("_").length - 1;

export enum PhoneError {
  Code = "Allowable codes: +7 and +8",
  Length = "You must complete the field",
}

// Text
export const MIN_TEXT_LENGTH: number = 10;
export const MAX_TEXT_LENGTH: number = 300;

export enum TextError {
  MIN_LENGTH = "Min text length is 10.",
  MAX_LENGTH = "Max text length is 300.",
}

// Shared
export enum ValidatorField {
  Date = "date",
  EMail = "email",
  Name = "name",
  Phone = "phone",
  Text = "text",
}

export const validatorMap: TValidatorSet = {
  [ValidatorField.Date]: dateValidator,
  [ValidatorField.EMail]: emailValidator,
  [ValidatorField.Name]: nameValidator,
  [ValidatorField.Phone]: phoneValidator,
  [ValidatorField.Text]: textValidator,
};