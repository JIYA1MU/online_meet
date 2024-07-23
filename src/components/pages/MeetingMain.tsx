import styled from "styled-components"
import { IoIosArrowDropleftCircle } from "react-icons/io"
import { IoMdCloseCircle } from "react-icons/io"
import { IoIosCheckmarkCircle } from "react-icons/io"
import MainScreen from "./MainScreen"

const MeetingMain = () => {

  return (
    <div>
      <Header>
        <div className="wrapper">
          <div className="upper-wrapper">
            <Circle />
              Daily Meeting - 09:00 a.m
          </div>
          <div className="below-wrapper">
            <div className="left">
              <div className="text">
                <h2>Mugdha</h2>
                <span>wants to join</span>
              </div>
              <div className="right">
                <Cross />
                <Tick />
              </div>
            </div>
          </div>
        </div>
      </Header>
      <MainScreen />
    </div>
  )
}

const Header = styled.div`
  display : flex;
  justify-content : center;
  .wrapper{
    position : relative;
    top : 10px;
    width : 95vw;
    height : 90px;
    background-color: #ffffff;
    border-radius : 30px;
    display : flex;
    justify-content: space-between;
    align-items: center;
    padding : 0 20px;
  }
  .upper-wrapper{
    font-family: "Noto Sans", sans-serif;
    font-weight: 700;
    font-size : 25px;
  }
  .below-wrapper{
    .left{
      background-color : #9ACEEB;
      width : 30vw;
      height : 80px;
      border-radius: 30px;
      display : flex;
      justify-content: space-around;
      align-items: center;
    }
    .text{
      display : flex;
      align-items: center;
      font-family: "Noto Sans", sans-serif;
      span{
        margin-left : 10px;
        color : #696969;
        font-size: 20px;
      }
    }
    .right{
      display: flex;
    }
  }
`

const Circle = styled(IoIosArrowDropleftCircle)`
  color: #696969;
  font-size : 50px;
  vertical-align: middle;
  margin-right : 50px;
`

const Cross = styled(IoMdCloseCircle)`
  font-size: 50px;
  color: #cf1111;
`

const Tick = styled(IoIosCheckmarkCircle)`
  font-size: 50px;
  
`

export default MeetingMain