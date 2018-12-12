import { NOTIFY_USER } from '../actions/types';

const initialState = {
  message: null,
  messageType: null//determine color of our alert component*(in layout file) is rendered based on error or success message
};
//basically one action to notify the user
export default function(state = initialState, action) {//action will come from our actions file
  switch (action.type) {//our action object
    case NOTIFY_USER:
      return {
        ...state,//we use spread operator, our state is immutable
        message: action.message,
        messageType: action.messageType
      };
    default:
      return state;
  }
}
