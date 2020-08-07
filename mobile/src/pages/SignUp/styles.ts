import styled from 'styled-components/native';
import { Platform } from 'react-native';

import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: ${Platform.OS === 'android' ? 130 : 40}px;
`;

export const Title = styled.Text`
  font-family: 'Roboto-Medium';
  font-size: 20px;
  color: #f4ede8;
  margin: 60px 0 24px;
`;

export const BackToSignIn = styled.TouchableOpacity`
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

export const BackToSignInButtonText = styled.Text`
  font-size: 16px;
  font-family: 'Roboto-Regular';
  color: #f4ede8;
  margin-left: 10px;
`;
