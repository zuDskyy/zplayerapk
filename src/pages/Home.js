import React from 'react';
import {Image} from 'react-native';
import {ImageBackground, ScrollView} from 'react-native';
import {StyleSheet} from 'react-native';
import {Text, View} from 'react-native';

function Home() {
  return (
    <ImageBackground
      style={styles.backimg}
      source={require('./homeback2.jpg')}
      resizeMode="stretch">
      <ScrollView>
      <View style={styles.playerlogo}>
        <Image style={styles.imgplayer} source={require('./zpkplayer.png')} />
        <Text style={styles.logotext}>ZpkPlayer</Text>
      </View>
      <View style={{alignItems:"center",paddingTop:100}}>
         <Text style={styles.startText}>
           Get started using the custom player and enjoy a different UI
         </Text>
      </View>
      <View style={{alignItems:'center',  paddingTop: 100}}>
        <Image resizeMode="cover" style={styles.sportimg} source={require('./sportimg.png')} />
      </View>
       

        <View style={{alignItems:'center', paddingTop: 100}}>
            <Text style={styles.startText}> 
            Watch everything you want, all channels in one player
              </Text>
        </View>

      <View style={{alignItems:'center' }}>
        <Image resizeMode="center" style={styles.sportimg} source={require('./setanta.png')} />
      </View>
      </ScrollView>
    </ImageBackground>
  );
}

export default Home;

const styles = StyleSheet.create({
  logotext: {
    color: 'white',
    fontSize: 16,
    paddingLeft:4,
    fontWeight:600,
    fontFamily:'monospace',
  },
  backimg: {
    opacity:0.98,
    height: '100%',
  },
  playerlogo: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  imgplayer: {
    width: 32,
    height: 32,
  },
  startText:{
    color:'white',
    fontSize:18,
    padding:5,
    textAlign:'center',
    width:'80%'
    
  },
  sportimg:{
    width:'100%',
    height:300,
    borderRadius:50,
  }
});
