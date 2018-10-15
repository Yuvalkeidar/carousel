// import data from './data.json';
import axios from 'axios';

// managing the task to the JSON File
export const FETCH_DATA = 'FETCH_DATA';

// Fetch Data
export function fetchData(){
    const url = `./data.json`;
    return axios({
          url:url,
          method:'get'
    })
      .then( response => {
        return{
            type:FETCH_DATA,
            payload:response.data
        };
      }
    )
}
