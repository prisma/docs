import React from 'react';
import CodeBlock from './code';
import Pre from './pre';
import makeHeading from './headings';

export default {
  h1: () => (<h1 style={{display: 'none'}} />),
  h2: (props: any) => (makeHeading('h2')({...props})),
  h3: (props: any) => (makeHeading('h3')({...props})),
  h4: (props: any) => (makeHeading('h4')({...props})),
  h5: (props: any) => (makeHeading('h5')({...props})),
  h6: (props: any) => (makeHeading('h6')({...props})),
  // h1: (props: any) => (
  //   <h1 className="heading1" id={props.children.replace(/\s+/g, '-').toLowerCase()} {...props} />
  // ),
  // h2: (props: any) => { 
  //   console.log(props)
  //   const text = stringify(props.children);
  //   const id = slug(text);
  //   return(
  //   <h2 className="heading2" id={id} {...props} />
  // )},
  // h3: (props: any) => (
  //   <h3 className="heading3" id={props.children.replace(/\s+/g, '-').toLowerCase()} {...props} />
  // ),
  // h4: (props: any) => (
  //   <h4 className="heading4" id={props.children.replace(/\s+/g, '-').toLowerCase()} {...props} />
  // ),
  // h5: (props: any) => (
  //   <h5 className="heading5" id={props.children.replace(/\s+/g, '-').toLowerCase()} {...props} />
  // ),
  // h6: (props: any) => (
  //   <h6 className="heading6" id={props.children.replace(/\s+/g, '-').toLowerCase()} {...props} />
  // ),
  p: (props: any) => <p className="paragraph" {...props} />,
  ul: (props: any) => <ul className="list" {...props} />,
  CodeBlock,
  pre: Pre,
  // a: AnchorTag,
  // TODO add `img`
  // TODO add `blockquote`
  // TODO add `ul`
  // TODO add `li`
  // TODO add `table`
};
