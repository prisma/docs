import React from 'react';
import Translate from '@docusaurus/Translate';
import { ThemeClassNames } from '@docusaurus/theme-common';
import Link from '@docusaurus/Link';
import IconEdit from '@theme/Icon/Edit';
import type { Props } from '@theme/EditThisPage';

export default function EditThisPage({ editUrl }: Props): JSX.Element {
  return (
    <Link to={editUrl} className={`${ThemeClassNames.common.editThisPage} edit-git`}>
      <IconEdit />
      <Translate
        id="theme.common.editThisPage"
        description="The link label to edit the current page">
        Edit this page on GitHub
      </Translate>
    </Link>
  );
}
