import { userConstants } from '../_constants';
export function update(state = {}, action) {
    switch (action.type) {
      case userConstants.UPDATE_REQUEST:
        return state.map((post)=>{
          if(post.id === action.user.id) {
            return {
               ...post,
               name: action.user.name,
               dob:action.user.dob,
               phonenumber: action.user.phonenumber,
               id:action.user.id,
               image:action.user.image,
               address: action.user.address,
               updateIn: true 
            }
          } else return post;
        })
      case userConstants.UPDATE_SUCCESS:
        return {};
      case userConstants.UPDATE_FAILURE:
        return {};
      default:
        return state
    }
  }