import Layout from '../Layout';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, Month, Inject } from '@syncfusion/ej2-react-schedule';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-react-schedule/styles/material.css';
import styled from 'styled-components';

const Schedule = () => {
  return (
    <Layout>
      <Container>
        <ScheduleComponent>
          <ViewsDirective>
            <ViewDirective option='Day' />
            <ViewDirective option='Week' />
            <ViewDirective option='Month' />
          </ViewsDirective>
          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  width : 900px;
  /* height : 300px; */
`

export default Schedule;
