import styled from "styled-components";

const Button = styled.button`
  display: flex;
  align-items: center;
  padding: .5rem 1rem;
  border: none;
  border-radius: .4rem;
  cursor: pointer;
  transition: opacity .2s;
  &:hover {
    opacity: .7;
  }
`
const GreyButton = styled(Button)`
  border: 1px solid lightgrey;
`
const BlueButton = styled(Button)`
  background-color: var(--active);
  color: var(--lightText);
`
const OreangeButton = styled(Button)`
  background-color: rgb(244, 101,36);
  color: var(--lightText);
`
const RoundGreyButton = styled(GreyButton)`
  justify-content: center;
  padding: .5rem;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
`
export {Button, GreyButton, RoundGreyButton, BlueButton, OreangeButton}