import { NavLink, useLocation } from "react-router-dom"
import styled from "styled-components"
import {SearchBar} from "../partials/SearchBar"

// Styled Components
const HeaderWrapper = styled.header`
  background-color: black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 3;
  padding: 0 1rem;
`
const LeftHeader = styled.div`
  display: flex;
  align-items: center;
`
const Title = styled.h1`
  font-weight: 400;
  margin-right: 2rem;
`
const Blue = styled.span`
  color: var(--active);
`
const StyledNavLink = styled(NavLink)`
  display: inline-block;
  color: var(--lightText);
  font-size: 1.2rem;
  text-decoration: none;
  padding: 1rem;
  margin: 0 1rem;
  background-color: transparent;
  transition: background-color .2s;
  border-radius: .5rem;
  &:hover:not(.active) {
    background-color: rgba(84,84,255, .4);
  }
  &.active {
    padding: 2rem 1rem;
    border-radius: 0;
    color: var(--active);
    border-bottom: 3px solid var(--active);
  }
`
const FakeNavlink = styled.div`
  display: inline-block;
  color: var(--active);
  font-size: 1.2rem;
  text-decoration: none;
  padding: 2rem 1rem;
  margin: 0 1rem;
  border-bottom: 3px solid var(--active);
  cursor: default;
`

// React component
function Header() {
  const location = useLocation()
  return (
    <HeaderWrapper>
      <LeftHeader>
        <Title><Blue>Altruistic</Blue> Movies</Title>
        <nav>
          <StyledNavLink to='/react-movies/home' title="Home">Home</StyledNavLink>
          <StyledNavLink to='/react-movies/genres' title="Genres">Genres</StyledNavLink>
          <StyledNavLink to='/react-movies/saved' title="My List">My List</StyledNavLink>
          {location.pathname.includes('search') &&
            <FakeNavlink>Search</FakeNavlink>
          }
          {location.pathname.includes('movie/') &&
            <FakeNavlink>Movie</FakeNavlink>
          }
        </nav>
      </LeftHeader>
      <SearchBar/>
    </HeaderWrapper>
  )
}

export {Header}