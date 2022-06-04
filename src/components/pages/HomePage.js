import axios from "axios"
import { useEffect, useState } from "react"
import { MoviesSection } from "../commons/MoviesSection"
import { Loader } from "../commons/Loader"

// React component
function HomePage() {
  const [isLoading, setLoader] = useState(true)
  const [movies, setMovies] = useState({
    week: [],
    day: []
  })
  useEffect(() => {
    const time_window = ['day', 'week']
    setLoader(true)
    time_window.forEach(time => {
      axios.get(`/trending/movie/${time}`)
        .then(response => {
          setMovies(movies => ({
            ...movies,
            [time]: response.data.results
          }))
          if (time === 'week') {
            setLoader(false)
          }
        })
    })
  }, [])
  return (isLoading ?
    <Loader/> :
    <>
      <MoviesSection title="Popular movies today" movies={movies.day}/>
      <MoviesSection title="Popular movies this week" movies={movies.week}/>
    </>
  )
}

export {HomePage}