export default function basketReducer(state, action) {
  if (state == undefined) return [];

  if (action.type == "ADD_TO_BASKET") {
    return [...state, action.payload];
  } else if (action.type == "REMOVE_FROM_BASKET") {
    let filteredFavorites = state.filter((q) => q.id != action.payload);

    return [...filteredFavorites];
  } else if (action.type == "EMPTY") {
    return [];
  } else {
    return state;
  }
}
