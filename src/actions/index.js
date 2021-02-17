export function setActivePage(page) {
    return (dispatch, getState) => {
      dispatch({
        type: 'SET_ACTIVE_PAGE',
        page: page
      })
    }
}