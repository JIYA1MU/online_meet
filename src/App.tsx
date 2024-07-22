import { createGlobalStyle } from 'styled-components'
import LoginPage from './components/pages/LoginPage'
import { BrowserRouter , Route , Routes } from "react-router-dom"
<<<<<<< Updated upstream
import MeetingLink from './components/pages/MeetingLink'
import MeetingJoin from './components/pages/MeetingJoin'
import MeetingMain from './components/MeetingMain'
import Schedule from './components/pages/Schedule'
// import User from './components/pages/User'
import Settings from './components/pages/Settings'
=======
// import MeetingLink from './components/pages/MeetingLink'
import MeetingJoin from './components/pages/MeetingJoin'
import Schedule from './components/pages/Schedule'
import User from './components/pages/User'
import Settings from './components/pages/Settings'
import MeetingMain from './components/pages/MeetingMain'
import MeetingLink from './components/pages/MeetingLink'

>>>>>>> Stashed changes
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<LoginPage />}/>
        <Route path = '/meetingLink' element = {<MeetingLink/>}/>
        <Route path = '/meetingJoin' element = {<MeetingJoin />}/>
        <Route path = '/meetingMain' element = {<MeetingMain />}/>
         <Route path = '/schedule' element = {<Schedule />} />
        {/* <Route path = '/user' element = {<User />} />*/}
        <Route path = '/setting' element = {<Settings />} /> 
      </Routes>
    </BrowserRouter>
    <GlobalStyle />
    </>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #9ACEEB;
    overflow: hidden;
  }
`

export default App
