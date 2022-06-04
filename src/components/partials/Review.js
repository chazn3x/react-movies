import styled from "styled-components"

// Styled Components
const Wrapper = styled.div`
  margin: 2rem;
  background-color: rgba(240,240,240,.2);
  border-radius: .5rem;
  padding: 2rem;
  margin-bottom: 3rem;
`
const User = styled.div`
  display: flex;
  margin-bottom: 1rem;
`
const Avatar = styled.div`
  width: 70px;
  height: 70px;
  background-color: grey;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-size: 3rem;
  color: var(--active);   
`
const AvatarImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
`
const UserInfo = styled.div`
  margin-left: 1rem;
`
const Name = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`
const ReviewDate = styled.p`
  margin-top: .5rem;
`
const Content = styled.p`
  font-size: 1.2rem;
  line-height: 1.6rem;
  letter-spacing: .5px;
`

// React component
function Review({review}) {
  return (
    <Wrapper>
      <User>
      {review.author_details.avatar_path && !review.author_details.avatar_path.includes('http') ? 
        <AvatarImg src={`https://image.tmdb.org/t/p/original/${review.author_details.avatar_path}`} /> :
        <Avatar>
          <span>A</span>
        </Avatar>
      }
        <UserInfo>
          <Name>{review.author}</Name>
          <ReviewDate>{new Date(review.created_at).toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })}</ReviewDate>
        </UserInfo>
      </User>
      <Content dangerouslySetInnerHTML={{ __html: review.content }}/>
    </Wrapper>
  )
}

export {Review}