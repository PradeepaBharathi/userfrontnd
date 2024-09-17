import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const base_url = 'https://userbackend-5war.onrender.com';


const getToken = () => {
  return localStorage.getItem('token'); 
};




export const fetchUsers = createAsyncThunk(
    "users",
    async(formData,{rejectWithValue})=>{
        console.log(formData)
        try {
            const token = getToken();
            if (!token) {
              throw new Error("No token found");
            }
            console.log(token)
            const storedUser = localStorage.getItem("user");
            const user = JSON.parse(storedUser);
            
            const response = await axios.get(`${base_url}/usersList/getUsers`, {
                headers: {
                  'x-auth-token': token 
                }
              });
              console.log(response.data.UsersList);
              return response.data.UsersList    
        } catch (error) {
      return rejectWithValue(error.response.data);
            
        }
    }
)

export const fetchUserById = createAsyncThunk(
    'fetchUserById',
    async ({userid}, { rejectWithValue }) => {
      try {
        const token = getToken();
        if (!token) {
          throw new Error("No token found");
        }
        const response = await fetch(`${base_url}/usersList/userId/${userid}`, {
          method: 'GET',
          headers: {
            'x-auth-token': token
          }
        });
        const data = await response.json();
        console.log(data);
        return data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
export const editUser = createAsyncThunk(
    "editProfile",
    async ({userId,formData}, { rejectWithValue }) => {
      try {
        const token = getToken();
        console.log(token)
        if (!token) {
          throw new Error("No token found");
        }
      
    
        const response = await axios.put(
          `${base_url}/usersList/editUser/${userId}`,
          formData, 
          {
            headers: {
              'x-auth-token': token,
              'Content-Type': 'application/json', 
            },
          }
        );
  

        return response.data.user; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  export const DeleteUser = createAsyncThunk(
    "DeleteProfile",
    async ({userId}, { rejectWithValue }) => {
      try {
        const token = getToken();
        console.log(token)
        if (!token) {
          throw new Error("No token found");
        }
      console.log(userId)
    
        const response = await axios.delete(
          `${base_url}/usersList/deleteUser/${userId}`,
           
          {
            headers: {
              'x-auth-token': token,
              'Content-Type': 'application/json', 
            },
          }
        );
        console.log(response.data);


        return response.data.user; 
      } catch (error) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
const getUserSlice = createSlice({
    name:"profiles",
    initialState:{
        loading:false,
        users:[],
  
        error:null,
      fetchProfileStatus: 'idle', 
        
    },
    reducers: {
       resetFetchProfileStatus:(state)=>{
        state.fetchProfileStatus='idle'
       }
    },
    extraReducers:(builder)=>{
        builder

        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading= false;
            state.users = action.payload
            state.fetchProfileStatus='succeeded'
            toast.success("Profile details fetched")

        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;  
        toast.error(action.payload.message || "Unable to Edit!");

        })
        .addCase(fetchUserById.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchUserById.fulfilled,(state,action)=>{
            state.loading= false;
            state.users = action.payload
            state.fetchProfileStatus='succeeded'
            toast.success("Users Fetched")
        })
        .addCase(fetchUserById.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;  
        toast.error(action.payload.message || "Unable to Fetch!");

        })
        .addCase(editUser.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(editUser.fulfilled,(state,action)=>{
            state.loading= false;
            state.users = action.payload
            state.fetchProfileStatus='succeeded'
            toast.success("Users Edited")
        })
        .addCase(editUser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;  
        toast.error(action.payload.message || "Unable to Edit!");

        })
     
    }
})

export default getUserSlice.reducer