import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { Button } from '../button'
import { Icon } from '../Icon'
import config from '../../../config'

namespace S {
  export const Container = styled.div<{ error?: boolean }>`
    form {
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-bottom: 48px;
      @media only screen and (min-width: 768px) {
        flex-direction: row;
        margin-bottom: 0;
      }
    }
    .input-name {
      margin-bottom: 24px;
      width: 100%;
      @media only screen and (min-width: 768px) {
        max-width: 264px;
        width: auto;
      }
    }
    .input-email {
      margin-bottom: 32px;
      width: 100%;
      @media only screen and (min-width: 768px) {
        width: auto;
        max-width: 312px;
      }
    }
    .input-name,
    .input-email {
      position: relative;
      width: 100%;
      .leading-icon {
        left: 24px;
        color: ${(props) => props.theme.colors.blueGray[600]};
        display: none;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        @media only screen and (min-width: 360px) {
          display: flex;
        }
      }
      @media only screen and (min-width: 768px) {
        margin-right: 24px;
        margin-bottom: 0;
        width: auto;
      }
    }
    .input-el {
      box-sizing: border-box;
      width: 100%;
      line-height: ${(props) => props.theme.fontSizes[20]};
      font-size: 18px;
      height: 48px;
      border: none;
      border-radius: 10px;
      border: 1px solid ${(props) => props.theme.colors.gray[300]};
      outline: ${(props) => (props.error ? `1px solid ${props.theme.colors.red[700]}` : 0)};
      padding: 12px 25px 12px 58px;

      &:focus {
        outline: 1px solid
          ${(props) =>
            props.error ? props.theme.colors.red[700] : props.theme.colors.blueGray[800]};
      }

      &::placeholder {
        color: ${(props) => props.theme.colors.gray[600]};
      }
    }
    button {
      content: 'Subscribe for updates';
      max-height: 48px;
      white-space: nowrap;
      width: 100%;
      @media only screen and (min-width: 768px) {
        width: max-content;
      }
      .button {
        background-color: transparent;
        background-image: none;
        color: inherit;
        cursor: pointer;
        font-weight: inherit;
        line-height: inherit;
        font-size: 100%;
        margin: 0;
        padding: 0;
        border: 0;
      }
    }
  `
}

const icon = (name: string) => <Icon size="1.125rem" color="currentColor" icon={name} />
type ColorType = 'indigo' | 'teal' | 'white' | undefined

type FooterNewsletterFormProps = {
  theme?: any
  color?: ColorType
}

export const FooterNewsletterForm = ({ theme, color = 'indigo' }: FooterNewsletterFormProps) => {
  const [email, setEmail] = useState<string>('')
  const [submitted, setSubmitted] = useState<boolean>(false)
  const mailchimpForm = useRef(null)

  const setFormSubmitted = (event: any) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'api-key': process.env.GATSBY_BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          EMAIL: email,
          SOURCE: 'website',
        },
        includeListIds: [15],
        templateId: 36,
        redirectionUrl: 'https://prisma.io',
      }),
    }
    //@ts-ignore
    fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', options)

    setTimeout(() => {
      setEmail('')
      setSubmitted(true)
    }, 200)
  }

  return (
    <S.Container theme={theme}>
      <form target="hiddenFrame" ref={mailchimpForm} onSubmit={setFormSubmitted}>
        <label className="input-email" htmlFor="MERGE0">
          <div className="leading-icon">{icon('fa-light fa-envelope')}</div>
          <input
            type="email"
            className="input-el"
            name="EMAIL"
            id="MERGE0"
            value={email}
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            autoCapitalize="off"
            autoCorrect="off"
          />
        </label>
        <Button type="primary" color={color === 'white' ? 'indigo' : color}>
          <input
            type="submit"
            value={submitted ? 'Thank you!' : 'Subscribe for updates'}
            name="subscribe"
            id="mc-embedded-subscribe"
            className="button"
          />
        </Button>
      </form>
      <iframe name="hiddenFrame" src="about:blank" style={{ display: 'none' }}></iframe>
    </S.Container>
  )
}
