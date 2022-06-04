import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import { BlueButton } from "../commons/buttons"
import { Loader } from "../commons/Loader"
import { MoviesSection } from "../commons/MoviesSection"
import { Review } from "../partials/Review"
import { SaveModal } from "../partials/SaveModal"

// Styled components
const Background = styled.div`
  background-color: black;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
`
const Backdrop = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: .3;
  z-index: -1;
`
const MovieWrapper = styled.div`
  padding: 2rem;
  display: flex;
`
const MovieImage = styled.img`
  max-width: 400px;
  object-fit: contain;
  flex-shrink: 0;
  margin-right: 2rem;
`
const MovieContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
`
const MovieTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
`
const MovieSubtitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 300;
`
const MovieGenres = styled.div`
  ul {
    display: inline-flex;
    list-style: none;
    li:not(:last-child):after {
      content: '•';
    }
  }
`
const StyledLink = styled(Link)`
  padding: 1rem;
  display: inline-block;
  color: var(--active);
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`
const Overview = styled.p`
  margin-top: 2rem;
  font-size: 1.2rem;
  letter-spacing: 1px;
  max-width: 750px;
`
const ReleaseDate = styled.p`
  margin-bottom: 1rem;
`
const Duration = styled.p`
  margin-bottom: 1rem;
`
const Vote = styled.p`
  margin-bottom: 1rem;
`
const SaveButton = styled(BlueButton)`
  margin-left: auto;
  margin-right: 0;
`
const AlreadySavedButton = styled(SaveButton)`
  cursor: not-allowed;
`
const ReviewsHeading = styled.h4`
  font-weight: 400;
  font-size: 1.7rem;
  width: max-content;
  padding-right: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--active);
  margin: 2rem;
`
const NoContent = styled.p`
  margin: 2rem;
  font-size: 1.3rem;
`

// React component
function MoviePage() {
  const movieId = useParams().movieId
  const [movie, setMovie] = useState({})
  const [recommendations, setRecommendations] = useState([])
  const [reviews, setReviews] = useState([])
  const [isLoading, setLoader] = useState(true)
  const [isSaved, setSaved] = useState(false)
  const [modal, setModal] = useState(false)
  useEffect(() => {
    setLoader(true)
    axios.all([
      axios.get(`movie/${movieId}`),
      axios.get(`movie/${movieId}/recommendations`),
      axios.get('https://react-tmdb-63d29-default-rtdb.europe-west1.firebasedatabase.app/saved.json'),
      axios.get(`movie/${movieId}/reviews`),
    ]).then(response => {
      setMovie(response[0].data)
      setRecommendations(response[1].data.results)
      const ids = []
      for (const id in response[2].data) {
        ids.push(response[2].data[id])
      }
      ids.includes(parseInt(movieId)) ? setSaved(true) : setSaved(false)
      setReviews(response[3].data.results)
      setLoader(false)
    })
  }, [movieId])
  const saveToList = () => {
    axios.post('https://react-tmdb-63d29-default-rtdb.europe-west1.firebasedatabase.app/saved.json', movieId)
    .then(() => {
      setSaved(true)
      setModal(true)
      })
  }
  return (isLoading ?
    <Loader/> :
    <>
      {movie.backdrop_path &&
      <>
        <Background />
        <Backdrop src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`} />
      </>
      }
      <MovieWrapper>
        <MovieImage  src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} />
        <MovieContent>
          <div>
            <MovieTitle>
              {movie.title}
            </MovieTitle>
            <MovieSubtitle>
              {movie.tagline}
            </MovieSubtitle>
            {movie.genres.length > 0 &&
              <MovieGenres>
                <span>Genres: </span>
                <ul>
                  {movie.genres.map(genre => (
                    <li key={genre.id}>
                      <StyledLink to={`/genres/${genre.id}`}>{genre.name}</StyledLink>
                    </li>
                  ))}
                </ul>
              </MovieGenres>
            }
            <Overview>
              {movie.overview}
            </Overview>
          </div>
          <div>
            <ReleaseDate>
              Release date: {new Date(movie.release_date).toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })}
            </ReleaseDate>
            <Duration>
              Runtime: {movie.runtime ? `${movie.runtime} minutes` : 'Unknown'}
            </Duration>
            <Vote>
              Vote: {movie.vote_average ? `${movie.vote_average}/10` : 'Unknown'}
            </Vote>
            {isSaved ?
              <AlreadySavedButton>Already in your list</AlreadySavedButton> :
              <SaveButton onClick={saveToList}>Save to my list</SaveButton>
            }
            {modal &&
              <SaveModal title={movie.title} close={() => setModal(false)}/>
            }
          </div>
        </MovieContent>
      </MovieWrapper>
      <section>
        <ReviewsHeading>Reviews</ReviewsHeading>
        {reviews.length > 0 ? 
          reviews.map(review => (
            <Review key={review.id} review={review}/>
          )) :
          <NoContent>There are no reviews for {movie.title}</NoContent>
        }
      </section>
      {recommendations.length > 0 &&
        <MoviesSection title='Recommended' movies={recommendations}/>
      }
    </>
  ) 
}

export {MoviePage}