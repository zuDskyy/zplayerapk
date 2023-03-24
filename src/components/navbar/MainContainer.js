import * as React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Home from '../../pages/Home';
import Tv from '../../pages/Tv';

const homeName="Home"
const tvName="Tv"

const Tab = createBottomTabNavigator();

function MainContainer() {



  return (

     <NavigationContainer  >
        <Tab.Navigator  initialRouteName={homeName}
        
        screenOptions={ ({route}) => ({
          tabBarActiveTintColor: '#096d9a',
          tabBarInactiveTintColor: '#074875',
          tabBarActiveBackgroundColor: '#0a0a30',
          tabBarInactiveBackgroundColor: '#18172b',
          tabBarStyle: {
          backgroundColor: '#3E48A0',
           borderTopWidth: 0,
        },
            tabBarIcon: ({focused,color,size}) => {
                 let iconName;
                 let rn = route.name;
 
  
                  if(rn === homeName) {
                    iconName = focused ? 'home': 'home-outline'
                  }else if(rn === tvName){
                    iconName = focused ? 'tv': 'tv-outline'
                  }
                    return <Ionicons  name={iconName} size={size} color={color} />
            }, 
            
        })}
        
         >
            <Tab.Screen options={{headerShown: false}} name={homeName} component={Home}/>
            <Tab.Screen options={{headerShown: false}} name={tvName} component={Tv}/>
        </Tab.Navigator>
     </NavigationContainer>

  )
}

export default MainContainer