import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import styled from 'styled-components';
import { MdOutlineOndemandVideo } from 'react-icons/md';

const MeetingLeft = () => {

    const navigate = useNavigate();
    const handleReturn = () => {
        navigate('/meetingMain')
    }

  return (
    <Layout>
        <Wrapper>
            <div className="text">
                <h1>You left the Meeting</h1>
            </div>
            <div className = 'btn'>
                <button className = 'left-btn'>
                    <Rejoin />
                    <span>Rejoin</span>
                </button>
                <button onClick = {handleReturn}>Return to home screen</button>
            </div>
        </Wrapper>
    </Layout>
  )
}


const Wrapper = styled.div`
    padding: 1rem;
    text-align : center;
    position: relative;
    top:2rem;
    h1{
        font-size : 60px;
        font-family: "Noto Sans", sans-serif;
    }
    button{
        background-color: #013D51;
        padding: 20px;
        margin: 0px 30px;
        color : white;
        border-radius : 50px;
        outline : none;
        cursor: pointer;
        border : none;
    }
    .left-btn{
        color : #013D51;
        background-color: #ffffff;
        padding: 12px;
        span{
            margin-left: 10px;
        }
    }
`

const Rejoin = styled(MdOutlineOndemandVideo)`
    font-size: 2rem;
    vertical-align: middle;
`

export default MeetingLeft