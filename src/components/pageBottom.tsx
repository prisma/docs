import * as React from 'react';
import styled from 'styled-components';
import Up from '../icons/Up';
import Down from '../icons/Down';
import Link from './link';

const sentiments: any = {
  unhappy: 'Unhappy',
  happy: 'Happy',
};

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
  a,
  .submitted-message {
    color: #718096 !important;
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
    }
  }
`;

const PageBottom = ({ editDocsPath, pageUrl }: any) => {
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const setSentiment = (e: any) => {
    setIsSubmitting(true);
    const body = JSON.stringify({ pageUrl, sentiment: sentiments[e.currentTarget.id] });
    const requestOptions: any = {
      method: 'POST',
      body,
    };

<<<<<<< HEAD
    fetch('/docs/.netlify/functions/index', requestOptions)
=======
    fetch('/.netlify/functions/index', requestOptions)
>>>>>>> 03a9eb2a3ae48b9e6b112c9913dbeef8eb5ee2b8
      .then((response: any) => {
        setIsSubmitting(false);
        return response.text();
      })
      .then(() => {
        setSubmitted(true);
      })
      .catch((error: any) => console.log('error', error));
  };
  return (
    <PageBottomWrapper>
      {!submitted ? (
        <Feedback>
          <h4>Was this helpful?</h4>
          <div className="sentiments">
            <a id="unhappy" onClick={setSentiment}>
              <Down />
            </a>
            <a id="happy" onClick={setSentiment}>
              <Up />
            </a>
          </div>
        </Feedback>
      ) : (
        <>
          {isSubmitting ? (
            <div className="submitted-message">Submitting...</div>
          ) : (
            <div className="submitted-message">Thanks for the feedback!</div>
          )}
        </>
      )}
      {editDocsPath && <Link to={`${editDocsPath}`}>Edit this page on Github</Link>}
    </PageBottomWrapper>
  );
};

export default PageBottom;
