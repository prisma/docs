import React from 'react'
import styled from 'styled-components'

interface SelectProps {
  items: any[]
  renderItem: (item: any) => any
  onChange: (item: any) => void
  selectedItem: any
  itemToString: (item: any) => string
  width?: number
  top?: number
  selectPlaceholder?: string
}

const NewSelectComponent = (props: SelectProps) => {
  const { selectedItem, renderItem, onChange, itemToString, items, top, selectPlaceholder } = props
  const width = props.width || 160
  const [value, setValue] = React.useState(selectedItem.technology)

  const handleChange = (e: any) => {
    setValue(e.target.value.technology)
    onChange({technology: e.target.value})
  }
  return (
    <select value={value} onChange={handleChange}>
      {items.map((item: any) => (
        <option value={item.technology}>{item.technology}</option>
      ))}
    </select>
  )
}

export default NewSelectComponent

const Select = styled.button`
  background: var(--white-color);
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 10px;
  width: ${(p: any) => p.width}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 40px;
  color: var(--main-font-color);
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
` as any

const Dropdown = styled.div`
  background: var(--white-color);
  transform: translateY(14px);
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  color: grey;
  box-shadow: 0px 2px 4px rgba(8, 35, 51, 0.05);
  @media (min-width: 0px) and (max-width: 767px) {
    width: 100% !important;
  }
`

const Item = styled.div`
  padding: 8px 14px;
  color: grey;
  background: var(--white-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  > * + * {
    margin-left: 12px;
  }
`

const Left = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-right: 16px;
  > * + * {
    margin-left: 12px;
  }
`

const Muted = styled.div`
  opacity: 0.5;
`
