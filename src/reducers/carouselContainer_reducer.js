import { FETCH_DATA } from '../actions/index';

export default function(state=[],action){
    console.log(action);
    switch (action.type) {
        case FETCH_DATA:
            if (action.error) {
                return state;
            }
            //make duplidate for the first two images
            let [first,second, ...rest] = action.payload.images;
            return [ ...action.payload.images,first,second ];

        default:
            return state;
    }
}
