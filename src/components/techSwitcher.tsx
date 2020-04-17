import React from 'react';
import styled from 'styled-components';
import { Typescript } from '../icons/technologies/Typescript';
import SelectComponent from './select';
import PostgreSQL from '../icons/technologies/PostgreSQL';
import MySQL from '../icons/technologies/MySQL';
import SQLite from '../icons/technologies/SQLite'; // change icon as soon as we have it
import JS from '../icons/technologies/JS';

interface TechSwitchProps {
  type: string;
  onChangeTech: (item: any) => void;
  technologies: string[];
  defaultTech: string;
}

interface TechItem {
  technology: keyof typeof icons;
}

const icons = {
  node: <JS />,
  typescript: <Typescript />,
  mysql: <MySQL />,
  postgres: <PostgreSQL />,
  sqlite: <SQLite />, // change icon as soon as we have it
};

const technologyTypes = {
  languages: ['node', 'typescript'],
  databases: ['mysql', 'postgres', 'sqlite'],
};

export const technologyNames = {
  node: 'JavaScript',
  typescript: 'TypeScript',
  mysql: 'MySQL',
  postgres: 'PostgreSQL',
  sqlite: 'SQLite',
};

const TechnologySwitch = ({ type, onChangeTech, technologies, defaultTech }: TechSwitchProps) => {
  const langDefault = { technology: defaultTech || 'typescript' };
  const dbDefault = { technology: defaultTech || 'postgres' };
  const defaultItem = type === 'lang' ? langDefault : dbDefault;

  const [selectedItem, setSelectedItem] = React.useState(defaultItem);

  const renderItem = (item: TechItem) => {
    return (
      <>
        {icons[item.technology]}
        <span>{technologyNames[item.technology]}</span>
      </>
    );
  };

  const itemToString = (item: TechItem) => item && item.technology;

  const handleChange = (item: TechItem) => {
    setSelectedItem(item);
    onChangeTech(item);
  };

  let items =
    type === 'lang'
      ? technologyTypes.languages.map((lang: any) => ({ technology: lang }))
      : technologyTypes.databases.map((db: any) => ({ technology: db }));

  if (technologies) {
    items = items.filter((item: any) => technologies.includes(item.technology));
  }

  return (
    <Container>
      <SelectComponent
        items={items}
        selectedItem={selectedItem}
        renderItem={renderItem}
        itemToString={itemToString}
        onChange={handleChange}
        top={-14}
        selectPlaceholder="Select an item"
        width={168}
      />
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 1rem 24px 0;
  @media only screen and (max-width: 767px) {
    margin: 8px 0 0;
    button {
      width: 100%;
    }
  }
`;

export default TechnologySwitch;
