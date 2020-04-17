import React from 'react';
import styled from 'styled-components';
import Downshift from 'downshift';
import ArrowDown from '../icons/ArrowDown';

interface SelectProps {
  items: any[];
  renderItem: (item: any) => any;
  onChange: (item: any) => void;
  selectedItem: any;
  itemToString: (item: any) => string;
  width?: number;
  top?: number;
  selectPlaceholder?: string;
}

const SelectComponent = (props: SelectProps) => {
  const { selectedItem, renderItem, onChange, itemToString, items, top, selectPlaceholder } = props;
  const width = props.width || 160;
  return (
    <Downshift itemToString={itemToString} onChange={onChange}>
      {({
        isOpen,
        getToggleButtonProps,
        getItemProps,
        highlightedIndex,
        selectedItem: dsSelectedItem,
      }: any) => {
        const firstItem = isOpen && selectPlaceholder ? null : selectedItem;

        return (
          <div>
            <Select {...getToggleButtonProps()} className={`${isOpen ? 'open' : ''}`} width={width}>
              <Left>{firstItem ? renderItem(firstItem) : <Muted>{selectPlaceholder}</Muted>}</Left>
              <ArrowDown />
            </Select>
            <div style={{ position: 'relative' }}>
              {isOpen && (
                <Dropdown
                  style={{
                    maxHeight: 170,
                    width,
                    overflowY: 'scroll',
                    position: 'absolute',
                    left: 0,
                    top: top || 0,
                  }}
                >
                  {items.map((item: any, index: number) => (
                    <Item
                      {...getItemProps({
                        item,
                        isActive: highlightedIndex === index,
                        isSelected: dsSelectedItem === item,
                      })}
                      key={itemToString(item)}
                    >
                      {renderItem(item)}
                    </Item>
                  ))}
                </Dropdown>
              )}
            </div>
          </div>
        );
      }}
    </Downshift>
  );
};

export default SelectComponent;

const Select = styled.button`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  width: ${(p: any) => p.width}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  color: #1a202c;
  font-size: 1rem;
  font-family: 'Open Sans';
  &:focus {
    outline: 0;
  }
  &.open {
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }
  &:hover {
    cursor: pointer;
  }
` as any;

const Dropdown = styled.div`
  background: white;
  transform: translateY(14px);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  color: grey;
  box-shadow: 0px 2px 4px rgba(8, 35, 51, 0.05);
  @media (min-width: 0px) and (max-width: 767px) {
    width: 100% !important;
  }
`;

const Item = styled.div`
  padding: 8px 14px;
  color: grey;
  background: 'white';
  cursor: pointer;
  display: flex;
  align-items: center;
  > * + * {
    margin-left: 12px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-right: 16px;
  > * + * {
    margin-left: 12px;
  }
`;

const Muted = styled.div`
  opacity: 0.5;
`;
