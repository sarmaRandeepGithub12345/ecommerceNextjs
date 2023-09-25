import { getLocalItem } from "./dataSample";

export const ACTIONS = {
  name: "NAME",
  area: "AREA",
  pincode: "PINCODE",
  district: "DISTRICT",
  stateOfRes: "STATE",
  country: "COUNTRY",
  fullObjEdit:"FULLEDIT"
};

export const EditReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.fullObjEdit:
      return {
        name:{
          ...state.name,
          value:action.payload.name
        },
        area :{
          ...state.area,
          value:action.payload.area
        },
        pincode:{
          ...state.pincode,
          value:action.payload.pincode
        },
        district:{
          ...state.district,
          value:action.payload.district
        },
        stateOfRes: {
          ...state.stateOfRes,
          value:action.payload.stateOfRes
        },
        country:{
          ...state.country,
          value:action.payload.country
        }
      }
    case ACTIONS.name:
      return {
        ...state,
        name: {
          ...state.name,
          value: action.payload,
        },
      };
    case ACTIONS.area:
      return {
        ...state,
        area: {
          ...state.area,
          value: action.payload,
        },
      };
    case ACTIONS.pincode:
      return {
        ...state,
        pincode: {
          ...state.pincode,
          value: action.payload,
        },
      };
    case ACTIONS.district:
      return {
        ...state,
        district: {
          ...state.district,
          value: action.payload,
        },
      };
    case ACTIONS.stateOfRes:
      return {
        ...state,
        stateOfRes: {
          ...state.stateOfRes,
          value: action.payload,
        },
      };
    case ACTIONS.country:
      return {
        ...state,
        country: {
          ...state.country,
          value: action.payload,
        },
      };
    
    default:
      return state;
  }
};
