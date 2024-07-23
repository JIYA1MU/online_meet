
import styled from 'styled-components';
import Layout from '../Layout';

const Settings = () => {
  return (
    <Layout>
      <SettingsContainer>
        <Option>Profile Settings</Option>
        <Option>Play Recorded Session...</Option>
        <Option>Privacy Settings</Option>
        <Option>Notification Settings</Option>
        <Option>Feedback</Option>
        <Option>Help & Support</Option>
      </SettingsContainer>
    </Layout>
  );
}
``
const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 5px;
`;

const Option = styled.div`
  background: #fff;
  border-radius: 36px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 600px;
  text-align: center;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

export default Settings;
