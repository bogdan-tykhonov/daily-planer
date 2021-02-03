import {useCallback, useEffect, useState, useContext} from 'react';
import Context from '../Components/Context';
export const useTasks = () => {
    const auth = useContext(Context);
    const getTasks = useCallback(()=> {
        request(
         "/api/tasks/getTasks",
         "POST",
         null,
         {authorization: `Bearer ${auth.token}` }
       );
  });

  useEffect(()=>{
      let tasks = getTasks();
      console.log(tasks);
  }, [getTasks]);
 
 
 
  const request = (url, method, body = null, headers = {}) => {
     if (body) {
       body = JSON.stringify(body);
     }
     fetch(url, { method, body, headers })
       .then((res) => res.json())
       .then(
         (result) => {
          console.log(result);
            return result;
         },
         (error) => {
           console.log({ error: error });
         }
       );
     };

     return {getTasks};
}