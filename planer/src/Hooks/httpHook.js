import {useState} from 'react';

export const useHttp = () => {
    const request = (url, method="POST", body = null, headers = {}) => {
        fetch(url, {method, body, headers})
        .then(res => res.json())
        .then((result) => {console.log(result)},
        (error) =>{
            console.log(error);
        }
        )
    }
}