import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

export interface NoteItem {
  title: string;
  note: string;
  id: number;
}
const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'todo-data.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        title TEXT NOT NULL,
        note TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getNoteItems = async (db: SQLiteDatabase): Promise<NoteItem[]> => {
  try {
    const noteItems: NoteItem[] = [];
    const results = await db.executeSql(
      `SELECT rowid as id,title,note FROM ${tableName}`,
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        noteItems.push(result.rows.item(index));
      }
    });
    return noteItems;
  } catch (error) {
    throw Error('Failed to get noteItems !!!');
  }
};

export const saveNoteItems = async (
  db: SQLiteDatabase,
  noteItems: NoteItem[],
) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, title, note) values` +
    noteItems.map(i => `(${i.id}, '${i.title}', '${i.note}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteNoteItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};

export const closeConnection = (db: SQLiteDatabase) => {
  db.close();
};
