import {StyleSheet} from 'react-native';
import React from 'react';
import Container from '@components/Container';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from '@navigation/Types';
import RouteKey from '@navigation/RouteKey';
import * as yup from 'yup';
import {useYupValidationResolver} from '@hook/useYupValidationResolver';
import {FormProvider, useForm} from 'react-hook-form';
import {FormInput} from '@components/FormInput';
import {Space} from '@components/Space';
import {CustomButton} from '@components/Button';
import {colors} from '@themes/colors';
import {FontSizes} from '@themes/metrics';
import {
  NoteItem,
  getDBConnection,
  getNoteItems,
  saveNoteItems,
} from '@services/db';
import {showToast} from '@components/Toast';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch} from 'react-redux';
import {noteActions} from '@store/reducers';

type Props = NativeStackScreenProps<
  AppStackParamList,
  RouteKey.CreateNoteScreen
>;
const FormSchema = yup.object().shape({
  title: yup.string().required('Please enter input!'),
  note: yup.string().required('Please enter input!'),
});
type FormPayload = yup.InferType<typeof FormSchema>;

const CreateNote: React.FC<Props> = props => {
  const type = props.route.params.type;
  const item = props.route.params?.item;
  const dispatch = useDispatch();
  const formMethods = useForm<FormPayload>({
    resolver: useYupValidationResolver<FormPayload>(FormSchema),
    defaultValues: {
      title: type === 'add' ? '' : item?.title,
      note: type === 'add' ? '' : item?.note,
    },
  });
  const {handleSubmit} = formMethods;
  // this func to check network is connect or not
  const checkNetworkAndDeviceInfo = async (): Promise<boolean> => {
    return await NetInfo.fetch()
      .then(state => {
        if (state.isConnected) {
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        console.error('Error checking network status:', error);
        return false;
      });
  };

  const onSubmit = async (data: FormPayload) => {
    const db = await getDBConnection();
    const storedNoteItems = await getNoteItems(db);
    const result: NoteItem[] = [
      {
        id: type === 'add' ? storedNoteItems.length : (item?.id as number),
        title: data.title,
        note: data.note,
      },
    ];
    await saveNoteItems(db, result);
    const network = await checkNetworkAndDeviceInfo();

    if (network) {
      // call api
    } else {
      // store data into redux-persist
      dispatch(noteActions.onAddData(result[0]));
    }

    showToast({
      message: type === 'add' ? 'Create Success' : 'Edit Success',
      type: 'SUCCESS',
    });

    () => {
      db.close();
    };
  };
  return (
    <Container
      titileHeader={type === 'add' ? 'CREATE' : 'EDIT'}
      style={styles.container}>
      <FormProvider {...formMethods}>
        <FormInput name={'title'} title="Title" />
        <Space height={10} />
        <FormInput name={'note'} title="Note" description />
        <Space height={10} />
        <CustomButton
          label={[
            {
              text: type === 'add' ? 'Submit' : 'Save',
              style: styles.label,
            },
          ]}
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        />
      </FormProvider>
    </Container>
  );
};

export default CreateNote;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.greenDark,
  },
  label: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: FontSizes.large,
  },
});
