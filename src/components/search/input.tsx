import React from "react"
import { connectSearchBox } from "react-instantsearch-dom"
import { SearchIcon, Form, Input } from "./styles"
export default connectSearchBox(({ refine, ...rest }: any) => (
  <Form>
    <Input
      type="text"
      placeholder="Search"
      aria-label="Search"
      onChange={(e: any) => refine(e.target.value)}
      {...rest}
    />
    <SearchIcon />
  </Form>
))