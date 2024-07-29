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
    <main>{children}</main>
    </>
  )
}


export default Layout