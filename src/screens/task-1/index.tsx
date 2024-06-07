import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {appActions} from '@store/reducers';
import {getTaskOneData} from '@store/selectors/app';
import {ITaskOneItem} from '@store/types';
import Container from '@components/Container';

const TaskOne = () => {
  const data = useSelector(getTaskOneData);
  const [renderData, setRenderData] = useState<ITaskOneItem[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoadmore, setIsLoadMore] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(appActions.getTaskOneData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setRenderData(data.slice(0, 50));
    setIsFetching(false);
  }, [data]);

  const loadMoreItems = () => {
    if (isLoadmore) return;

    setIsLoadMore(true);
    setTimeout(() => {
      setRenderData(prevData => [
        ...prevData,
        ...data.slice(prevData.length, prevData.length + 50),
      ]);
      setIsLoadMore(false);
    }, 1500);
  };

  const renderItem = ({item}: {item: ITaskOneItem}) => (
    <View style={styles.item}>
      <Text>Title: {item.title}</Text>
      <Text>Id: {item.id}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!isLoadmore) return null;
    return <ActivityIndicator color={'#000'} />;
  };

  const keyExtractor = useCallback(
    (item: ITaskOneItem) => item.id.toString(),
    [],
  );

  return (
    <Container titileHeader="TASK ONE">
      {isFetching && <ActivityIndicator color={'#000'} />}
      {!isFetching && (
        <FlatList
          data={renderData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={loadMoreItems}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          initialNumToRender={10}
          windowSize={5}
        />
      )}
    </Container>
  );
};

export default TaskOne;

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
