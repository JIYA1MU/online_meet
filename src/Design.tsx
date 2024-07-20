import styled from "styled-components"

const Design = () => {
  return (
    <>
    <Img src = "src\assets\Plant.png" alt = "plant" />
    <RotatedImg src="src/assets/Plant.png" alt="plant rotated" />
    </>
  )
}

const Img = styled.img`
    position: absolute;
    bottom: 10px; 
    right: 0;
    width : 10rem;
`

const RotatedImg = styled.img`
  position: absolute;
  bottom: 0px;
  right: 6rem;
  width: 7rem;
  transform: rotate(-21deg); 
`

export default Design