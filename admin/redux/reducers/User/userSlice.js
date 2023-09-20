import { createSlice } from "@reduxjs/toolkit";
import {
  friendRequestStatus,
  getAllUserList,
  getContentUserLiked,
  getPendingFriendRequest,
  getUserDetailsById,
} from "../../actions/user/userActions";
// import { announcementsList } from "../../actions/home/posts";
import {announcementsList, commentLikeList, getPostLikeList, getPostList, getStoryPost, getpostComments, hiringList, userPostList } from "../../actions/home/posts";
import { generalSearch, postSearch } from "../../actions/search/generalsearch";

const initialState = {
  activeNavItem: null,
  myFriendsList: [],
  myFriendsCount: 0,
  isLoading: false,
  loginStatus: false,
  currentUser: {},
  likeContentList: [],
  likeContentCount: 0,
  layoutByRole: null,
  allUserList: [],
  userCount: 0,
  friendList: [],
  freindCount: 0,
  requestStatus: {},
  postsList: {},
  postListStatus: {},
  commentList: {},
  commentListStatus: {},
  postLikesList: {},
  postLikesStatus: {},
  commentLikesList: [],
  commentLikesStatus: {},
  userPostList: {},
  userPostListStatus: {},
  announcementsList: {},
  announcementsStatus: {},
  hiringList: {},
  hiringStatus: {},
  generalSearch: {},
  generalSearchStatus: {},
  postSearch: [],
  postSearchStatus: {},
  isFriendListLoading: false,
  gettingAllList: false,
  storyList: [],
  friendsStory: []
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setLoginStatus(state, action) {
      state.loginStatus = action.payload;
    },
    setActiveNav(state, action) {
      state.activeNavItem = action.payload;
    },
    setLayoutByRole(state, action) {
      state.layoutByRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserDetailsById.fulfilled, (state, action) => {
      state.isLoading = false;
      state.loginStatus = true;
      state.currentUser = action.payload.rows[0];
      state.myFriendsList = action.payload.rows[0]?.Friends;
      state.myFriendsCount = action.payload.rows[0]?.Friends?.length;
    });
    builder.addCase(getUserDetailsById.pending, (state, action) => {
      state.isLoading = true;
      state.loginStatus = true;
      state.currentUser = action.payload;
    });
    builder.addCase(getContentUserLiked.fulfilled, (state, action) => {
      state.isLoading = false;
      state.likeContentList = action.payload?.rows;
      state.likeContentCount = action.payload?.count;
    });
    builder.addCase(getContentUserLiked.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllUserList.fulfilled, (state, action) => {
      state.allUserList = action.payload.rows;
      state.userCount = action.payload.count;
      state.gettingAllList = false;
      state.isLoading = false
    });
    builder.addCase(getAllUserList.pending, (state, action) => {
      state.gettingAllList = true;
      state.isLoading = true
    });
    builder.addCase(getAllUserList.rejected, (state, action) => {
      state.gettingAllList = false;
      state.isLoading = false
    });
    builder.addCase(getPendingFriendRequest.fulfilled, (state, action) => {
      state.friendList = action.payload.rows;
      state.freindCount = action.payload.count;
      state.isFriendListLoading = false;
    });
    builder.addCase(getPendingFriendRequest.pending, (state, action) => {
      state.isFriendListLoading = true;
    });
    builder.addCase(getPendingFriendRequest.rejected, (state, action) => {
      state.isFriendListLoading = false;
    });
    builder.addCase(friendRequestStatus.fulfilled, (state, action) => {
      state.requestStatus = action.payload;
      state.isFriendListLoading = false;
    });
    builder.addCase(friendRequestStatus.pending, (state, action) => {
      state.isFriendListLoading = false;
    });
    builder.addCase(friendRequestStatus.rejected, (state, action) => {
      state.isFriendListLoading = false;
    });
    // posts
    builder.addCase(getPostList.fulfilled, (state, action) => {
      state.postsList = action?.payload?.data?.data?.result?.data;
      state.postListStatus = false;
    });
    builder.addCase(getPostList.pending, (state, action) => {
      state.postListStatus = false;
    });
    builder.addCase(getPostList.rejected, (state, action) => {
      state.postListStatus = false;
    });
    // CommentList 
    builder.addCase(getpostComments.fulfilled, (state, action) => {
      state.commentList = action?.payload?.data?.data?.result?.data?.rows;
      state.commentListStatus = false;
    });
    builder.addCase(getpostComments.pending, (state, action) => {
      state.commentListStatus = false;
    });
    builder.addCase(getpostComments.rejected, (state, action) => {
      state.commentListStatus = false;
    });
    // post likes list 
    builder.addCase(getPostLikeList.fulfilled, (state, action) => {
      state.postLikesList = action?.payload?.data?.data?.rows;
      state.postLikesStatus = false;
    });
    builder.addCase(getPostLikeList.pending, (state, action) => {
      state.postLikesStatus = false;
    });
    builder.addCase(getPostLikeList.rejected, (state, action) => {
      state.postLikesStatus = false;
    });
    // user post list
    builder.addCase(userPostList.fulfilled, (state, action) => {
      state.userPostList = action?.payload?.data?.data?.rows;
      state.userPostListStatus = false;
    });
    builder.addCase(userPostList.pending, (state, action) => {
      state.userPostListStatus = false;
    });
    builder.addCase(userPostList.rejected, (state, action) => {
      state.userPostListStatus = false;
    });
    // comments liked by user
    builder.addCase(commentLikeList.fulfilled, (state, action) => {
      state.commentLikesList = action?.payload?.data?.data?.rows;
      state.commentLikesStatus = false;
    });
    builder.addCase(commentLikeList.pending, (state, action) => {
      state.commentLikesStatus = false;
    });
    builder.addCase(commentLikeList.rejected, (state, action) => {
      state.commentLikesStatus = false;
    });
    //announcements
    builder.addCase(announcementsList.fulfilled, (state, action) => {
      state.announcementsList = action?.payload?.data?.data?.result?.data?.rows;
      state.announcementsStatus = false;
    });
    builder.addCase(announcementsList.pending, (state, action) => {
      state.announcementsStatus = false;
    });
    builder.addCase(announcementsList.rejected, (state, action) => {
      state.announcementsStatus = false;
    });
    //hiring
    builder.addCase(hiringList.fulfilled, (state, action) => {
      state.hiringList = action?.payload?.data?.data?.result?.data?.rows;
      state.hiringStatus = false;
    });
    builder.addCase(hiringList.pending, (state, action) => {
      state.hiringStatus = false;
    });
    builder.addCase(hiringList.rejected, (state, action) => {
      state.hiringStatus = false;
    });
    // get story of user
    builder.addCase(getStoryPost.fulfilled, (state, action) => {
      state.storyList = action?.payload?.data?.data?.result?.data;
      state.friendsStory = action?.payload?.data?.data?.result?.friendStory
    });
    builder.addCase(getStoryPost.pending, (state, action) => {
      state.storyList = false;
    });
    // general search
    builder.addCase(generalSearch.fulfilled, (state, action) => {
      state.generalSearch = action?.payload?.data;
      state.generalSearchStatus = false;
    });
    builder.addCase(generalSearch.pending, (state, action) => {
      state.generalSearchStatus = false;
    });
    builder.addCase(generalSearch.rejected, (state, action) => {
      state.generalSearchStatus = false;
    });
    
    //post search
    builder.addCase(postSearch.fulfilled, (state, action) => {
      state.postSearch = action?.payload?.data?.data?.rows;
      state.postSearchStatus = false;
    });
    builder.addCase(postSearch.pending, (state, action) => {
      state.postSearchStatus = false;
    });
    builder.addCase(postSearch.rejected, (state, action) => {
      state.postSearchStatus = false;
    });
  },
});

export const { setLoginStatus, setActiveNav, setLayoutByRole } =
  userSlice.actions;
export default userSlice.reducer;
