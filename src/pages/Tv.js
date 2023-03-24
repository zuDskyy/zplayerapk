import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, ScrollView, TextInput} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigate} from 'react-router-native';
import {SliceFetch} from '../SliceFetch';

function Tv() {
  const {filtdata, isLoading} = SliceFetch();

  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filterData = filtdata.filter(val => {
    if (searchTerm === '') {
      return val;
    } else if (
      val.tvname.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())
    ) {
      return val;
    }
  });

  return (
    <View style={{backgroundColor: '#18172b', height: '100%'}}>
      <View style={{alignItems: 'center', paddingTop: 20}}>
        <View style={styles.listContainer}>
          <Fontisto name="play-list" style={styles.listbutton}></Fontisto>
          <Text style={{color: '#07333c', fontSize: 18}}> Channel List</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <TextInput
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          placeholder="Search Channel"
          style={styles.input}
        />
      </View>
      <ScrollView>
        <View style={{height: '88%'}}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
           filterData.map(item => 
           <Text key={item.id} onPress={() => navigate(`/${item.id}`)} style={styles.listText}>
      <MaterialCommunityIcons name="youtube-tv" style={styles.listIcon} />
      {item.tvname}
    </Text>) 
          )}
        </View>
        </ScrollView>
      
    </View>
  );
}

export default Tv;

const styles = StyleSheet.create({
  listContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '50%',

    borderWidth: 0.7,
    padding: 6,
    borderColor: '#07333c',
    borderRadius: 10,
  },
  listbutton: {
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#07333c',
    opacity: 0.9,
    padding: 8,
    fontSize: 15,
    borderRadius: 50,
  },
  listIcon: {
    color: '#096d9a',
    textAlign: 'center',
    opacity: 0.9,
    padding: 8,
    fontSize: 15,
    borderRadius: 50,
  },
  listText: {
    color: 'white',
    padding: 12,
    fontSize: 15,
    fontFamily: 'fantasy',
    borderBottomWidth: 1,
    borderBottomColor: '#096d9a',
  },
  input: {
    height: 40,
    margin: 12,
    width: '70%',
    padding: 10,
    color: 'white',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
});
