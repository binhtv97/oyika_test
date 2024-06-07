import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ViewProps,
  TouchableOpacityProps,
} from 'react-native';

interface IBaseRow {
  isPressAble?: boolean;
}
interface RowViewProps extends ViewProps, IBaseRow {}
interface RowTouchProps extends TouchableOpacityProps, IBaseRow {}

type RowProps = RowViewProps | RowTouchProps;

export const Row: React.FC<RowProps> = ({
  style,
  children,
  isPressAble = false,
  ...rest
}) => {
  if (isPressAble) {
    return (
      <TouchableOpacity
        {...(rest as TouchableOpacityProps)}
        style={[styles.row, StyleSheet.flatten(style)]}>
        {children}
      </TouchableOpacity>
    );
  }
  return (
    <View {...(rest as ViewProps)} style={[styles.row, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});
