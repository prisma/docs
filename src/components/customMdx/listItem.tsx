import * as React from 'react'
import styled from 'styled-components'
import listDot from 'images/list-dot.png'

const CustomListBullet = styled.li<{ symbol: string }>`
  ::before {
    margin-right: 8px;
    ${(p) => `content: "${p.symbol}"`};
  }
`

const NormalListBullet = styled.li`
  ::before {
    margin-right: 8px;
    content: url(${listDot});
  }
`

const symbols = ['✓', '×']

const ListItem = ({ children, ...props }: any) =>
  symbols.includes(children[0]) ? (
    <CustomListBullet symbol={children[0]} {...props}>
      &nbsp;{children.slice(1)}
    </CustomListBullet>
  ) : (
    <NormalListBullet {...props}>{children}</NormalListBullet>
  )

export default ListItem
