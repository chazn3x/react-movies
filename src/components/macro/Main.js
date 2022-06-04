import { Route, Routes } from "react-router-dom"
import styled from "styled-components"
import { GenresPage } from "../pages/GenresPage"
import { HomePage } from "../pages/HomePage"
import { MoviePage } from "../pages/MoviePage"
import { PageNotFound } from "../pages/PageNotFound"
import { SavedPage } from "../pages/SavedPage"
import { SearchPage } from "../pages/SearchPage"
import { MoviesGenre } from "../partials/MoviesGenre"

// Styled components
const MainWrapper = styled.main`
  min-height: 100vh;
`

// React component
function Main() {
  return (
    <MainWrapper>
      <Routes>
        <Route path="/react-movies/" element={<HomePage/>}/>
        <Route path="/react-movies/genres" element={<GenresPage/>}>
          <Route index element={<MoviesGenre />} />
          <Route path=":genreId" element={<MoviesGenre />} />
        </Route>
        <Route path="/react-movies/movie">
          <Route index element={<PageNotFound/>} />
          <Route path=":movieId" element={<MoviePage/>} />
        </Route>
        <Route path="/react-movies/saved" element={<SavedPage/>} />
        <Route path="/react-movies/search" element={<SearchPage/>} />
        <Route path="/react-movies/*" element={<PageNotFound/>} />
      </Routes>
    </MainWrapper>
  )
}

export {Main}