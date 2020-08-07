import styled from 'styled-components/native';

import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 20px;
  color: #f4ede8;
  margin: 60px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: 'Roboto-Regular';
  color: #eee;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;

  align-items: center;
  justify-content: center;
  flex-direction: row;

  padding: 10px ${10 + getBottomSpace()}px;
`;

export const CreateAccountButtonText = styled.Text`
  font-size: 18px;
  font-family: 'Roboto-Regular';
  color: #ff9000;
  margin-left: 10px;
`;
