import { createRef, useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { BlueButton } from "../commons/buttons"

// Styled Components
const Form = styled.form`
  display: flex;
  align-items: center;
`
const SearchInput = styled.input.attrs({type: 'text', autoComplete: 'off'})`
  padding: .5rem;
  margin-right: 2rem;
  font-size: 1.2rem;
  border: none;
  background: transparent;
  border-bottom: 2px solid var(--active);
  outline: none;
  caret-color: var(--active);
  color: var(--lightText);
`

// React component
function SearchBar() {
  const [searchQuery, setSearchQuery] = useState({query: ''})
  const searchInputRef = createRef()
  const handleChange = (e) => {
    setSearchQuery({query: e.target.value})
  }
  const navigate = useNavigate()
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.query) {
      navigate({
        pathname: '/react-movies/search',
        search: `?${createSearchParams(searchQuery)}`
      })
      setSearchQuery({query: ''})
    } else {
      searchInputRef.current.focus()
    }
  }
  return (
    <Form onSubmit={handleSearch}>
      <SearchInput name="searchQuery" id="search" value={searchQuery.query} onChange={handleChange} placeholder="Search a movie..." ref={searchInputRef}/>
      <BlueButton type="submit">Search</BlueButton>
    </Form>
  )
}

export {SearchBar}