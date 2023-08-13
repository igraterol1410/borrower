import { addUser, getCompanyId, getUserCompanyInfo, getUserInfo, getUserStatuses, getUsersByUser } from '@/services/user.services';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentUserInfo = createAsyncThunk(
  'user/getCurrentUserInfo',
  async () => {
    return getUserInfo().then(({data})=> data.userid)
  }
)

export const getCurrentCompanyId = createAsyncThunk(
  'user/getCurrentCompanyId',
  async ({userId}) => {
    return getCompanyId(userId).then(({data})=> data)
  }
)

export const getCurrentUserCompanyInfo = createAsyncThunk(
  'user/getCurrentUserCompanyId',
  async ({userCompanyId,userId,companyId}) => {
    return getUserCompanyInfo(userCompanyId,userId,companyId).then(({data})=> data)
  }
)
export const getCurrentUserStatuses = createAsyncThunk(
  'user/getCurrentUserStatuses',
  async ({userCompanyId}) => {
    return getUserStatuses(userCompanyId).then(({data})=> data)
  }
)
export const addCurrentUser = createAsyncThunk(
  'user/addCurrentUser',
  async (payload) => {
    return addUser(payload).then(({data})=> data)
  }
)

export const getCurrentUsersByUsers = createAsyncThunk(
  'user/getCurrentUsersByUsers',
  async ({userId}) => {
    return getUsersByUser(userId).then(({data})=> data)
  }
)

export const userSlice = createSlice({
  name:'user',
  initialState: {
    user: null,
    userId:null,
    companyId:null,
    userCompanyInfo:null,
    companies:null,
    statuses:[],
    users:[],
    userLoading:false
  },
  reducers: {
    login:(state, action) => {
      state.user = action.payload;
    },
    updateUser:(state, action) => {
      state.user = action.payload;
    },
    logoutUser:(state) => {
      state.user = null;
    },
    getInfo:(state, action) => {
      state.user = action.payload;
    },
    setCompanyId:(state, action) => {
      state.companyId = action.payload;
    },
    setUserCompanyInfo:(state, action) => {
      state.userCompanyInfo = action.payload;
    },
    setUserStatusesInfo:(state, action) => {
      const repeatedCompany = state.statuses.filter((status) =>(status.company === action.payload.company))
      if(repeatedCompany.length === 0){
        state.statuses = [... state.statuses, action.payload];
      }
    }
  },
  extraReducers:{
    [getCurrentUserInfo.pending]: (state, action) => {
      state.userLoading = true
      },
    [getCurrentUserInfo.fulfilled]: (state, action) => {
      state.userLoading = false
      state.userId = action.payload
    },
    [getCurrentUserInfo.rejected]: (state, action) => {
      state.userLoading = false
    },
    [getCurrentCompanyId.pending]: (state, action) => {
      state.userLoading = true
      },
    [getCurrentCompanyId.fulfilled]: (state, action) => {
      state.userLoading = false
      state.companies = action.payload
    },
    [getCurrentCompanyId.rejected]: (state, action) => {
      state.userLoading = false
    },
    [getCurrentUserCompanyInfo.pending]: (state, action) => {
      state.userLoading = true
      },
    [getCurrentUserCompanyInfo.fulfilled]: (state, action) => {
      state.userLoading = false
      state.userCompanyInfo = action.payload
    },
    [getCurrentUserCompanyInfo.rejected]: (state, action) => {
      state.userLoading = false
    },
    [getCurrentUserStatuses.pending]: (state, action) => {
      state.userLoading = true
      },
    [getCurrentUserStatuses.fulfilled]: (state, action) => {
      state.userLoading = false
      state.statuses = action.payload
    },
    [getCurrentUserStatuses.rejected]: (state, action) => {
      state.userLoading = false
    },
    [addCurrentUser.pending]: (state, action) => {
      state.userLoading = true
      },
    [addCurrentUser.fulfilled]: (state, action) => {
      state.userLoading = false
    },
    [addCurrentUser.rejected]: (state, action) => {
      state.userLoading = false
    },
    [getCurrentUsersByUsers.pending]: (state, action) => {
      state.userLoading = true
      },
    [getCurrentUsersByUsers.fulfilled]: (state, action) => {
      state.userLoading = false
      state.users = action.payload
    },
    [getCurrentUsersByUsers.rejected]: (state, action) => {
      state.userLoading = false
    }
  }
})

export const { login, updateUser, logoutUser, getInfo, setCompanyId, setUserCompanyInfo, setUserStatusesInfo } = userSlice.actions;

export const selectUser = (state) => state.user.user;

export default userSlice.reducer;

export const getAllInfo = () => (dispatch) => {
//   return ''
  return dispatch(getInfo(JSON.parse(localStorage.getItem('user'))))
};