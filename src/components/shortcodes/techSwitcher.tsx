import * as React from 'react'
import SelectComponent from './select'
import { components } from 'react-select'
import Link from '@docusaurus/Link'
import styles from "./styles.module.scss"

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
  node: `/docs/img/technologies/nodejs.svg`, //<JS />,
  typescript: `/docs/img/technologies/typescript.svg`, //<Typescript />,
  mysql: `/docs/img/technologies/mysql.svg`, //<MySQL />,
  postgresql: `/docs/img/technologies/postgresql.svg`, //<PostgreSQL />,
  sqlite: `/docs/img/technologies/sqlite.svg`, //<SQLite />,
  mongodb: `/docs/img/technologies/mongodb.svg`, //<MongoDB />,
  sqlserver: `/docs/img/technologies/sqlserver.svg`, //<SQLServer />,
  planetscale: `/docs/img/technologies/planetscale.svg`, //<PlanetScale />,
  cockroachdb: `/docs/img/technologies/cockroachdb.svg`, //<CockroachDB />,
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
  const [selectedItem, setSelectedItem] = React.useState(defaultItem)

  const renderItem = (item: TechItem) => {
    const href = type === "lang" ? `${url}${item.technology}-${dbSelected}` : `${url}${item.technology}`
    return (
      <div className={styles.selectItem}>
        <Link href={href}>
          <img src={icons[item.technology]} />
          <span>{technologyNames[item.technology]}</span>
        </Link>
      </div>
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
    <div className={styles.container}>
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
    </div>
  )
}


export default TechnologySwitch
