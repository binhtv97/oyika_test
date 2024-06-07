import React, {memo} from 'react';
import {Controller, Path, useFormContext} from 'react-hook-form';
import Input, {InputProps} from '../components/Input';
import {View, StyleProp, TextStyle} from 'react-native';
import {Space} from './Space';
import TitleRequire from './TitleRequire';

export interface FormInputProps<T> extends InputProps {
  name: Path<T>;
  title?: string;
  requireOption?: boolean;
  style?: StyleProp<TextStyle>;
}
export const formInputMemo: <T>(component: T) => T = memo;
export const FormInput = formInputMemo(
  <T extends object = object>({
    name,
    title,
    requireOption,
    style,
    ...rest
  }: FormInputProps<T>) => {
    const {control} = useFormContext<T>();

    return (
      <View>
        {title && <TitleRequire title={title} requireOption={requireOption} />}
        <Space height={5} />
        <Controller
          control={control}
          name={name}
          render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
            <Input
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              errorText={(error?.message || error?.type) ?? ''}
              style={style}
              {...rest}
            />
          )}
        />
      </View>
    );
  },
);
