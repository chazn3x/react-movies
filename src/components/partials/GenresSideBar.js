import { useContext } from "react"
import { NavLink } from "react-router-dom"
import styled from "styled-components"
import { GenreContext } from "../pages/GenresPage"

// Styled Components
const Wrapper = styled.div`
  width: 250px;
  background-color: rgb(60,60,60);
  flex-shrink: 0;
`
const StyledNavLink = styled(NavLink)`
  padding: 1rem;
  display: block;
  color: var(--lightText);
  text-decoration: none;
  font-size: 1.2rem;
  background-color: transparent;
  transition: background-color .2s;
  &:hover:not(.active) {
    background-color: rgba(84,84,255, .2);
  }
  &.active {
    border-right: 3px solid var(--active);
    background-color: rgba(84,84,255, .4);
  }
`

// React component
function GenresSideBar() {
  const context = useContext(GenreContext)
  return (
    <Wrapper>
      <ul>
        {context.genres.map(genre => (
          <li key={genre.id}>
            <StyledNavLink to={`/react-movies/genres/${genre.id}`} onClick={() => context.setGenre(genre.name)}>
              {genre.name}
            </StyledNavLink>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

export {GenresSideBar}