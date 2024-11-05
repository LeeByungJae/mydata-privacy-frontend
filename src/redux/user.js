import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: "user",
    initialState: { 
        value: {
            "id": null,
            "mbrMngId": "",
            "password": null,
            "mbrNm": "",
            "mbrTypeCd": "",
            "certMthdCd": "",
            "certMblTelno": null,
            "emlAddr": null,
            "mblTelnoCertYn": ""
        }
    },
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
    },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;