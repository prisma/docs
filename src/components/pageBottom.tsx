import * as React from 'react';
import styled from 'styled-components';
import Up from '../icons/Up';
import Down from '../icons/Down';
import Link from './link';
import config from '../../config';
import { ButtonWrapper } from './customMdx/button';
import Twitter from '../icons/Twitter';

const sentiments: any = {
  unhappy: 'Unhappy',
  happy: 'Happy',
};

const gitIssueUrl = `https://github.com/prisma/prisma2-docs/issues/new?labels=kind/docs,content`;
const twitterShareUrl = `https://twitter.com/intent/tweet?text=I%27ve%20found%20this%20%40prisma%20docs%20page%20helpful%21%20`;

const PageBottomWrapper = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: row;
  justify-content: space-between;
  padding: 1rem 40px;
  align-items: center;
  a svg {
    cursor: pointer;
    transition: width 2s linear 1s;
  }
  .edit-git,
  .message {
    color: #718096 !important;
  }

  button {
    color: #ffffff !important;
  }
`;

const Feedback = styled.div`
  h4 {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #a0aec0 !important;
  }
  .sentiments {
    a {
      margin-right: 0.5rem;
      &:hover svg {
        border-radius: 50%;
        background: rgba(204, 217, 223, 0.5);
      }
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-items: flex-start;
  cursor: default;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.div`
  margin: 0 0 16px 0 !important;
  font-weight: 600;
  font-size: 16px;
`;
const P = styled.p`
  color: #a0aec0 !important;
  margin-top: 0;
`;

const Button = styled(ButtonWrapper)`
  display: inline-flex !important;
  svg {
    margin-right: 10px;
    path {
      stroke: #ffffff;
    }
  }
`;

const PageBottom = ({ editDocsPath }: any) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [sentiment, setSentiment] = React.useState(sentiments['happy']);

  let location;
  if (typeof document != 'undefined') {
    location = document.location;
  }
  const pageUrl = location ? location.pathname : '/';
  const currentDocsPageURL = encodeURIComponent(location ? location.href : '/');

  const sendFeedback = async (selectedSentiment: string) => {
    const body = JSON.stringify({ pageUrl, sentiment: sentiments[selectedSentiment] });
    const requestOptions: any = {
      method: 'POST',
      body,
    };
    await fetch(`${config.gatsby.pathPrefix}/.netlify/functions/index`, requestOptions);
  };

  const handleSentiment = (e: any) => {
    const selectedSentiment = e.currentTarget.id;
    sendFeedback(selectedSentiment);
    setSentiment(sentiments[selectedSentiment]);
    setSubmitted(true);
  };

  return (
    <PageBottomWrapper>
      {!submitted ? (
        <Feedback>
          <h4>Was this helpful?</h4>
          <div className="sentiments">
            <a id="happy" onClick={handleSentiment}>
              <Up />
            </a>
            <a id="unhappy" onClick={handleSentiment}>
              <Down />
            </a>
          </div>
        </Feedback>
      ) : (
        <Wrapper>
          <Content>
            <Title>Thank you for your feedback!</Title>
            {sentiment !== 'Happy' ? (
              <>
                <P>
                  We love to hear back from our community.
                  <br />
                  Tell us why on GitHub!
                </P>
                <Button target="_blank" href={gitIssueUrl} type="primary">
                  Tell us On Github
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="dark"
                  type="primary"
                  href={`${twitterShareUrl}${currentDocsPageURL}`}
                >
                  <Twitter /> Share the Prisma docs on Twitter
                </Button>
              </>
            )}
          </Content>
        </Wrapper>
      )}
      {editDocsPath && (
        <Link className="edit-git" to={`${editDocsPath}`}>
          Edit this page on Github
        </Link>
      )}
    </PageBottomWrapper>
  );
};

export default PageBottom;
