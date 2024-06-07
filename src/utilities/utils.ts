/* eslint-disable no-useless-escape */
import {Dimensions, Linking, Platform, StatusBar} from 'react-native';
import {isIOS} from '@themes';

export function getStatusBarHeight(skipAndroid = false): number {
  if (isIOS) {
    return isIphoneX() ? 65 : 30;
  }
  if (skipAndroid) {
    return 0;
  }

  return StatusBar.currentHeight || 0;
}

export const PlatformVersion =
  typeof Platform.Version === 'string'
    ? parseInt(Platform.Version, 10)
    : Platform.Version;

export function isIphoneX(): boolean {
  const {width, height} = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    (height === 780 ||
      width === 780 ||
      height === 812 ||
      width === 812 ||
      height === 844 ||
      width === 844 ||
      height === 852 ||
      width === 852 ||
      height === 896 ||
      width === 896 ||
      height === 926 ||
      width === 926)
  );
}

export function isEmptyValues<T>(value: T): boolean {
  return (
    value === undefined ||
    value === 'undefined' ||
    value === null ||
    value === 'null' ||
    // isNaN(value) ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  );
}

export function openURL(url: string) {
  Linking.canOpenURL(url)
    .then(supported => {
      if (supported) {
        Linking.openURL(url)
          .then(value => {
            console.log('Linking.openURL', value);
          })
          .catch(err => {
            console.error('Linking.openURLAn error occurred', err);
          });
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    })
    .catch(err => {
      console.error('An error occurred', err);
    });
}

export function convertDistance(distance: number): string {
  if (distance >= 1000) {
    // Convert to kilometers and round to the nearest 100 meters
    const distanceInKilometers = Math.round(distance / 100) / 10;
    return `${distanceInKilometers}km`;
  } else {
    // Round to the nearest 100 meters
    const roundedDistance = Math.round(distance / 100) * 100;
    return `${roundedDistance < 100 ? '<100' : roundedDistance}m`;
  }
}

export function isNumber<T>(val: T): boolean {
  return typeof val === 'number';
}
export function isString<T>(val: T): boolean {
  return typeof val === 'string';
}
export function convertMoney(val: number, removeCharator?: string): string {
  if (!isNumber(val)) {
    return '0';
  }
  let money = Intl.NumberFormat(['en-US', 'zh-HK', 'vn-VN'], {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(val);
  if (removeCharator) {
    money = money.replace(removeCharator, '');
  }
  return money;
}
export function isTrue(value?: string | number | boolean | null): boolean {
  if (isString(value)) {
    return value === 'true' || value === 'True' || value === '1';
  }
  if (isNumber(value)) {
    return value === 1;
  }
  return !!value;
}

export function timeConverter(value: number): string {
  const hours = Math.floor(value / 3600);
  const minutes = Math.floor((value - hours * 3600) / 60);
  const seconds = value - hours * 3600 - minutes * 60;
  return `${hours < 1 ? '' : hours.toString().padStart(2, '0') + ':'}${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export function validateEmail(email: string): boolean {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function isObject<T>(val: T): boolean {
  return (
    typeof val === 'object' && val?.constructor !== FormData && val !== null
  );
}

export function convertNumberOfInteraction(value: number): string {
  if (!isNumber(value) || value === 0) {
    return '0';
  }
  const num = 1000;
  const UNITS: string[] = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
  const index = Math.floor(Math.log(value) / Math.log(num));
  const result = parseFloat((value / Math.pow(num, index)).toFixed(1));
  return result + `${UNITS[index]}`;
}

export function rgbToHex(r: number, g: number, b: number) {
  function componentToHex(c: number) {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

export function splitItemInListToRow(
  numberItemInRow: number,
  list: Array<any>,
) {
  const nextIndex = 1;
  const minNumberCondition = 0;
  return list.reduce(function (result: any, current, index) {
    if (index % numberItemInRow === minNumberCondition) {
      result.push([]);
    }
    result[result.length - nextIndex] =
      result[result.length - nextIndex].concat(current);
    return result;
  }, []);
}

export const tabBarLabel = (title: string, amount = '0'): string =>
  parseInt(amount, 10) === 0 ? title : `${amount} ${title}`;

export const validIndex = (index: number, arr: Array<any>) =>
  index >= 0 && index < arr?.length;

export const convertDurationFromSecondsToMinutes = (second: number): string => {
  if (!second || second === 0) {
    return '0.00';
  }
  return (second - (second %= 60)) / 60 + (9 < second ? ':' : ':0') + second;
};

export const keyExtractor = (_: unknown, index: number) => index.toString();
