import * as React from "react";
import styled from "styled-components";
import Up from "../icons/Up";
import Down from "../icons/Down";

const PageBottomWrapper = styled.div`
  display: flex;
  font-size: 14px;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 40px;
  align-items: center;
  a {
    color: #718096 !important;
  }
`;

const Feedback = styled.div`
  h4 {
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    color: #a0aec0;
  }
  .moods a {
    margin-right: 0.5rem;
  }
`;

const PageBottom = () => (
  <PageBottomWrapper>
    <Feedback>
      <h4>Was this helpful?</h4>
      <div className="moods">
        <a href={"/"}>
          <Down />
        </a>
        <a href={"/"}>
          <Up />
        </a>
      </div>
    </Feedback>
    <a href="/">Edit this page on Github</a>
  </PageBottomWrapper>
);

export default PageBottom;
