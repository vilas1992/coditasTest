import axios from 'axios';  
import { USER_LIST } from '../constants';

// get git hub user list
export const getUserList = () => {
    console.log("You clicked on user: ");
    return function (dispatch){

        axios.get('https://api.github.com/users').then(function (response) {
                                    
                                    if(response.status == 200){
                                        dispatch({
                                            type: USER_LIST,
                                            payload: response.data
                                    });
                                    }
                                                                     
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });

        
    }
};

// search specific user in github user list
export const searchUser = (searchString) => {
    console.log("You clicked on user: ");
    return function (dispatch){
        let url = 'https://api.github.com/search/users?q='+ searchString;

        console.log("Inside searchUser", url);

        axios.get('https://api.github.com/search/users?q=' + searchString).then(function (response) {
                                    
                                    if(response.status == 200){
                                        console.log("search result :",response.data.items);
                                        dispatch({
                                            type: USER_LIST,
                                            payload: response.data.items
                                     });
                                    }
                                                                     
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });

        
    }
};



// search specific user in github user list
export const getUserRepos = (repoUrl, userId, reposDetails) => { // reposDetails -> callback
    console.log("You clicked on user: ");
    return function (dispatch){
       
        console.log("Inside searchUser", repoUrl);

        axios.get(repoUrl).then(function (response) {
                                    
                                    if(response.status == 200){
                                      console.log("repo response", response.data);
                                      
                                      reposDetails(response.data[0], userId); 
                                    }
                                                                     
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });

        
    }
};
