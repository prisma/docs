import PropTypes from 'prop-types'
import React from 'react'

const HTML = (props: any) => {
  return (
    <html {...props.htmlAttributes}>
      <head>{props.headComponents}</head>
      <body className="dark" {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div key={`body`} id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}

        {/* Start of Reo Javascript */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html:
              '!function(){var e,t,n;e="dea12ffb2578f27",t=function(){Reo.init({ clientID: "dea12ffb2578f27" })},(n=document.createElement("script")).src="https://static.reo.dev/"+e+"/reo.js",n.async=!0,n.onload=t,document.head.appendChild(n)}();',
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
