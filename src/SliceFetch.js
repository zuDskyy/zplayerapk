import React, { useEffect, useState } from 'react'

export const SliceFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading,setLoading]=useState(true);
    const [error, setError] = useState([]);
    const getList = async () => {
        try {
          const response = await fetch('https://m3u-server.herokuapp.com/');
          const json = await response.json();
          setData(json)
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      useEffect(() => {getList()}, []);
  
  
      const tvregex = /.*,/g;
      const groupregex = item => item.title.match(/.*group-title="/g);
      const tvname = item => item.title.replace(tvregex, '');
      const group = item => item.title.replace(groupregex(item), '').split(',');
      const filtdata = data.map((item, index) => ({
        ...item,
        id: index + 1,
        group: {groupname: group(item)},
        tvname: tvname(item),
      }));
  
      return  {filtdata,error,isLoading}



}


