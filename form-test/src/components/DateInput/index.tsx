import React, { memo, useCallback, useEffect, useRef, useState } from "react";

import styles from "./styles.module.scss";
import { TDateInput } from "./types";
import { DATE_PLACEHOLDER } from "./constants";

import InputWrapper from "../InputWrapper";

import useValidate from "../../hooks/useValidate";
import { TInputChangeHandler } from "../../shared/types";
import { ValidatorField } from "../../hooks/useValidate/constants";

const DateInput: TDateInput = (props) => {
  const { value, onChange, label, error, message } = props;

  const ref = useRef<HTMLInputElement>(null);
  const [date, setDate] = useState<string | null>(value);
  const errors = useValidate(ValidatorField.Date, date || "");

  const changeHandler: TInputChangeHandler = useCallback(
    (event) => {
      const { value } = event.target;

      onChange(
        value.length === 0 ? null : new Date(value).valueOf().toString()
      );
    },
    [setDate]
  );

  const clickHandler = useCallback(() => {
    const current = ref.current;

    // @ts-ignore
    if (current !== null && typeof current.showPicker === "function") {
      // @ts-ignore
      current.showPicker();
    }
  }, [ref]);

  /*
    Update 'date' if 'value' changes
  */
  useEffect(() => {
    if (value === date) {
      return;
    }

    setDate(value);
  }, [setDate, value, date]);

  const hasWarning = date !== null && errors.length > 0;
  const msg = hasWarning ? errors[0] : message;

  const resultDate =
    date === null ? "" : new Date(Number(date)).toLocaleDateString();

  return (
    <InputWrapper
      message={msg}
      warning={hasWarning}
      error={error}
      label={label}
      render={(classes) => (
        <>
          <input
            className={classes}
            value={resultDate}
            placeholder={DATE_PLACEHOLDER}
            onClick={clickHandler}
            onChange={() => {}}
          />
          <div className={styles.dateInputContainer}>
            <input
              type={"date"}
              ref={ref}
              className={styles.hidden}
              onChange={changeHandler}
            />
          </div>
        </>
      )}
    />
  );
};

export default memo(DateInput);