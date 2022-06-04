import axios from "axios"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"
import { Loader } from "../commons/Loader"
import { MoviesSection } from "../commons/MoviesSection"
import { SearchBar } from "../partials/SearchBar"

// Styled Components
const NoResults = styled.div`
  margin-top: 250px;
  font-size: 1.3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  p {
    text-align: center;
    margin-bottom: 2rem;
  }
`
const Blue = styled.span`
  color: var(--active);
  font-size: 1.4rem;
  line-height: 3rem;
`

// React component
function SearchPage() {
  const [isLoading, setLoader] = useState(true)
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('query')
  const [movies, setMovies] = useState([])
  useEffect(() => {
    if (query) {
      setLoader(true)
      axios.get('/search/movie', {
        params: {query}
      })
        .then(response => {
          setMovies(response.data.results)
          setLoader(false)
        })
    } else {
      setLoader(false)
    }
  }, [query])
  return (query ?
    (isLoading ?
      <Loader/> :
      movies.length > 0 ?
        <MoviesSection title={`Search results for "${query}"`} movies={movies}/> :
        <NoResults>
          <p>There are no search results for "<Blue>{query}</Blue>",<br />
          try to search something else.</p>
          <SearchBar />
        </NoResults>
      ) :
      <NoResults>
        <p>Start a new search:</p>
        <SearchBar/>
      </NoResults>
  )
}

export {SearchPage}