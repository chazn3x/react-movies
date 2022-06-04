import { Link } from "react-router-dom"
import styled from "styled-components"

// Styled Components
const LinkStyled = styled(Link)`
  color: var(--active);
  text-decoration: none;
  overflow: hidden;
  border-radius: .4rem;
  background-color: black;
  display: inline-block;
  width: 200px;
  height: 300px;
  position: relative;
  flex-shrink: 0;
`
const Logo = styled.span`
  font-size: 10rem;
  font-weight: 300;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`
const CardImage = styled.img`
  border-radius: .4rem;
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`
const Layover = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  background-color: black;
  transition: opacity .3s;
  opacity: 0;
  &:hover {
    opacity: .4;
  }
`

// React component
function MovieCard({movie}) {
  return (movie.poster_path &&
    <LinkStyled to={`/react-movies/movie/${movie.id}`} title={movie.title}>
      <Logo>A</Logo>
      <CardImage src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}/>
      <Layover/>
    </LinkStyled>
  )
}

export {MovieCard}