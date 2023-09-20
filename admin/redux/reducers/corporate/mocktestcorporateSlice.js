import { createSlice } from "@reduxjs/toolkit";
import { getMockTestbyid, getMockTestCorporatelist, mocktestResult, mocktestScoreCount, submitMockTest } from "../../actions/corporate/addmocktestcorporate";

const mockTestCorporateSlice = createSlice({
  name: "mocktestcorporate",
  initialState: {
    isMockTestLoading: false,
    value: 0,
    mocktestcorporatelist: [],
    mocktest: [],
    mocktestResult: [],
    questionList: [],
    status: "",
    wrongQuestionCount: 0,
    correctQuestionCount: 0,
    testResult: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getMockTestCorporatelist.rejected, (state, action) => {
      state.mocktestcorporatelist = [];
      state.status = action?.status?.message;
    });
    builder.addCase(getMockTestCorporatelist.fulfilled, (state, action) => {
      state.mocktestcorporatelist = action?.payload?.data
      state.status = "";
    });
    builder.addCase(getMockTestbyid.rejected, (state, action) => {
      state.status = action?.status?.message;
      state.isMockTestLoading = false
    });
    builder.addCase(getMockTestbyid.pending, (state, action) => {
      state.isMockTestLoading = true
    });
    builder.addCase(getMockTestbyid.fulfilled, (state, action) => {
      console.log(action.payload.data.data.rows[0], 'payload')
      state.mocktest = action?.payload?.data?.data
      state.isMockTestLoading = false
      state.questionList = action?.payload?.data?.data.rows[0].Questions
    });
    builder.addCase(mocktestResult.rejected, (state, action) => {
      state.mocktestResult = [];
      state.status = action?.status?.message;
    });
    builder.addCase(mocktestResult.fulfilled, (state, action) => {
      state.testResult = action?.payload?.data.rows[0]
    });
    builder.addCase(mocktestScoreCount.fulfilled, (state, action) => {
      state.userAnswersList = action.payload.data.rows
      state.testResult = action.payload.testScoreDetail
      state.correctQuestionCount = action.payload.correctCountDetail.true ? action?.payload?.correctCountDetail.true.count : 0
      state.wrongQuestionCount = action.payload.correctCountDetail.false ? action?.payload?.correctCountDetail.false.count : 0
      state.isMockTestLoading = false;
    });
    builder.addCase(mocktestScoreCount.pending, (state, action) => {
      state.isMockTestLoading = true;
    });
    builder.addCase(mocktestScoreCount.rejected, (state, action) => {
      state.isMockTestLoading = false;
    });
  },
});

export default mockTestCorporateSlice.reducer;