import React, { useState } from "react";
// import Msg_Form from './form/Form';
import Msg_Container from "./Msg_container/Container";

export default function Chat_Main() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsFormSubmitted(true);
  };

  return (
    <section>
      <Msg_Container />
    </section>
  );
}
