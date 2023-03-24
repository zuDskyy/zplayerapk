import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigate, useParams} from 'react-router-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {SliceFetch} from '../SliceFetch';
import M3uplayer from './M3uplayer';

function Channel() {
  const navigate = useNavigate();
  const {id} = useParams();
  const [display, setDisplay] = useState(false);

  const {filtdata, isLoading} = SliceFetch();
  const data = filtdata.filter(item => item.id == id);

  return (
    <View>
      {data.map(item => (
        <View
          key={item.id}
          style={styles.headerView}>
          <View
            style={display ? styles.viewHiden : styles.infoView}>
            <Entypo
              onPress={() => navigate(-1)}
              name="arrow-left"
              size={30}
              color={'white'}
            />
            <Text style={{color: 'white', padding: 12, fontSize: 16}}>
              {item.tvname}
            </Text>
          </View>

          <M3uplayer uri={item.file}  setDisplay={setDisplay}/>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#18172b',
    height: '100%',
  },
  infoView: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewHiden:{
    display:"none",
  }
});

export default Channel;
