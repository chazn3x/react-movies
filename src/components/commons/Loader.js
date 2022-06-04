import styled from "styled-components"

// Styled components
const LoaderStyled = styled.div`
  margin: 300px auto 0;
  width: max-content;
  color: var(--active);
  font-size: 3rem;
`

function Loader() {
  return (
    <LoaderStyled>
      Loading...
    </LoaderStyled>
  )
}

export {Loader}