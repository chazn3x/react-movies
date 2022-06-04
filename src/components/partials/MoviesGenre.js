import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Loader } from "../commons/Loader"
import { MoviesSection } from "../commons/MoviesSection"
import { GenreContext } from "../pages/GenresPage"

// Styled Components
const Wrapper = styled.div`
  width: 100%;
`
const Title = styled.h2`
  padding-top: 2rem;
  font-weight: 400;
  font-size: 1.7rem;
  text-align: center;
`


// React component
function MoviesGenre() {
  const genreId = useParams().genreId
  const [movies, setMovies] = useState([])
  const [isLoading, setLoading] = useState(true)
  const context = useContext(GenreContext)
  useEffect(() => {
    setLoading(true)
    axios.get('https://api.themoviedb.org/3/discover/movie/', {
      params: {
        with_genres: genreId
      }
    })
      .then(response => {
        setMovies(response.data.results)
        setLoading(false)
      })
  }, [genreId])
  return (
    <Wrapper>
      <Title>Discover movies by genres</Title>
      {isLoading ?
        <Loader/> :
        <MoviesSection title={context.selectedGenre} movies={movies}/>
      }
    </Wrapper>
  )
}

export {MoviesGenre}