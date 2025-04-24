import * as React from "react";
import Select, { components } from "react-select";

import CodeBlock from "@site/src/theme/CodeBlock";

interface SelectProps {
  items: any[];
  onChange: (item: any) => void;
  selectedItem: any;
  width?: number;
  DropdownIndicator: any;
  IndicatorSeperator: any;
  Option: any;
  SingleValue: any;
}

const SelectComponent = (props: SelectProps) => {
  const {
    selectedItem,
    onChange,
    items,
    DropdownIndicator,
    IndicatorSeperator,
    Option,
    SingleValue,
  } = props;
  const width = props.width || 160;

  const handleChange = (newValue: any) => {
    onChange({ technology: newValue.value });
  };

  const options = items.map((it) => ({ value: it.technology, label: it.technology }));

  const selectedOption = options.filter((ff) => ff.value === selectedItem.technology);

  const SelectContainer = (props: any) => {
    return (
      <components.SelectContainer {...props} className="select-container">
        {props.children}
      </components.SelectContainer>
    );
  };
  return (
    <div>
      <Select
        width={width}
        options={options}
        readonly
        defaultValue={selectedOption}
        onChange={handleChange}
        classNamePrefix="tech-select"
        //@ts-ignore
        components={{ DropdownIndicator, IndicatorSeperator, Option, SingleValue, SelectContainer }}
      />
    </div>
  );
};

export default SelectComponent;
