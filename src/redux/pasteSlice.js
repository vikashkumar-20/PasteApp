import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';


const initialState = {
    pastes: JSON.parse(localStorage.getItem("pastes")) || [],
  };

export const pasteSlice = createSlice({
  name: 'pastes',
  initialState ,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;

      // Add a check -> Paste alreay exist
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste Created Successfully");
    },

    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);
  
      if (index >= 0) {
          state.pastes[index] = paste;
          localStorage.setItem("pastes", JSON.stringify(state.pastes));
          toast.success("Paste Updated Successfully");
      } else {
          toast.error("Paste not found for update.");
      }
  },
  

    removeFromPastes: (state, action) => {
        const pasteId = action.payload;
        console.log(pasteId);

        const index = state.pastes.findIndex((item) => 
            item._id === pasteId);

        if(index >=0)
            {
                state.pastes.splice(index, 1);
    
                localStorage.setItem("pastes", JSON.stringify(state.pastes));
    
                toast.success("Paste Deleted Sucessfully");
            }

    },

    resetAllPastes: (state, action) => {
        state.pastes = []; 

        localStorage.removeItem("pastes");

        toast.success("All Paste Deleted");

    }
  }
})


export const { addToPastes, updateToPastes, removeFromPastes, resetAllPastes} = pasteSlice.actions

export default pasteSlice.reducer