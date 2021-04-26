import * as React from 'react'
import styled from 'styled-components'
import Email from '../../icons/Email'
import ArrowEmail from '../../icons/ArrowEmail'
import * as valid from './valid'
import sendToMailchimp from './mailChimp'

const NewsLetterWrapper = styled.div`
  h4 {
    margin: 0;
    line-height: ${(p) => p.theme.space[48]};
    font-weight: bold;
    letter-spacing: 0.1em;
  }
  .email {
    position: relative;
    margin-top: ${(p) => p.theme.space[24]};
    display: flex;
    align-items: center;
    label {
      display: none;
    }
    input {
      background: ${(p) => p.theme.colors.white};
      box-shadow: 0px 4px 8px rgba(60, 45, 111, 0.1), 0px 1px 3px rgba(60, 45, 111, 0.15);
      border-radius: ${(p) => p.theme.radii.small};
      width: 100%;
      border: 0;
      padding: ${(p) => p.theme.space[24]} 60px;
      font-size: 100%;
      font-family: Inter;
      font-weight: normal;

      &::placeholder {
        color: ${(p) => p.theme.colors.gray500};
      }
    }
    .email-icon {
      position: absolute;
      left: 24px;
    }
    button {
      outline: 0;
      position: absolute;
      right: 24px;
      border: 0;
      background: transparent;
      padding: 0;
      width: 32px;
      height: 32px;
      circle {
        transition: 0.2s fill ease;
        fill: ${(p) => p.theme.colors.green500};
      }
      path {
        transition: 0.2s stroke ease;
        stroke: ${(p) => p.theme.colors.white};
      }
      &[disabled] {
        cursor: default;

        circle {
          fill: ${(p) => p.theme.colors.gray300};
        }
        path {
          stroke: ${(p) => p.theme.colors.gray600};
        }
      }
    }
  }
`

const Newsletter = ({ newsletter }: any) => {
  const [submitted, setSubmitted] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const [validEmail, setValidEmail] = React.useState(false)

  const validate = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target
    if (!(target instanceof HTMLInputElement)) {
      return
    }
    const email = valid.email(target.value)
    if (email instanceof Error) {
      setEmail(target.value.toLowerCase())
      setValidEmail(false)
      return
    }
    setEmail(email)
    setValidEmail(true)
  }

  const submitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await sendToMailchimp(email)
    setEmail('')
    setValidEmail(false)
    setSubmitted(true)
  }

  return (
    <NewsLetterWrapper>
      <form className="email" onSubmit={submitEmail}>
        <Email className="email-icon" />
        <label htmlFor="email">Email</label>
        <input
          name="email"
          id="email"
          type="text"
          placeholder={submitted ? 'Thank you!' : 'your@email.com'}
          value={email}
          onChange={validate}
          disabled={submitted}
        />
        <button disabled={submitted || !validEmail} type="submit">
          <ArrowEmail />
        </button>
      </form>
    </NewsLetterWrapper>
  )
}

export default Newsletter
