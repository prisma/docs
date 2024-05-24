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

  const setFormSubmitted = async (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior if this is attached to a form

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
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

    try {
      const response = await fetch("https://prisma.io/api/newsletter", options);
      if (!response.ok) {
        throw new Error("Failed to submit the form");
      }
      setEmail("");
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
