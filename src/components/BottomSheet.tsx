import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {BottomSheetModal as BaseSheetModal} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';
import {BottomSheetModalProps} from '@gorhom/bottom-sheet/src/components/bottomSheetModal/types';
import {colors, getColorOpacity} from '@themes';
import {useBackHandler} from '@hook';
import {DEFAULT_OPACITY} from '@constants';

interface IBottomSheetModal extends BottomSheetModalProps {
  children: React.ReactNode;
  onClose?: () => void;
  snapPoints: Array<string>;
  enablePanDownToClose?: boolean;
}
export type BottomSheetModalRef = {
  open: () => void;
  close: () => void;
  isOpen: boolean;
};
export const BottomSheetModal = memo(
  forwardRef<BottomSheetModalRef, IBottomSheetModal>(
    (
      {
        children,
        handleIndicatorStyle,
        backgroundStyle,
        containerStyle,
        onClose,
        snapPoints,
        enablePanDownToClose = true,
        ...rest
      },
      ref,
    ) => {
      const [isOpen, setIsOpen] = React.useState(false);
      const bottomSheetRef = useRef<BaseSheetModal>(null);
      const open = useCallback(() => {
        setIsOpen(true);
        bottomSheetRef.current?.present();
      }, []);
      const close = useCallback(() => {
        setIsOpen(false);
        bottomSheetRef.current?.close();
      }, []);

      useBackHandler(() => {
        if (isOpen) {
          close();
          return true;
        }
        return false;
      });

      useImperativeHandle(
        ref,
        () => ({
          open,
          isOpen,
          close,
        }),
        [close, open, isOpen],
      );

      const handleClose = useCallback(() => {
        onClose?.();
        close();
      }, [onClose, close]);

      return (
        <BaseSheetModal
          ref={bottomSheetRef}
          keyboardBlurBehavior={'restore'}
          onDismiss={handleClose}
          backgroundStyle={[
            styles.backgroundStyle,
            StyleSheet.flatten(backgroundStyle),
          ]}
          handleIndicatorStyle={[
            styles.handleIndicatorStyle,
            StyleSheet.flatten(handleIndicatorStyle),
          ]}
          containerStyle={[
            styles.containerModal,
            StyleSheet.flatten(containerStyle),
          ]}
          snapPoints={snapPoints}
          enablePanDownToClose={enablePanDownToClose}
          {...rest}>
          {children}
        </BaseSheetModal>
      );
    },
  ),
);

const styles = StyleSheet.create({
  containerModal: {
    backgroundColor: getColorOpacity(colors.ink, DEFAULT_OPACITY),
  },
  backgroundStyle: {
    backgroundColor: colors.white,
  },
  handleIndicatorStyle: {
    backgroundColor: colors.inkDark,
  },
});
