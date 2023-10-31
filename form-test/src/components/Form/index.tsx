import React, { memo, useCallback, useEffect, useState } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { getEmptyData, validateState } from "./utils";
import { TChangeHandler, TForm, TState, TSubmit } from "./types";
import { DEFAULT_ERROR_MESSAGE } from "./constants";

import NameInput from "../NameInput";
import MailInput from "../EMailInput";
import PhoneInput from "../PhoneInput";
import DateInput from "../DateInput";
import TextArea from "../TextArea";
import Spinner from "../Spinner";

import usePost from "../../hooks/usePost";
import { REQUEST_ERROR, Status } from "../../shared/constants";
import useValidate from "../../hooks/useValidate";
import { ValidatorField } from "../../hooks/useValidate/constants";

const Form: TForm = () => {
  const [state, setState] = useState<TState>(getEmptyData());
  const [showError, setShowError] = useState<boolean>(false);

  // TODO: create general hook
  const nameErrors = useValidate(ValidatorField.Name, state.name);
  const emailErrors = useValidate(ValidatorField.EMail, state.email);
  const phoneErrors = useValidate(ValidatorField.Phone, state.phone);
  const dateErrors = useValidate(ValidatorField.Date, state.date);
  const textErrors = useValidate(ValidatorField.Text, state.text);

  const { post, status, setStatus } = usePost();

  const changeHandler: TChangeHandler = useCallback(
    (field, value) => {
      if (status !== Status.pending) {
        setStatus(Status.pending);
      }

      setState((oldState) => {
        return { ...oldState, [field]: value };
      });
    },
    [setState, status]
  );

  const checkValidation = () => {
    return (
      validateState(state) &&
      nameErrors.length === 0 &&
      emailErrors.length === 0 &&
      phoneErrors.length === 0 &&
      dateErrors.length === 0 &&
      textErrors.length === 0
    );
  };

  const submit: TSubmit = useCallback(async () => {
    setStatus(Status.pending);

    if (!checkValidation()) {
      setShowError(true);

      return;
    }

    await post(state);

    setShowError(false);
  }, [state, post, checkValidation]);

  /*
    Clear Form
   */
  useEffect(() => {
    if (status === Status.success) {
      setState(getEmptyData());
    }
  }, [status, setState]);

  /*
    Unlock btn if it was locked and now all fields filled
   */
  useEffect(() => {
    if (showError && checkValidation()) {
      setShowError(false);
    }
  }, [showError, state]);

  const { email, name, text, phone, date } = state;

  const isDisabled =
    (showError && !checkValidation()) || status === Status.loading;

  const needMessage: boolean =
    status !== Status.pending && status !== Status.loading;

  const btnClasses = classNames(styles.btn, isDisabled && styles.btn__disabled);
  const messageClasses = classNames(
    styles.message,
    status === Status.error && styles.message__error,
    status === Status.success && styles.message__success
  );

  // TODO: need minimize
  const nameError =
    (name === null || name.length === 0 || nameErrors.length !== 0) &&
    showError;
  const emailError =
    (email === null || email.length === 0 || emailErrors.length !== 0) &&
    showError;
  const phoneError =
    (phone === null || phone.length === 0 || phoneErrors.length !== 0) &&
    showError;
  const dateError =
    (date === null || date.length === 0 || dateErrors.length !== 0) &&
    showError;
  const textError =
    (text === null || text.length === 0 || textErrors.length !== 0) &&
    showError;

  return status === Status.loading ? (
    <Spinner />
  ) : (
    <div className={styles.container}>
      <div className={styles.title}>Registration</div>
      <NameInput
        error={nameError}
        message={nameError ? DEFAULT_ERROR_MESSAGE : undefined}
        value={name}
        onChange={(value) => changeHandler("name", value)}
        label={"Name & Surname"}
      />
      <MailInput
        error={emailError}
        message={emailError ? DEFAULT_ERROR_MESSAGE : undefined}
        value={email}
        onChange={(value) => changeHandler("email", value)}
        label={"Email"}
      />
      <PhoneInput
        error={phoneError}
        message={phoneError ? DEFAULT_ERROR_MESSAGE : undefined}
        value={phone}
        onChange={(value) => changeHandler("phone", value)}
        label={"Phone"}
      />
      <DateInput
        error={dateError}
        message={dateError ? DEFAULT_ERROR_MESSAGE : undefined}
        value={date}
        onChange={(value) => changeHandler("date", value)}
        label={"Birthday"}
      />
      <TextArea
        error={textError}
        message={textError ? DEFAULT_ERROR_MESSAGE : undefined}
        value={text}
        onChange={(value) => changeHandler("text", value)}
        label={"Message"}
      />
      <div className={styles.btnContainer}>
        <button disabled={isDisabled} className={btnClasses} onClick={submit}>
          Send
        </button>
      </div>

      {needMessage && (
        <div className={messageClasses}>{REQUEST_ERROR[status]}</div>
      )}
    </div>
  );
};

export default memo(Form);