const togo = (state = {}, action) => {
  switch (action.type) {
    case 'MOVE_ON':
      return {
        ...action.togo,
      }
    default:
      return state
  }
}
 
export default togo
