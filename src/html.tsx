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
          src="https://widget.kapa.ai/kapa-widget-v1.1.0.bundle.js"
          data-website-id="1b51bb03-43cc-4ef4-95f1-93288a91b560"
          data-project-name="Prisma"
          data-project-color="#2D3748"
          data-project-logo="https://www.prisma.io/docs/ai_logo.png"
          data-button-text="Ask AI"
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

        {/* Start of Reo Javascript */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: '!function(){var e,t,n;e="dea12ffb2578f27",t=function(){Reo.init({ clientID: "dea12ffb2578f27" })},(n=document.createElement("script")).src="https://static.reo.dev/"+e+"/reo.js",n.async=!0,n.onload=t,document.head.appendChild(n)}();',
          }}
        ></script>
        {/* End of Reo Javascript */}
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
