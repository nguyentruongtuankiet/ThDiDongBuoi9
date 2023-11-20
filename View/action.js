// action.js
// export const setNote = (note) => ({
//   type: "SET_NOTE",
//   payload: note,
// });

// export const deleteNote = (note) => ({
//   type: "DELETE_NOTE",
//   payload: note,
// });

export const setNote = (note) => {
  return {
    type: "SET_NOTE",
    payload: note,
  };
};

export const deleteNote = (note) => {
  return {
    type: "DELETE_NOTE",
    payload: note,
  };
};