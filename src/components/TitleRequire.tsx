import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Row} from './Row';
import {Space} from './Space';
import {FontSizes, metrics, ph, pw} from '@themes/metrics';
import {colors} from '@themes/colors';

export interface TitleRequireProps {
  requireOption?: boolean;
  title?: string;
}
const TitleRequire = ({title, requireOption}: TitleRequireProps) => {
  return (
    <View>
      <Row>
        <Text style={styles.title}>{title}</Text>
        <Space width={5} />
        {requireOption && (
          <View style={styles.reqV}>
            <Text style={styles.required}>必須</Text>
          </View>
        )}
      </Row>
    </View>
  );
};

export default TitleRequire;

const styles = StyleSheet.create({
  required: {fontSize: FontSizes.tiny},
  reqV: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: pw(5),
    backgroundColor: colors.sky,
    paddingVertical: ph(2),
    borderRadius: metrics.borderRadiusLarge,
  },
  title: {fontSize: FontSizes.regular},
});
