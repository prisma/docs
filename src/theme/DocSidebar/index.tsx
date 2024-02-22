import React, { useEffect } from 'react';
import DocSidebar from '@theme-original/DocSidebar';

export default function DocSidebarWrapper(props: any) {
  useEffect(() => {
    console.log(props.path.split("/")[1].replace("-", " "))
  }, [props])
  return (
    <>
      <DocSidebar {...props} />
    </>
  );
}
