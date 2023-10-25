import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        currentUser: null,
        regesteredUsers: []
    },
    reducers: {
        registerNewUser: (state, action)=>{
            state.regesteredUsers = [...state.regesteredUsers, action.payload];
            //state.readLater = [...state.readLater, {userId: action.payload.userId, articles : []}]
        },
        setCurrentUser: (state, action)=>{
            state.currentUser = action.payload;
        },
        removeCurrentUser: (state)=>{
            state.currentUser = null;
        },
        removeRegesteredUser: (state, action)=>{
            state.regesteredUsers = state.regesteredUsers.filter(x=>{return(x.userId !== action.payload.userId)})
        },
        updateCurrentUser: (state, action)=>{
            debugger
            state.regesteredUsers = state.regesteredUsers.filter(x=>{return(x.userId !== action.payload.userId)});
            state.regesteredUsers = [...state.regesteredUsers, action.payload];
            state.currentUser = action.payload
        },
        addReadLater: (state, action)=>{
            let currentUserData = state.regesteredUsers.find(x=>{return(x.userId === state.currentUser.userId)});
            currentUserData.articles = [...currentUserData.articles, action.payload];
            state.regesteredUsers = state.regesteredUsers.filter(x=>{return(x.userId !== state.currentUser.userId)});
            state.regesteredUsers = [...state.regesteredUsers, currentUserData];
        },
        removeReadLater: (state, action)=>{
            let currentUserData = state.regesteredUsers.find(x=>{return(x.userId === state.currentUser.userId)});
            currentUserData.articles = currentUserData?.articles?.filter(x=>{return(x.slug_name !== action.payload)})
            state.regesteredUsers = state.regesteredUsers.filter(x=>{return(x.userId !== state.currentUser.userId)});
            state.regesteredUsers = [...state.regesteredUsers, currentUserData];
        }
    }
})

export const {registerNewUser, removeCurrentUser, removeRegesteredUser, setCurrentUser, addReadLater, removeReadLater, updateCurrentUser} = usersSlice.actions
export const getCurrentUser = (state)=> state.users.currentUser
export const getAllUsers = (state)=> state.users.regesteredUsers
export const getCurrentReadLater = (state)=> { return (state.users.regesteredUsers.find(x=>{ return(x.userId === state.users.currentUser.userId)})?.articles)}
export default usersSlice.reducer