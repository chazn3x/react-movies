import styled from "styled-components"
import { MovieCard } from "../partials/MovieCard"

const Section = styled.section`
  margin: 2rem;
  &:not(:last-child):after {
      content: '';
      display: block;
      margin: 4rem auto 2rem;
      width: 200px;
      height: 2px;
      background-color: var(--active);
  }
  &:last-of-type {
    padding-bottom: 2rem;
  }
`
const MoviesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`
const Heading = styled.h3`
  font-weight: 400;
  font-size: 1.7rem;
  width: max-content;
  padding-right: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--active);
  margin-bottom: 2rem;
`

function MoviesSection({movies, title}) {
  return (
    <Section>
      <Heading>{title}</Heading>
      <MoviesWrapper>
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie}/>
        ))}
      </MoviesWrapper>
    </Section>
  )
}

export {MoviesSection}