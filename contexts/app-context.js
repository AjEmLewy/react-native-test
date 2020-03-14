import React from 'react';
export const AppContext = React.createContext({
    loggedUserID: 0,
    logUser: (meh) => {},
    editting: {
        spotkanieID:1,
        date: "",
        groupID:1,
        title: "No jakiś tytuł"
    },
    setEditting: (id, date, groupID, title) => {}
})