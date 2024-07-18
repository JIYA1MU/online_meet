import { NavLink } from "react-router-dom"
import { menubar } from "./menubar"
import styled from "styled-components"

const Sidebar = () => {
  return (
    <SidebarContainer>
    {menubar.map((item , index) => (
        <div className="sidebar">
            <NavLink to = {item.path} key = {index}>
                <div className="content">
                    <div className = "icon">{item.icon}</div>
                </div>
            </NavLink>
        </div>
    ))}
    </SidebarContainer>
  )
}

const SidebarContainer = styled.div`
    position : fixed;
    top : 25%;
    .icon{
        width : 5%;
        font-size: 40px;
        padding : 20px;
        color : #ffffff;
    }
`

export default Sidebar