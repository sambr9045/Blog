import React from 'react';


const MainData = {
    headers: {
        "Content-Type": "application/json",
        Origin: "http://localhost:5173/", // Set this to your React app's URL
    }
}
const MainContext = React.createContext(MainData);

export default MainContext;