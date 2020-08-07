import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  border-radius: 10px;
  background: #ff9000;

  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  font-size: 20px;
  color: #312e38;
  font-family: 'Roboto-Medium';
`;
