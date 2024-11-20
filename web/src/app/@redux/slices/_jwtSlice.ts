import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Jwt} from "@/app/@redux/@types/Jwt";
import {_cookies} from "@/app/@axios/_cookies";

type InitialState = {
    jwt: Jwt | null
}

export const _jwtSlice = createSlice({
    name: 'jwt',
    initialState: {
        jwt: null
    } as InitialState,
    reducers: {
        _setJwt: (state, action: PayloadAction<Jwt>) => {
            state.jwt = action.payload
        },
        _logout: (state) => {
            state.jwt = null
            _cookies.remove("refreshToken")
            _cookies.remove("authToken")
        }
    },
})

export const {_setJwt, _logout} = _jwtSlice.actions
