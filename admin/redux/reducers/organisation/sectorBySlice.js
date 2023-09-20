import { createSlice } from "@reduxjs/toolkit";
import { addOrganisation, companyBrandList, companyGroupList, companyLikeslist, companyNameList, getOrganisationbyid, getOrganisationlist, updateOrganisation } from "../../actions/organisation/addorganisation";
import {
  createNewIndustry,
  getIndustryById,
  getIndustryList,
  getSectorById,
  getlistSector,
} from "../../actions/organisation/addsector";
import { familyCodeById, familycodeList, professioncodeList, professionCodeById, professionlist, getProfessionById, professioncodeDropdownlist } from "../../actions/organisation/profession";

const sectorBySlice = createSlice({
  name: "sector",
  initialState: {
    value: 0,
    sectorlist: [],
    status: "",
    isLoading: false,
    industrylist: [],
    sectorByIdlist: [],
    industryBylist: [],
    organisationList: [],
    organisation: [],
    orglikedlist: [],
    companyNamelist: [],
    grouplist: [],
    brandlist: [],
    familyCodelist: [],
    familycodeById: [],
    professionCodeList: [],
    professionCodeById: [],
    professionList: [],
    professionById: [],
    professionCodeDropdown: [],
    error: ""
  },

  // list of all sector that are created
  extraReducers: (builder) => {
    builder.addCase(addOrganisation.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(addOrganisation.rejected, (state, action) => {
      state.isLoading = false
    });
    builder.addCase(addOrganisation.fulfilled, (state, action) => {
      state.isLoading = false
    });
    builder.addCase(updateOrganisation.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(updateOrganisation.rejected, (state, action) => {
      state.isLoading = false
    });
    builder.addCase(updateOrganisation.fulfilled, (state, action) => {
      state.isLoading = false
    });
    builder.addCase(getlistSector.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getlistSector.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    });
    builder.addCase(getlistSector.fulfilled, (state, action) => {
      state.sectorlist = action?.payload?.data?.data;
      state.isLoading = false
    });

    // for get list industry
    builder.addCase(getIndustryList.pending, (state) => {
      state.isLoading = true
    });
    builder.addCase(getIndustryList.rejected, (state, action) => {
      state.error = action.payload
      state.isLoading = false
    });
    builder.addCase(getIndustryList.fulfilled, (state, action) => {
      state.industrylist = action?.payload?.data?.data;
      state.isLoading = false
    });

    // for particular id of sector
    builder.addCase(getSectorById.pending, (state, action) => {
      (state.status = action.payload?.status), (state.sectorByIdlist = []);
    });
    builder.addCase(getSectorById.fulfilled, (state, action) => {
      (state.status = ""),
        (state.sectorByIdlist = action.payload?.data?.data?.rows);
    });

    // for particular id of industry
    builder.addCase(createNewIndustry.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(createNewIndustry.fulfilled, (state, action) => {
      state.isLoading = false
    });
    builder.addCase(getIndustryById.pending, (state, action) => {
      (state.status = action.payload?.status), (state.industryBylist = []);
    });
    builder.addCase(getIndustryById.fulfilled, (state, action) => {
      (state.status = ""),
        (state.industryBylist = action.payload?.data?.data?.rows);
    });

    // org list
    builder.addCase(getOrganisationlist.pending, (state, action) => {
      state.isLoading = true
    });
    builder.addCase(getOrganisationlist.fulfilled, (state, action) => {
      state.isLoading = false
      state.organisationList = action.payload?.data?.data
    });

    //org by id
    builder.addCase(getOrganisationbyid.pending, (state, action) => {
      (state.status = action.payload?.status), (state.organisation = []);
    });
    builder.addCase(getOrganisationbyid.fulfilled, (state, action) => {
      (state.status = ""),
        (state.organisation = action.payload?.data?.data);
    });

    //liked
    builder.addCase(companyLikeslist.pending, (state, action) => {
      (state.status = action.payload?.status);
    });
    builder.addCase(companyLikeslist.fulfilled, (state, action) => {
      (state.status = ""),
        (state.orglikedlist = action.payload?.data?.data?.rows);
    });

    //companyNameList
    builder.addCase(companyNameList.pending, (state, action) => {
      (state.status = action.payload?.status);
    });
    builder.addCase(companyNameList.fulfilled, (state, action) => {
      (state.status = ""),
        (state.companyNamelist = action.payload?.data?.data?.rows);
    });

    //Brandlist
    builder.addCase(companyBrandList.pending, (state, action) => {
      (state.status = action.payload?.status);
    });
    builder.addCase(companyBrandList.fulfilled, (state, action) => {
      (state.status = ""),
        (state.brandlist = action.payload?.data?.data?.rows);
    });

    //grouplist
    builder.addCase(companyGroupList.pending, (state, action) => {
      (state.status = action.payload?.status);
    });
    builder.addCase(companyGroupList.fulfilled, (state, action) => {
      (state.status = ""),
        (state.grouplist = action.payload?.data?.data?.rows);
    });

    //familycodelist
    builder.addCase(familycodeList.pending, (state, action) => {
      state.status = action.payload?.status
      state.isLoading = true

    });
    builder.addCase(familycodeList.fulfilled, (state, action) => {
      state.status = "";
      state.isLoading = false
      state.familyCodelist = action.payload?.data?.data;
    });

    //familycodeById
    builder.addCase(familyCodeById.pending, (state, action) => {
      (state.status = action.payload?.status);
    });
    builder.addCase(familyCodeById.fulfilled, (state, action) => {
      (state.status = ""),
        (state.familycodeById = action.payload?.data?.data?.rows);
    });

    //professioncodelist
    builder.addCase(professioncodeList.pending, (state, action) => {
      state.status = action.payload?.status;
      state.isLoading = true

    });
    builder.addCase(professioncodeList.fulfilled, (state, action) => {
      state.status = ""
      state.isLoading = false
      state.professionCodeList = action.payload?.data?.data;
    });

    // //profession code dropdown
    // builder.addCase(professioncodeDropdownlist.pending, (state, action) => {
    //   (state.status = action.payload?.status);
    // });
    // builder.addCase(professioncodeDropdownlist.fulfilled, (state, action) => {
    //   (state.status = ""),
    //     (state.professionCodeDropdown = action.payload?.data?.data?.rows);
    // });

    //profession code by id
    builder.addCase(professionCodeById.pending, (state, action) => {
      (state.status = action.payload?.status);
    });
    builder.addCase(professionCodeById.fulfilled, (state, action) => {
      (state.status = ""),
        (state.professionCodeById = action.payload?.data?.data?.rows);
    });

    //profession list
    builder.addCase(professionlist.pending, (state, action) => {
      state.isLoading = true
      state.status = action.payload?.status;
    });
    builder.addCase(professionlist.fulfilled, (state, action) => {
      state.status = ""
      state.isLoading = false
      state.professionList = action.payload?.data?.data;
    });

    //profession by id
    builder.addCase(getProfessionById.pending, (state, action) => {
      (state.status = action.payload?.status);
    });
    builder.addCase(getProfessionById.fulfilled, (state, action) => {
      (state.status = ""),
        (state.professionById = action.payload?.data?.data?.rows);
    });
  },
});

export default sectorBySlice.reducer;
