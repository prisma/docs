import PropTypes from 'prop-types'
import React from 'react'

const HTML = (props: any) => {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        {/* Kapa.ai script */}
        <script
          defer
          src="https://widget.kapa.ai/kapa-widget.bundle.js"
          data-website-id="1b51bb03-43cc-4ef4-95f1-93288a91b560"
          data-project-name="Prisma"
          data-project-color="#2D3748"
          data-project-logo="https://www.prisma.io/docs/ai_logo.png"
          data-button-text="Ask AI"
          data-modal-example-questions="How can I setup relations in my schema file?,What is the difference between the 'migrate dev' and 'db push' commands?,Which cache strategy should I use for my query with Prisma Accelerate?,How can I subscribe to database events with Prisma Pulse?"
          data-button-image="https://www.prisma.io/docs/ai_button.svg"
          data-button-text-color="#71E8DF"
          data-button-bg-color="#2D3748"
          data-button-border="2px"
          data-button-border-color="#71e8df"
          data-button-border-style="solid"
          data-button-box-shadow="drop-shadow(0px 0.724px 1.251px rgba(14, 18, 28, 0.02)) drop-shadow(0px 1.608px 2.909px rgba(14, 18, 28, 0.04)) drop-shadow(0px 2.793px 5.225px rgba(14, 18, 28, 0.06)) drop-shadow(0px 4.55px 8.671px rgba(14, 18, 28, 0.07)) drop-shadow(0px 7.485px 14.285px rgba(14, 18, 28, 0.08)) drop-shadow(0px 13.358px 24.966px rgba(14, 18, 28, 0.09)) drop-shadow(0px 33px 54px rgba(14, 18, 28, 0.07))"
        ></script>

        {/* OneTrust Cookies Consent Notice start for prisma.io  */}
        <script
          src="https://cdn.cookielaw.org/scripttemplates/otSDKStub.js"
          data-document-language="true"
          type="text/javascript"
          charSet="UTF-8"
          data-domain-script="22c2e2c0-3df0-4958-8672-1194370ee230"
        />
        <script type="text/javascript">function OptanonWrapper() {}</script>
        {/* OneTrust Cookies Consent Notice end for prisma.io */}
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        {props.headComponents}
      </head>
      <body className="dark" {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}

export default HTML
