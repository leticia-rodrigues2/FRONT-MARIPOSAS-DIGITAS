import React from "react";

import s from "./style.module.css";

const DefaultHeader = () => {
  return (
    <header className={s["header"]}>
      <a href="/">
        <img src="images//LogoText.png" alt="Logo" className={s["logo"]} />
      </a>
    </header>
  );
};

export default DefaultHeader;
