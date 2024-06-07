import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ButtonItemProps, ButtonGroup} from './ButtonGroup';
import {pf, ph, pw} from '@themes';
import {goBack} from '@navigation/RootNavigation';

export interface HeaderProps {
  title: string;
  iconLeft?: ButtonItemProps[];
  iconRight?: ButtonItemProps[];
  headerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  hasBack?: boolean;
  onLeftPress?: () => void;
  childrenRight?: React.ReactNode;
}
export const Header = ({
  title = '',
  iconLeft,
  iconRight = [],
  headerStyle,
  hasBack = true,
  onLeftPress,
  childrenRight = null,
  style,
}: HeaderProps) => {
  const backIcon: ButtonItemProps = {
    icon: 'ic_back',
    buttonStyle: styles.icon_back,
    onPress: onLeftPress ? () => onLeftPress() : () => goBack(),
  };

  return (
    <View style={[styles.headerContainer, StyleSheet.flatten(style)]}>
      <View style={{flex: 2}}>
        <ButtonGroup
          style={styles.leftView}
          item={hasBack ? iconLeft?.concat([backIcon]) : iconLeft}
        />
      </View>
      <View style={[styles.container, headerStyle]}>
        <Text style={[styles.header]}>{title} </Text>
      </View>
      <View style={{flex: 2}}>
        {childrenRight ? (
          childrenRight
        ) : (
          <ButtonGroup item={iconRight} style={styles.rightView} />
        )}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  header: {
    fontSize: pf(20),
    fontWeight: '700',
  },
  secondLeftIconRight: {
    width: pw(20),
    height: ph(20),
    marginLeft: pw(4),
  },
  firstLeftIonStyle: {
    width: pw(20),
    height: ph(20),
    marginLeft: pw(10),
  },
  icon_back: {
    width: pw(20),
    height: ph(20),
  },
  headerContainer: {
    width: '100%',
    height: ph(45),
    flexDirection: 'row',
    paddingHorizontal: pw(10),
  },
  leftView: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: pw(11),
  },
  container: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
