import axios from "axios"
import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import styled from "styled-components"
import { Loader } from "../commons/Loader"
import { GenresSideBar } from "../partials/GenresSideBar"

// Context
const GenreContext = React.createContext()

// Styled Components
const Wrapper = styled.div`
  display: flex;
  position: relative;
`

// React component
function GenresPage() {
  const [isLoading, setLoader] = useState(true)
  useEffect(() => {
    setLoader(true)
    axios.get('/genre/movie/list')
    .then(response => {
      setGenre(response.data.genres[0].name)
      setState(state => ({
        ...state,
        genres: response.data.genres
      }))
      setLoader(false)
    })
  }, [])
  const setGenre = (genre) => {
    setState(state => ({
      ...state,
      selectedGenre: genre
    }))
  }
  const [state, setState] = useState({genres: [], selectedGenre: '', setGenre})
  return (isLoading ?
    <Loader/> :
    <Wrapper>
      <GenreContext.Provider value={state}>
        <GenresSideBar/>
        <Outlet/>
      </GenreContext.Provider>
    </Wrapper>
  )
}

export {GenresPage, GenreContext}