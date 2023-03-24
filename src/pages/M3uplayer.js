import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  Dimensions,
  TouchableNativeFeedback,
  Text,
  StatusBar,
} from 'react-native';
import Video from 'react-native-video';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';


const {width, height} = Dimensions.get('window');
Icon.loadFont();
let overlayTimer;
let Timer;
const M3uplayer = ({uri,setDisplay}) => {
  let lastTap = null;
  const [Fullscreen, setFullscreen] = useState(false);
  const [paused, setpaused] = useState(false);
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setduration] = useState(0.1);
  const [overlay, setoverlay] = useState(false);
  const playerRef = useRef();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  const backAction = () => {
    return true;
  };

  const FullscreenToggle = () => {
    if (Fullscreen) {
      Orientation.lockToPortrait();
      StatusBar.setHidden(false);
      setDisplay(false)
      setFullscreen(false);
    } else {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
       setDisplay(true);
      setFullscreen(true);
    }
  };

  const handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      clearTimeout(Timer);
      doubleTapCallback();
    } else {
      lastTap = now;
      Timer = setTimeout(() => {
        singleTapCallback();
      }, DOUBLE_PRESS_DELAY);
    }
  };

  const ShowHideOverlay = () => {
    handleDoubleTap(
      () => {},
      () => {
        setoverlay(true);
        overlayTimer = setTimeout(() => setoverlay(false), 5000);
      },
    );
  };
  const backward = () => {
    playerRef.current.seek(currentTime - 5);
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(() => setoverlay(false), 3000);
  };
  const forward = () => {
    playerRef.current.seek(currentTime + 5);
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(() => setoverlay(false), 3000);
  };
  const onslide = slide => {
    playerRef.current.seek(slide * duration);
    clearTimeout(overlayTimer);
    overlayTimer = setTimeout(() => setoverlay(false), 3000);
  };
  const getTime = t => {
    const digit = n => (n < 10 ? `0${n}` : `${n}`);
    const sec = digit(Math.floor(t % 60));
    const min = digit(Math.floor((t / 60) % 60));
    const hr = digit(Math.floor((t / 3600) % 60));
    return min + ':' + sec;
  };
  const load = ({duration}) => setduration(duration);
  const progress = ({currentTime}) => setcurrentTime(currentTime);
  return (
    <View style={styles.container}>
      <View style={Fullscreen ? styles.fullscreenVideo : styles.video}>
        <Video
          source={{uri: `${uri}`}}
          style={{...StyleSheet.absoluteFill}}
          ref={playerRef}
          paused={paused}
          repeat={true}
          onLoad={load}
          onProgress={progress}
          resizeMode={'cover'}
          rate={1.0}
        />
        <View style={styles.overlay}>
          {overlay ? (
            <View
              style={{
                ...styles.overlaySet,
                backgroundColor: '#0006',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View style={{width: 50, height: 50}}>
                <Icon name="replay-5" style={styles.icon} onPress={backward} />
              </View>
              <View style={{width: 50, height: 50}}>
                <Icon
                  name={paused ? 'play-arrow' : 'pause'}
                  style={styles.icon}
                  onPress={() => setpaused(!paused)}
                />
              </View>
              <View style={{width: 50, height: 50}}>
                <Icon name="forward-5" style={styles.icon} onPress={forward} />
              </View>
              <View style={styles.sliderCont}>
                <View style={{...styles.timer, alignItems: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{color: 'white'}}>
                      {getTime(currentTime)}/
                    </Text>
                    <Text style={{color: 'white'}}>{getTime(duration)}</Text>
                  </View>
                  <View style={{margin: 5}}>
                    <Icon
                      onPress={FullscreenToggle}
                      name={Fullscreen ? 'fullscreen' : 'fullscreen-exit'}
                      style={{fontSize: 20, color: 'white'}}
                    />
                  </View>
                </View>
                <Slider
                  style={{margin: 5}}
                  maximumTrackTintColor="white"
                  minimumTrackTintColor="white"
                  thumbTintColor="white"
                  value={currentTime / duration}
                  onValueChange={onslide}
                />
              </View>
            </View>
          ) : (
            <View style={styles.overlaySet}>
              <TouchableNativeFeedback onPress={ShowHideOverlay}>
                <View style={{flex: 1}} />
              </TouchableNativeFeedback>
            </View>
          )}
        </View>
      </View>

    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {width, height: width * 0.6, backgroundColor: 'black'},
  fullscreenVideo: {
    ...StyleSheet.absoluteFill,
    elevation: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  overlaySet: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 25,
  },
  TextStyle: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 100,
    color: '#6200ee',
    fontWeight: 'bold',
  },
  sliderCont: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  timer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
});
export default M3uplayer;
