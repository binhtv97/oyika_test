// TODO: Waiting for StyleGuide from design
import {pw} from './metrics';

export const ANGLE_CENTER = {x: 0.5, y: 0.5};
export const DEFAULT_ANGLE = 135;
export const DEFAULT_DISABLED_OPACITY = 0.6;
export const OPACITY_VALUE_GRADIENT_TEXT = 0;
export const MAXIMUM_PERCENT = 100;
export const ACTIVE_OPACITY = 0.6;
export const ASPECT_RATIO = 1;
export const BORDER_WIDTH_05 = 0.5;
export const BORDER_WIDTH_07 = 0.7;
export const BORDER_WIDTH = 1;
export const END_REACHED_THRESHOLD = 16;
export const Z_INDEX = 1;
export const ELEVATION = 1;
export const NUMBER_OF_LINES = {
  ONE_LINE: 1,
  TWO_LINE: 2,
  THREE_LINE: 3,
};
export const REFERRAL_CARD = {
  RATING_DEFAULT: 0,
  NUMBER_OF_COMMENT: 0,
};
export const SHORT_CARD = {
  NUMBER_OF_FAVORITE: 0,
  NUMBER_OF_COMMENT: 0,
  RATING_DEFAULT: 0,
  INTERACT_BUTTON_WIDTH: '40%',
};
export const EDGES = ['top', 'left', 'right'];

export const BADGE = {
  SIZE_ICON_DEFAULT: pw(32),
  DISPLAY_DISTANCE: (size: number) => pw(size / 4),
};
