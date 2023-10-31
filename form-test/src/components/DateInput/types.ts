import { FunctionComponent } from "react";

export type TDateInputProps = {
  label: string;

  error?: boolean | undefined;
  message?: string | undefined;

  onChange: (value: string | null) => void;
  value: string | null;
};

export type TDateInput = FunctionComponent<TDateInputProps>;