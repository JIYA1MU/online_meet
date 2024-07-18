import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  return (
    <NavbarContainer>
      <div className="search">
        <span><IoSearch /></span>
        <input 
          type="text" 
          name = "search" 
          placeholder = "Search" 
        />
      </div>
      <div className="profile"></div>
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  display: flex;
  justify-content:space-between;
  align-items: center;
  padding: 10px 20px;
  color: white;
  .search{
    width: 25%;
    height: 40px;
    background-color: white;
    border-radius: 20px;
    margin : 0 auto;
    color : black;
    input{
      padding: 11px;
      width: 70%;
      border: none;
      outline: none;
    }
    span{
      padding: 15px ;
      color : #696969 ;  
    }
  }
  .profile{
    background-color: white;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    
  }
`
export default Navbar;
