import styled from "styled-components";

const Navbar = () => {
  return (
    <NavbarContainer>
      <SearchBar>
        
      </SearchBar>
      {/* <ProfileBox>
        
      </ProfileBox> */}
    </NavbarContainer>
  );
};

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  color: white;
`;

const SearchBar = styled.div`
  width: 25%;
  height: 40px;
  background-color: white;
  border-radius : 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// const ProfileBox = styled.div`
//  
//   width: 100px;
//   height: 40px;
//   background-color: white;
//   color: #333;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

export default Navbar;
