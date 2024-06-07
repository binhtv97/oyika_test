import {
  ImageProps,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {forwardRef, useState} from 'react';
import {BORDER_WIDTH_05, Images, colors, metrics, ph, pw} from '@themes';
import {CustomImage} from './Images';
import {Error} from './ErrorText';

export interface InputProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  onChangeText?: (str: string) => void;
  onRemove?: () => void;
  password?: boolean;
  iconSend?: boolean;
  iconClose?: boolean;
  error?: boolean;
  placeholder?: string;
  editable?: boolean;
  errorText?: string;
  errorProps?: TextProps;
  description?: boolean;
  icon?: keyof typeof Images;
  iconStyle?: ImageProps;
  heightDescription?: number;
}

// eslint-disable-next-line react/display-name
const Input = forwardRef<TextInput, InputProps>(
  (
    {
      style,
      value,
      onChangeText,
      onRemove,
      password,
      iconClose = true,
      iconSend = false,
      error,
      placeholder,
      editable,
      errorText,
      iconStyle,
      errorProps,
      description,
      icon,
      heightDescription,
      ...rest
    },
    ref,
  ) => {
    const [statusEye, setStatus] = useState<boolean>(true);

    const onChangeStatus = () => {
      setStatus(pre => !pre);
    };
    return (
      <View style={styles.inputContainer}>
        <View style={[styles.container, style]}>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            style={[
              styles.input,
              error && {borderColor: colors.red},
              style,
              description && {height: heightDescription || metrics.enormous},
            ]}
            secureTextEntry={password && statusEye}
            placeholder={placeholder}
            placeholderTextColor={colors.sky}
            editable={editable}
            multiline={description}
            ref={ref}
            {...rest}
          />
          {iconClose && (
            <TouchableOpacity style={styles.position} onPress={onRemove}>
              <CustomImage name="ic_close" style={styles.close} />
            </TouchableOpacity>
          )}
          {password && (
            <TouchableOpacity
              style={[styles.position]}
              onPress={onChangeStatus}>
              <CustomImage
                name={statusEye ? 'ic_eye_off' : 'ic_eye'}
                style={[styles.close, iconStyle]}
              />
            </TouchableOpacity>
          )}
          {iconSend && (
            <TouchableOpacity style={styles.position} onPress={onRemove}>
              <CustomImage name="ic_sent" style={styles.send} />
            </TouchableOpacity>
          )}
          {icon && (
            <TouchableOpacity style={styles.position} onPress={onRemove}>
              <CustomImage name={icon} style={[styles.send, iconStyle]} />
            </TouchableOpacity>
          )}
        </View>
        {!!errorText && <Error errorProps={errorProps} errorText={errorText} />}
      </View>
    );
  },
);

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    gap: metrics.tiny,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    borderColor: colors.sky,
    borderWidth: BORDER_WIDTH_05,
    borderRadius: pw(7),
    minHeight: ph(50),
    paddingHorizontal: pw(5),
    paddingVertical: ph(1),
    backgroundColor: colors.white,
  },
  input: {
    width: '90%',
    backgroundColor: colors.white,
    height: ph(47),
    paddingHorizontal: pw(5),
    borderRadius: pw(7),
  },
  close: {
    width: pw(15),
    height: pw(15),
    resizeMode: 'contain',
  },
  send: {
    width: metrics.iconSmall,
    height: metrics.iconSmall,
    tintColor: colors.white,
  },
  position: {
    position: 'absolute',
    right: '5%',
  },
});
