import React from 'react';
const Context = React.createContext({
    token: null, 
    userId: null, 
    login: ()=> {},
    logout: ()=> {},
    isAuthenticated: false,
});
export default Context;