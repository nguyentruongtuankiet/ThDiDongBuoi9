

  const initialState = {
    note:  []// Giá trị khởi tạo ban đầu cho 'note'
  };
  
// Reducer.js
const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTE":
      return {
        ...state,
        note: [...state.note, action.payload],// Truy cập trực tiếp vào action.payload
      };
      case "DELETE_NOTE":
      return {
        ...state,
        note: state.note.filter(note => note !== action.payload),
      };
    default:
      return state;
  }
};

export default noteReducer;

