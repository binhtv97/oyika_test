import React from 'react';
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleProp,
  View,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {Header} from './Header';
import {ButtonItemProps} from './ButtonGroup';
import {colors} from '@themes';

export interface IContainer {
  isFullScreen?: boolean;
  isShowHeader?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  titileHeader?: string;
  hasBack?: boolean;
  headerStyle?: StyleProp<ViewStyle>;
  iconRight?: ButtonItemProps[];
  iconLeft?: ButtonItemProps[];
  onLeftPress?: () => void;
  isRequireDismisKeybarod?: boolean;
  headerChildrenRight?: React.ReactNode;
  headerContainer?: StyleProp<ViewStyle>;
}

const Container = ({
  isFullScreen = false,
  isShowHeader = true,
  children,
  style,
  containerStyle,
  titileHeader = '',
  hasBack = true,
  headerStyle = {},
  iconRight = [],
  iconLeft = [],
  onLeftPress,
  isRequireDismisKeybarod = false,
  headerChildrenRight = null,
  headerContainer,
}: IContainer) => {
  const renderBody = () => (
    <View style={[styles.flex]}>
      {isShowHeader && (
        <Header
          title={titileHeader}
          iconLeft={iconLeft}
          iconRight={iconRight}
          headerStyle={headerStyle}
          style={headerContainer}
          hasBack={hasBack}
          onLeftPress={onLeftPress}
          childrenRight={headerChildrenRight}
        />
      )}
      <View style={[styles.flex, style]}>{children}</View>
    </View>
  );

  if (isFullScreen) {
    return <View style={[styles.container]}>{renderBody()}</View>;
  }
  return (
    <SafeAreaView style={[styles.container, containerStyle]}>
      {isRequireDismisKeybarod ? (
        <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
          {renderBody()}
        </Pressable>
      ) : (
        renderBody()
      )}
    </SafeAreaView>
  );
};

export default Container;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  flex: {
    flex: 1,
  },
});
