import React, { memo } from "react";

import styles from "./styles.module.scss";
import { TApp } from "./types";

import Form from "../Form";

const App: TApp = () => {
  return (
    <div className={styles.container}>
      <Form />
    </div>
  );
};

export default memo(App);