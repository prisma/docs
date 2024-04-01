import * as React from 'react'
import styled from 'styled-components'
// import { Typescript } from '../icons/technologies/Typescript'
import SelectComponent from './select'
// import PostgreSQL from '../icons/technologies/PostgreSQL'
// import MySQL from '../icons/technologies/MySQL'
// import SQLite from '../icons/technologies/SQLite'
// import MongoDB from '../icons/technologies/MongoDB'
// import JS from '../icons/technologies/JS'
// import SQLServer from '../icons/technologies/MSSQL'
// import PlanetScale from '../icons/technologies/PlanetScale'
// import CockroachDB from '../icons/technologies/CockroachDB'
import { components } from 'react-select'
import Link from '@docusaurus/Link'
// import ArrowDown from '../icons/ArrowDown'

interface TechSwitchProps {
  type: string
  onChangeTech: (item: any) => void
  technologies: string[]
  defaultTech: string
  url?: string
  dbSelected?: string
}

interface TechItem {
  technology: keyof typeof icons
}

const icons = {
  node: `/img/technologies/nodejs.svg`, //<JS />,
  typescript: `/img/technologies/typescript.svg`, //<Typescript />,
  mysql: `/img/technologies/mysql.svg`, //<MySQL />,
  postgresql: `/img/technologies/postgresql.svg`, //<PostgreSQL />,
  sqlite: `/img/technologies/sqlite.svg`, //<SQLite />,
  mongodb: `/img/technologies/mongodb.svg`, //<MongoDB />,
  sqlserver: `/img/technologies/sqlserver.svg`, //<SQLServer />,
  planetscale: `/img/technologies/planetscale.svg`, //<PlanetScale />,
  cockroachdb: `/img/technologies/cockroachdb.svg`, //<CockroachDB />,
}

const technologyTypes = {
  languages: ['node', 'typescript'],
  databases: [
    'mysql',
    'postgresql',
    'sqlite',
    'mongodb',
    'sqlserver',
    'planetscale',
    'cockroachdb',
  ],
}

export const technologyNames = {
  node: 'JavaScript',
  typescript: 'TypeScript',
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
  sqlite: 'SQLite',
  mongodb: 'MongoDB',
  sqlserver: 'SQL Server',
  planetscale: 'PlanetScale',
  cockroachdb: 'CockroachDB',
}

const TechnologySwitch = ({ type, onChangeTech, technologies, defaultTech, url, dbSelected }: TechSwitchProps) => {
  const langDefault = { technology: defaultTech || 'typescript' }
  const dbDefault = { technology: defaultTech || 'postgresql' }
  const defaultItem = type === 'lang' ? langDefault : dbDefault

  console
  const [selectedItem, setSelectedItem] = React.useState(defaultItem)

  const renderItem = (item: TechItem) => {
    const href = type === "lang" ? `${url}${item.technology}-${dbSelected}` : `${url}${item.technology}`
    return (
      <SelectItem>
        <Link href={href}>
          <img src={icons[item.technology]} />
          <span>{technologyNames[item.technology]}</span>
        </Link>
      </SelectItem>
    )
  }

  const DropdownIndicator = (props: any) => {
    return (
      <components.DropdownIndicator {...props}>
        {/* <ArrowDown /> */}
      </components.DropdownIndicator>
    )
  }

  const IndicatorSeparator = () => {
    return <span style={{ display: 'none' }} />
  }

  const Option = (props: any) => {
    return (
      <components.Option {...props}>{renderItem({ technology: props.value })}</components.Option>
    )
  }

  const SingleValue = (props: any) => (
    <components.SingleValue {...props}>
      {renderItem({ technology: props.children })}
    </components.SingleValue>
  )

  const handleChange = (item: TechItem) => {
    setSelectedItem(item)
    onChangeTech(item)
  }

  let items =
    type === 'lang'
      ? technologyTypes.languages.map((lang: any) => ({ technology: lang }))
      : technologyTypes.databases.map((db: any) => ({ technology: db }))

  if (technologies) {
    items = items.filter((item: any) => technologies.includes(item.technology))
  }

  return (
    <Container>
      <SelectComponent
        items={items}
        DropdownIndicator={DropdownIndicator}
        IndicatorSeperator={IndicatorSeparator}
        Option={Option}
        SingleValue={SingleValue}
        selectedItem={selectedItem}
        onChange={handleChange}
        width={168}
      />
    </Container>
  )
}

const Container = styled.div`
  margin: 16px 0 0 0;
  width: 198px;
  text-overflow: ellipsis;

  @media only screen and (max-width: 767px) {
    margin: 8px 0 0;
    width: 100%;
  }
  .tech-select__input {
    user-select: none !important;
    caret-color: transparent;
  }
`

const SelectItem = styled.div`
  a {
    display: flex;
    align-items: center;
  
    img {
      margin-right: 10px;
      margin-bottom: 0;
    }
  }
`

export default TechnologySwitch
