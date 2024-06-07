import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Row} from '@components/Row';
import Container from '@components/Container';
import {navigate} from '@navigation/RootNavigation';
import RouteKey from '@navigation/RouteKey';

const MainScreen = () => {
  return (
    <Container hasBack={false}>
      <Row style={styles.row}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigate(RouteKey.TaskOneScreen)}>
          <Text>Task 1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigate(RouteKey.TaskTwoScreen)}>
          <Text>Task 2</Text>
        </TouchableOpacity>
      </Row>
    </Container>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  row: {
    justifyContent: 'space-around',
  },
  item: {
    width: 100,
    height: 100,
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
  },
});
