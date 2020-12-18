import React, { useState, useCallback, ChangeEvent, MouseEvent } from 'react'
import styled from 'styled-components'
import Up from '../icons/Up'
import Down from '../icons/Down'
import Link from './link'
import config from '../../config'
import { ButtonWrapper } from './customMdx/button'
import Twitter from '../icons/Twitter'
import { useLocation } from '@reach/router'

const sentiments: any = {
  unhappy: 'Unhappy',
  happy: 'Happy',
}

const twitterShareUrl = `https://twitter.com/intent/tweet?text=I%27ve%20found%20this%20%40prisma%20docs%20page%20helpful%21%20`

const PageBottom = ({ editDocsPath }: any) => {
  const [submittedFeedback, setSubmittedFeedback] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [feedbackId, setFeedbackId] = useState(null)
  const [submittedSentiment, setSubmittedSentiment] = useState(false)
  const [sentiment, setSentiment] = useState(sentiments['happy'])

  let location = useLocation()
  const pageUrl = location ? location.pathname : '/'
  const currentDocsPageURL = encodeURIComponent(location ? location.href : '/')

  // Send the initial sentiment
  const sendSentiment = useCallback(async () => {
    const createdSetiment = await fetch(config.feedback.sentimentUrl, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ pageUrl, sentiment }),
    }).then(response => response.json())

    setFeedbackId(createdSetiment.id)
    setSubmittedSentiment(true)
  }, [pageUrl, sentiment])

  // Optional callback to add textual feedback
  const sendFeedback = async (e) => {
    e.preventDefault()
    await fetch(config.feedback.feedbackUrl, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ id: feedbackId, feedback }),
    })
    setSubmittedFeedback(true)
  }

  const handleFeedbackChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value)
  }, [])

  const handleSentiment = (e: MouseEvent<HTMLButtonElement>) => {
    const selectedSentiment = e.currentTarget.id
    setSentiment(sentiments[selectedSentiment])
    sendSentiment()
  }

  return (
    <PageBottomWrapper>
      {!submittedSentiment ? (
        <Feedback>
          <h4>Was this helpful?</h4>
          <div className="sentiments">
            <button id="happy" onClick={handleSentiment}>
              <Up />
            </button>
            <button id="unhappy" onClick={handleSentiment}>
              <Down />
            </button>
          </div>
        </Feedback>
      ) : (
        <Wrapper>
          <Content>
            {submittedFeedback ? (
              <>
                <Button
                  color="dark"
                  type="primary"
                  href={`${twitterShareUrl}${currentDocsPageURL}`}
                >
                  <Twitter /> Share the Prisma docs on Twitter
                </Button>
              </>
            ) : (
              <FeedbackForm>
                <Title>Any other feedback?</Title>
                <form>
                  <input
                    type="text"
                    name="feedback"
                    onChange={handleFeedbackChange}
                    value={feedback}
                  />
                  <button onClick={sendFeedback} type="submit"><Arrow /></button>
                </form>
              </FeedbackForm>
            )}
          </Content>
        </Wrapper>
      )}
      {editDocsPath && (
        <Link className="edit-git" to={`${editDocsPath}`}>
          Edit this page on GitHub
        </Link>
      )}
    </PageBottomWrapper>
  )
}

export default PageBottom

const PageBottomWrapper = styled.div`
  display: flex;
  font-size: ${p => p.theme.fontSizes[14]};
  flex-direction: row;
  justify-content: space-between;
  padding: ${p => p.theme.space[16]} ${p => p.theme.space[40]};
  align-items: center;
  button svg {
    cursor: pointer;
    transition: width 2s linear 1s;
  }
  .edit-git,
  .message {
    color: ${p => p.theme.colors.gray600} !important;
  }

  button {
    color: ${p => p.theme.colors.white} !important;
  }
  @media (min-width: 0px) and (max-width: ${p => p.theme.breakpoints.tablet}) {
    padding: ${p => p.theme.space[16]};
    flex-direction: column;
    align-items: flex-start;
    .edit-git {
      order: 1;
    }
  }
`

const Feedback = styled.div`
  h4 {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: ${p => p.theme.colors.gray500} !important;
  }
  .sentiments {
    button {
      background: transparent;
      border: 0;
      &:hover svg {
        border-radius: 50%;
        background: rgba(204, 217, 223, 0.5);
      }
    }
  }
  @media (min-width: 0px) and (max-width: 767px) {
    order: 2;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: flex-start;
  cursor: default;
`

const Content = styled.div`
  flex: 1;
`

const Title = styled.div`
  margin: 0 0 16px 0 !important;
  font-weight: 600;
  font-size: ${p => p.theme.fontSizes[16]};
`
const P = styled.p`
  color: ${p => p.theme.colors.gray500} !important;
  margin-top: 0;
`

const Button = styled(ButtonWrapper)`
  display: inline-flex !important;
  overflow: hidden;
  svg {
    margin-right: 10px;
    path {
      stroke: ${p => p.theme.colors.white};
    }
  }
  background: ${p => p.theme.colors.green}
  @media (min-width: 0px) and (max-width: 767px) {
    font-size: ${p => p.theme.fontSizes[12]};
    text-transform: none;
    svg {
      width: 14px;
    }
  }
`

const FeedbackForm = styled.div`
  position: relative;
  margin-top: ${p => p.theme.space[24]};
  display: flex;
  align-items: center;
  input {
    background: ${p => p.theme.colors.white};
    box-shadow: 0px 4px 8px rgba(60, 45, 111, 0.1), 0px 1px 3px rgba(60, 45, 111, 0.15);
    border-radius: ${p => p.theme.radii.small};
    width: 100%;
    border: 0;
    padding: ${p => p.theme.space[12]} 20px;
    font-size: 100%;
    font-family: Open Sans;
    font-weight: normal;

    &::placeholder {
      color: ${p => p.theme.colors.gray500};
    }
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
      fill: ${p => p.theme.colors.green500};
    }
    path {
      transition: 0.2s stroke ease;
      stroke: ${p => p.theme.colors.white};
    }
    &[disabled] {
      cursor: default;

      circle {
        fill: ${p => p.theme.colors.gray300};
      }
      path {
        stroke: ${p => p.theme.colors.gray600};
      }
    }
  }
`

const Arrow = (props: any) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="16" cy="16" r="16" fill="#E2E8F0" />
    <path
      d="M8 15.5H21.5M18 11L23 15.5L18 20"
      stroke="#718096"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
