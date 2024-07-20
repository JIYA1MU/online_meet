import styled from "styled-components"
import Design from "../Design"
import Navbar from "./Navbar"
import Sidebar from "./Sidebar"

const Layout = ({children} : any) => {
  return (
    <>
    <div>
      <Navbar />
      <Sidebar />
      <Design />
    </div>
    <Main>{children}</Main>
    </>
  )
}

const Main = styled.main`
margin: 8rem 10rem 10rem 20rem;
`

export default Layout