import React from "react";

import s from "./style.module.css";

const DefaultHeader = () => {
  return (
    <header className={s["header"]}>
      <img src="images//LogoText.png" alt="Logo" className={s["logo"]} />
    </header>
  );
};

export default DefaultHeader;
