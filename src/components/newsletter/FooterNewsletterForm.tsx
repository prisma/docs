import React, { useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Icon } from "../Icon";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

namespace S {}

const icon = (name: string) => <Icon size="1.125rem" color="rgb(113, 128, 150)" icon={name} />;
type ColorType = "indigo" | "teal" | "white" | undefined;

type FooterNewsletterFormProps = {
  theme?: any;
  color?: ColorType;
};

export const FooterNewsletterForm = ({ theme, color = "indigo" }: FooterNewsletterFormProps) => {
  const [email, setEmail] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const mailchimpForm = useRef(null);
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();

  const setFormSubmitted = (event: any) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        // Add API key to cloudfare deployment
        "api-key": customFields.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          EMAIL: email,
          SOURCE: "website",
        },
        includeListIds: [15],
        templateId: 36,
        redirectionUrl: "https://prisma.io",
      }),
    };
    //@ts-ignore
    fetch("https://api.brevo.com/v3/contacts/doubleOptinConfirmation", options);

    setTimeout(() => {
      setEmail("");
      setSubmitted(true);
    }, 200);
  };

  return (
    <div>
      <form
        target="hiddenFrame"
        ref={mailchimpForm}
        className={styles.form}
        onSubmit={setFormSubmitted}
      >
        <label className={styles["input-email"]} htmlFor="MERGE0">
          <div className={styles["leading-icon"]}>{icon("fa-light fa-envelope")}</div>
          <input
            type="email"
            className={styles["input-el"]}
            name="EMAIL"
            id="MERGE0"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </label>
        <button className={styles.formBtn} color={color === "white" ? "indigo" : color}>
          <input
            type="submit"
            value={submitted ? "Thank you!" : "Subscribe for updates"}
            name="subscribe"
            id="mc-embedded-subscribe"
            className={styles.button}
          />
        </button>
      </form>
      <iframe name="hiddenFrame" src="about:blank" style={{ display: "none" }}></iframe>
    </div>
  );
};
