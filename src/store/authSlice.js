import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { REQ_URL } from "../components/Util/constants";
import axios from "axios";
import jwt_decode from "jwt-decode";

const URL = REQ_URL;
export const me = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  const token = JSON.parse(window.localStorage.getItem("token"));
  if (token) {
    thunkAPI.dispatch(setToken(token));
    thunkAPI.dispatch(setUser(jwt_decode(token.access)));
  }
  return;
});

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (formVals, thunkAPI) => {
    try {
      const response = await axios.post(`${URL}/api/token/`, formVals);
      if (response.status === 200) {
        window.localStorage.setItem("token", JSON.stringify(response.data));
        thunkAPI.dispatch(setToken(response.data));
        thunkAPI.dispatch(setUser(jwt_decode(response.data.access)));
      } else {
        alert("Something went wrong");
      }
    } catch (authError) {
      console.error(authError);
      return thunkAPI.dispatch(setToken({ error: authError }));
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (formVals, thunkAPI) => {
    try {
      const register = await axios.post(`${URL}/api/register/`, formVals);
      if (register.status === 201) {
        const response = await axios.post(`${URL}/api/token/`, formVals);
        if (response.status === 200) {
          window.localStorage.setItem("token", JSON.stringify(response.data));
          thunkAPI.dispatch(setToken(response.data));
          thunkAPI.dispatch(setUser(jwt_decode(response.data.access)));
        } else {
          alert("Token Error");
        }
      } else {
        alert("Registration Error");
      }
    } catch (authError) {
      console.error(authError);
      return thunkAPI.dispatch(setToken({ error: authError }));
    }
  }
);

export const updateToken = createAsyncThunk(
  "auth/updateToken",
  async (_, thunkAPI) => {
    try {
      const token = JSON.parse(window.localStorage.getItem("token"));
      const response = await axios.post(`${URL}/api/token/refresh/`, {
        refresh: token.refresh,
      });
      if (response.status === 200) {
        window.localStorage.setItem("token", JSON.stringify(response.data));
        thunkAPI.dispatch(setToken(response.data));
        thunkAPI.dispatch(setUser(jwt_decode(response.data.access)));
      } else {
        thunkAPI.dispatch(logout());
        alert("Something went wrong");
      }
    } catch (authError) {
      console.error(authError);
    }
  }
);

const initialState = { token: null, user: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logout: () => {
      window.localStorage.removeItem("token");
      return {};
    },
  },
});

export const { setToken, setUser, logout } = authSlice.actions;
export default authSlice.reducer;
