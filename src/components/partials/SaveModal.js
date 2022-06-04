import { Link } from "react-router-dom"
import styled from "styled-components"
import { RoundGreyButton } from "../commons/buttons"

// Styled Components
const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(1px);
  z-index: 5;
  display: grid;
  place-items: center;
`
const Window = styled.div`
  width: max-content;
  min-width: 400px;
  height: 200px;
  background-color: rgb(200,200,200);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`
const ModalHeader = styled.div`
  border-bottom: 1px solid grey;
  color: var(--active);
  padding: 1rem;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const CloseButton = styled(RoundGreyButton)`
  margin-left: 1rem;
`
const ModalBody = styled.div`
  flex: 1;
  display: grid;
  place-items: center;
  color: rgb(80,80,80);
  font-size: 1.4rem;
`
const ModalFooter = styled.div`
  padding: 1rem;
`
const SavedLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: .5rem 1rem;
  border: none;
  border-radius: .4rem;
  cursor: pointer;
  transition: opacity .2s;
  background-color: var(--active);
  color: var(--lightText);
  text-decoration: none;
  width: max-content;
  margin-left: auto;
  margin-right: 0;
  &:hover {
    opacity: .7;
  }
`

// React component
function SaveModal({title, close}) {
  return (
    <Wrapper>
      <Window>
        <ModalHeader>
          <h4>{title}</h4>
          <CloseButton onClick={close}>X</CloseButton>
        </ModalHeader>
        <ModalBody>
          <p>Movie saved in your list</p>
        </ModalBody>
        <ModalFooter>
          <SavedLink to="/saved" title="My List">Go to my list</SavedLink>
        </ModalFooter>
      </Window>
    </Wrapper>
  )
}

export {SaveModal}