import React from 'react';
import styled from 'styled-components';
import { Typescript } from '../icons/technologies/Typescript';
import SelectComponent from './select';
import PostgreSQL from '../icons/technologies/PostgreSQL';
import MySQL from '../icons/technologies/MySQL';
import MongoDB from '../icons/technologies/MongoDB';
import Go from '../icons/technologies/Go';
import Flow from '../icons/technologies/Flow';
import JS from '../icons/technologies/JS';

interface TechSwitchProps {
  type: string;
  onChangeTech: (item: any) => void;
}

interface TechItem {
  technology: keyof typeof icons;
}

const icons = {
  node: <JS />,
  typescript: <Typescript />,
  mysql: <MySQL />,
  postgres: <PostgreSQL />,
  mongodb: <MongoDB />,
  go: <Go />,
  flow: <Flow />,
};

const technologyTypes = {
  languages: ['node', 'typescript', 'flow', 'go'],
  databases: ['mysql', 'postgres', 'mongodb'],
};

export const technologyNames = {
  node: 'JavaScript',
  typescript: 'TypeScript',
  flow: 'Flow',
  mysql: 'MySQL',
  postgres: 'PostgreSQL',
  mongodb: 'MongoDB',
  go: 'Go',
};

const TechnologySwitch = ({ type, onChangeTech }: TechSwitchProps) => {
  const langDefault = { technology: 'node' };
  const dbDefault = { technology: 'mysql' };
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

  const items =
    type === 'lang'
      ? technologyTypes.languages.map((lang: any) => ({ technology: lang }))
      : technologyTypes.databases.map((db: any) => ({ technology: db }));

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
`;

export default TechnologySwitch;
