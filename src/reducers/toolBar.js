const initialState = {
  page: "Person",
}

export default function toolBar (state = initialState, action) {
  switch(action.type) {
    case 'SET_ACTIVE_PAGE':
      return { ...state,
        page: action.page,
      }
    default:
      return state
  }
}
