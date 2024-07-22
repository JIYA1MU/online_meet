<<<<<<< Updated upstream
import  { useState } from 'react';
import styled from 'styled-components';
import Layout from '../Layout';
=======
import styled from 'styled-components';
import Layout from '../Layout';
import { useState } from 'react';
>>>>>>> Stashed changes

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1));
  };

  const handleNextYear = () => {
    setCurrentDate(new Date(currentDate.getFullYear() + 1, currentDate.getMonth(), 1));
  };

  const days = getMonthDays();
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <Layout>
      {/* <PageWrapper> */}
        <Container>
          <Header>
            <YearControls>
              <Button onClick={handlePrevYear}>«</Button>
              <Button onClick={handlePrevMonth}>‹</Button>
            </YearControls>
            <MonthYear>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</MonthYear>
            <YearControls>
              <Button onClick={handleNextMonth}>›</Button>
              <Button onClick={handleNextYear}>»</Button>
            </YearControls>
          </Header>
          <CalendarGrid>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <DayName key={day}>{day}</DayName>
            ))}
            {days.map((day, index) => (
              <Day key={index}>{day !== null ? day : ''}</Day>
            ))}
          </CalendarGrid>
        </Container>
      {/* </PageWrapper> */}
    </Layout>
  );
}

// const PageWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100vh;
 
//   margin: 0;
// `;
<<<<<<< Updated upstream

const Container = styled.div`
  width: 80%;
  max-width: 800px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white; /* Changed from white to transparent */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ddd;
`;

const YearControls = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    color: #007bff;
  }
`;

const MonthYear = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  padding: 10px;
`;

const DayName = styled.div`
  text-align: center;
  font-weight: bold;
  background-color: #f9f9f9;
  padding: 10px 0;
`;

const Day = styled.div`
  text-align: center;
  padding: 15px 0;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export default Calendar;

=======

const Container = styled.div`
  width: 80%;
  max-width: 800px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: white; /* Changed from white to transparent */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ddd;
`;

const YearControls = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  padding: 0 10px;
  &:hover {
    color: #007bff;
  }
`;

const MonthYear = styled.div`
  font-size: 1.5em;
  font-weight: bold;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1px;
  padding: 10px;
`;

const DayName = styled.div`
  text-align: center;
  font-weight: bold;
  background-color: #f9f9f9;
  padding: 10px 0;
`;

const Day = styled.div`
  text-align: center;
  padding: 15px 0;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #f1f1f1;
  }
`;

export default Calendar;
>>>>>>> Stashed changes
