import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import Container from '@components/Container';
import {
  NoteItem,
  createTable,
  getDBConnection,
  getNoteItems,
  saveNoteItems,
  deleteNoteItem,
} from '@services/db';
import {Row} from '@components/Row';
import {colors} from '@themes/colors';
import {CustomImage} from '@components/Images';
import {SQLiteDatabase} from 'react-native-sqlite-storage';
import {navigate} from '@navigation/RootNavigation';
import RouteKey from '@navigation/RouteKey';
import {useFocusEffect} from '@react-navigation/native';

const TaskTwo = () => {
  const [data, setData] = useState<NoteItem[]>([]);
  const [renderData, setRenderData] = useState<NoteItem[]>([]);
  const [database, setDatabase] = useState<SQLiteDatabase | null>(null);
  const keyExtractor = useCallback((item: NoteItem) => item.id.toString(), []);
  const [isLoadmore, setIsLoadMore] = useState(false);
  const loadDataCallback = useCallback(async () => {
    try {
      const initTodos: NoteItem[] = [
        {id: 0, title: 'go to shop', note: 'Buy Milk'},
        {
          id: 1,
          title: 'eat at least a one healthy foods',
          note: 'Eat Chicken at dinner',
        },
        {id: 2, title: 'Do some exercises', note: 'Do Math'},
      ];
      const db = await getDBConnection();
      setDatabase(db);
      await createTable(db);
      const storedNoteItems = await getNoteItems(db);

      if (storedNoteItems.length) {
        setData(storedNoteItems);
        setRenderData(prevData => [
          ...prevData,
          ...storedNoteItems.slice(prevData.length, prevData.length + 50),
        ]);
      } else {
        await saveNoteItems(db, initTodos);
        setData(initTodos);
      }
    } catch (error) {}
  }, []);
  // get data when goback
  useFocusEffect(
    React.useCallback(() => {
      loadDataCallback();
    }, [loadDataCallback]),
  );

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

  const onDeleteItem = (id: number) => {
    if (database) {
      deleteNoteItem(database, id);
      setRenderData(prevData => {
        return prevData.filter(item => item.id !== id);
      });
    }
  };
  const renderItem = ({item}: {item: NoteItem}) => (
    <Row style={styles.item}>
      <View style={styles.itemLeft}>
        <Text>Title:{item.title}</Text>
        <Text>Note:{item.note}</Text>
      </View>
      <View style={styles.itemRight}>
        <Row style={styles.rightRow}>
          <TouchableOpacity
            onPress={() =>
              navigate(RouteKey.CreateNoteScreen, {
                type: 'edit',
                item: item,
              })
            }>
            <CustomImage name="edit" style={{tintColor: colors.greenDark}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onDeleteItem(item.id)}>
            <CustomImage name="delete" style={{tintColor: colors.redDark}} />
          </TouchableOpacity>
        </Row>
      </View>
    </Row>
  );

  const renderFooter = () => {
    if (!isLoadmore || renderData.length < 10) return null;
    return <ActivityIndicator color={'#000'} />;
  };
  return (
    <Container
      titileHeader="TASK TWO"
      style={styles.container}
      iconRight={[
        {
          icon: 'add',
          onPress: () =>
            navigate(RouteKey.CreateNoteScreen, {
              type: 'add',
            }),
        },
      ]}>
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
    </Container>
  );
};

export default TaskTwo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  item: {
    height: 80,
    borderTopWidth: 0.5,
    borderTopColor: colors.skyDark,
  },
  itemLeft: {
    flex: 2,
    justifyContent: 'center',
  },
  itemRight: {
    flex: 1,
  },
  rightRow: {justifyContent: 'center', alignItems: 'center', flex: 1},
});
