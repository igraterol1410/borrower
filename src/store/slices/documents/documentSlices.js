import { getDocuments } from '@/services/documents.services';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getCurrentDocuments = createAsyncThunk(
  'documents/getCurrentDocuments',
  async () => {
    return getDocuments().then(({data})=> data)
  }
)

export const DocumentsSlice = createSlice({
  name:'documents',
  initialState: {
    documents: null,
    documentsLoading: true,
    excludedDocuments:[],
  },
  reducers: {
    setDocuments:(state, action) => {
        state.documents = action.payload;
    },
    excludeDocuments:(state, action) => {
        state.excludedDocuments = action.payload;
    }
  },
  extraReducers:{
    [getCurrentDocuments.pending]: (state, action) => {
        state.documentsLoading = true
    },
    [getCurrentDocuments.fulfilled]: (state, action) => {
        state.documentsLoading = false
        state.documents = action.payload
    },
    [getCurrentDocuments.rejected]: (state, action) => {
        state.documentsLoading = false
    }
  }
})

export const { setDocuments, excludeDocuments } = DocumentsSlice.actions;

export default DocumentsSlice.reducer;