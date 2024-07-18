import styled from "styled-components"
import { FaArrowRight } from "react-icons/fa"

const LoginPage = () => {

    return (
    <Container >
        <div className="wrapper">
            <div className="wrapper-left">
                <img src="src/assets/Dfree.png" alt = "Dfree-logo" />
                <h1>LOGIN</h1>
                <div className="input">
                    <label htmlFor="email">Email</label>
                    <div>
                        <input 
                            type = "email" 
                            name = "email"
                            placeholder = "Enter Email"
                        />
                    </div>
                    <br />
                    <label htmlFor="password">Password</label>
                    <div>
                        <input 
                            type = "password" 
                            name = "password" 
                            placeholder = "Enter Password"
                        />
                    </div>
                </div>
                <button type = "submit">
                    <span>Login</span>
                    <span className= "arrow"><FaArrowRight /></span>
                </button>
            </div>
            <div className="wrapper-right">
                <img src = "src/assets/Man-laptop.png" alt = "Man-with-laptop"  />
            </div>
        </div>
    </Container>
    )
}

const Container = styled.div`
    background-color : #035C7A;
    width : 100vw;
    height : 100vh;
    display : flex;
    justify-content: center;
    align-items: center;
    .wrapper{
        width : 50%;
        height : 60%;
        background-color: white;
        border-radius : 20px;
        display : flex;
        justify-content: space-between;
        .wrapper-left{
            flex : 1;
            text-align : center;
            .input{
                text-align: left;
                margin: 40px 40px 40px 60px;
            }
            img{
                width : auto;
                height : 80px;
                margin-top : 30px;
            }
            h1{
                color : #035C7A;
                margin-top : 0;
                font-family: "Noto Sans", sans-serif;
                font-weight: 900;
            }
            label{
                font-family: "Noto Sans", sans-serif;
                font-weight: 700;
                color : #696969
            }
            input{
                padding: 13px;
                border-radius: 5px;
                width: 70%;
                border: 1px solid #696969;
                background-color : #9ACEEB;
                color : black;
                border: none;
                outline : none;
            }
            button{
                padding: 15px;
                border-radius: 20px;
                background-color: #035C7A;
                color : #ffffff;
                outline : none;
                border:none;
            }
            span{
                margin-left : 10px;
            }
        }
        .wrapper-right{
            background-color: #9ACEEB;
            width: 35%;
            border-radius: 20px;
            img{
                width: 100%; 
                height: auto; 
                max-height: 100%;
                position : relative;
                top : 10rem;
                right : 4rem;
            }
        }
    }

`

export default LoginPage