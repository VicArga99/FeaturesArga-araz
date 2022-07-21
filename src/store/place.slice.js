import { createSlice } from "@reduxjs/toolkit";
import * as FileSystem from "expo-file-system";
import Place from "../models/Place";
import { insertAddress } from "../db";

const initialState = {
  places: [],
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    addPlace: (state, action) => {
      const newPlace = new Place(action.payload.id.toString(), action.payload.title, action.payload.image);
      state.places.push(newPlace);
    }
  },
});

export const { addPlace } = placeSlice.actions;

export const savePlace =   ( title, image ) => {
  return async (dispatch) => {
    let result;
    const fileName = image.split("/").pop();
    const Path = FileSystem.documentDirectory + fileName;



  

    try {
      await FileSystem.moveAsync({
        from: image,
        to: Path,
      });

     result = await insertAddress (title, Path);
      console.log('result insertAddress', result)
    } catch (error) {
      console.log(error.message);
      throw error;
    }

    dispatch(addPlace({ id: result.insertId, title, image: Path}));
  }
  }

export default placeSlice.reducer;
