import {
  Keyboard,
  KeyboardAvoidingView,
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {isIOS} from '@themes/metrics';

interface KeyBoardAvoidWrapperProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  dismiss?: boolean;
}

export const KeyBoardAvoidWrapper: React.FC<KeyBoardAvoidWrapperProps> = ({
  children,
  style,
  dismiss,
}) => (
  <KeyboardAvoidingView
    style={styles.keyboardContainer}
    keyboardVerticalOffset={100}
    behavior={isIOS ? 'padding' : 'height'}>
    {dismiss ? (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, StyleSheet.flatten(style)]}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    ) : (
      children
    )}
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  keyboardContainer: {flex: 1, width: '100%'},
  container: {
    flex: 1,
  },
});
