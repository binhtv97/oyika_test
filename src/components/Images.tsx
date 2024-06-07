import React from 'react';
import {Image, ImageStyle, StyleProp, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Images, pw} from '@themes';

export declare type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center';

export interface CustomImageProps {
  name?: keyof typeof Images;
  style?: StyleProp<ImageStyle>;
  resizeMode?: ResizeMode;
  uri?: string;
  requireFastImage?: boolean;
  tintColor?: string;
}

export const CustomImage = ({
  style,
  name,
  resizeMode = 'contain',
  uri,
  requireFastImage = false,
  tintColor,
}: CustomImageProps) => {
  if (requireFastImage) {
    if (uri) {
      return (
        <FastImage
          style={[styles.icon, style]}
          source={{uri: uri}}
          resizeMode={resizeMode}
          tintColor={tintColor}
        />
      );
    }
    return (
      <FastImage
        style={[styles.icon, style]}
        source={Images[name]}
        resizeMode={resizeMode}
        tintColor={tintColor}
      />
    );
  } else {
    if (uri) {
      return (
        <Image
          style={[styles.icon, style]}
          source={{
            uri: uri,
          }}
          resizeMode={resizeMode}
        />
      );
    }
    return (
      <Image
        style={[styles.icon, style]}
        source={Images[name]}
        resizeMode={resizeMode}
      />
    );
  }
};

const styles = StyleSheet.create({
  icon: {
    width: pw(30),
    height: pw(30),
  },
});
