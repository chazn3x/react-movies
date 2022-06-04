import axios from "axios"
import { useEffect, useState } from "react"
import { Loader } from "../commons/Loader"
import { MoviesSection } from "../commons/MoviesSection"

function SavedPage() {
  const [isLoading, setLoader] = useState(true)
  const [movies, setMovies] = useState([])
  useEffect(() => {
    setLoader(true)
    axios.get('https://react-tmdb-63d29-default-rtdb.europe-west1.firebasedatabase.app/saved.json')
      .then(response => {
        const fetchedIds = []
        const fetchedMovies = []
        let iteration = 0
        for (const id in response.data) {
          fetchedIds.push(response.data[id])
        }
        fetchedIds.forEach(id => {
          axios.get(`movie/${id}`)
            .then(response => {
              iteration++;
              fetchedMovies.push(response.data)
              if (iteration === fetchedIds.length) {
                setMovies(fetchedMovies)
                setLoader(false)
              }
            })
        })
      })
  }, [])
  return (isLoading ?
    <Loader/> :
    <MoviesSection title="Saved movies" movies={movies} />
  )
}

export {SavedPage}