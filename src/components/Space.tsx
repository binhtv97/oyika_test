import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';
import {ph, pw} from '@themes';

export interface SpaceProps {
  width?: number;
  height?: number;
  colorW?: string;
  colorH?: string;
}
export const Space = ({width, height, colorW, colorH}: SpaceProps) => {
  if (!width && !height) {
    return null;
  }
  const scaleWidth = pw(width ?? 0);
  const scaleHeight = ph(height ?? 0);
  const fullScreen = '100%';
  const styleW: StyleProp<ViewStyle> = {
    backgroundColor: colorW,
    height: fullScreen,
    width: scaleWidth,
  };
  const styleH: StyleProp<ViewStyle> = {
    backgroundColor: colorH,
    width: fullScreen,
    height: scaleHeight,
  };

  return (
    <View
      style={[
        {
          width: scaleWidth,
          height: scaleHeight,
        },
        !!colorW && styleW,
        !!colorH && styleH,
      ]}
    />
  );
};
