
import React from 'react';
import { View } from 'react-native';
import { NativeRouter, Route, Routes } from 'react-router-native';
import MainContainer from './src/components/navbar/MainContainer';
import Channel from './src/pages/Channel'





function App() {
    
  return (
    <NativeRouter> 
     <View style={{height:'100%'}}>
    <Routes>
  
    <Route  path='/' element={<MainContainer/>}/>
     <Route path=':id' element={<Channel/>}/> 
   </Routes>



     </View>
      
     
    </NativeRouter>

     
  );   
}


export default App;
