import * as React from 'react'
import Select, { components } from 'react-select'
import styled from 'styled-components'

import { defaultTheme as theme } from '../themes'

interface SelectProps {
  items: any[]
  onChange: (item: any) => void
  selectedItem: any
  width?: number
  DropdownIndicator: any
  IndicatorSeperator: any
  Option: any
  SingleValue: any
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
  } = props
  const width = props.width || 160

  const handleChange = (newValue: any) => {
    onChange({ technology: newValue.value })
  }

  const options = items.map((it) => ({ value: it.technology, label: it.technology }))

  const selectedOption = options.filter((ff) => ff.value === selectedItem.technology)

  const SelectContainer = (props: any) => {
    return (
      <components.SelectContainer {...props} className="select-container">
        {props.children}
      </components.SelectContainer>
    )
  }
  return (
    <SelectComponentWrapper>
      <Select
        width={width}
        options={options}
        defaultValue={selectedOption}
        onChange={handleChange}
        classNamePrefix="tech-select"
        components={{ DropdownIndicator, IndicatorSeperator, Option, SingleValue, SelectContainer }}
      />
    </SelectComponentWrapper>
  )
}

export default SelectComponent

const SelectComponentWrapper = styled.div`
  @media (prefers-color-scheme: dark) {
    .select-container {
      .tech-select__control {
        background-color: ${theme.colors.gray[800]};
        border-color: ${theme.colors.gray[700]};
      }
      .tech-select__single-value {
        color: ${theme.colors.gray[100]};
      }
      .tech-select__menu {
        background-color: ${theme.colors.gray[800]};
        .tech-select__option {
          background-color: ${theme.colors.gray[800]};
          color: ${theme.colors.gray[100]};
          &:hover {
            background-color: ${theme.colors.gray[700]};
            color: ${theme.colors.gray[100]};
          }
        }
      }
    }
  }
  .select-container {
    > div:first-child {
      height: 38px;
      border-color: #e2e8f0;
      border-radius: 5px;
    }
  }
` as any
