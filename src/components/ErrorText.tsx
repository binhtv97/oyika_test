import {colors} from '@themes/colors';
import {FontSizes} from '@themes/metrics';
import React from 'react';
import {StyleSheet, type TextProps, Text} from 'react-native';

interface ErrorTextProps {
  errorText?: string;
  errorProps?: TextProps;
}

export const Error: React.FC<ErrorTextProps> = ({errorText, errorProps}) => (
  <Text {...errorProps} style={[style.container, errorProps?.style]}>
    {errorText}
  </Text>
);

const style = StyleSheet.create({
  container: {
    fontSize: FontSizes.tiny,
    color: colors.red,
    textAlign: 'center',
  },
});
