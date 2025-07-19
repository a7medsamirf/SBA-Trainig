import React from "react";
import "./page.scss";
import { ForgotPasswordForm } from "./components";

export default function page() {
  return (
    <section className="forget-password-bg min-vh-100">
      <div className="gap-4 d-flex flex-column forgot-password-container">
        <ForgotPasswordForm />
      </div>
    </section>
  );
}
