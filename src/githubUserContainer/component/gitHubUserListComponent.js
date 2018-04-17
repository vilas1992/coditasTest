import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { getUserList, searchUser, getUserRepos } from '../Actions/getGithubUser';

class Gituser extends Component{
    constructor(props){
        super(props);
        this.state ={
            users : []
        }

        this.handleCollapse = this.handleCollapse.bind(this);
        this.handleSearching = this.handleSearching.bind(this);
        this.reposDetails = this.reposDetails.bind(this);
    }

       
    
    componentDidMount(){
        this.props.getUserList();
    }

    componentWillReceiveProps(nextProps){
                
        let userlist = nextProps.users.map((obj) => {
            obj.Collapse = false;       // added external field to track collapse state
            return obj;
        })
        console.log("componentWillReceiveProps userlist", userlist);

        this.setState({users : userlist});
    }

    handleCollapse(userId){
        let userCollapse = this.state.users;  // for immutability 

        for(let i=0; i< userCollapse.length ; i++){
            if(userCollapse[i].id == userId){
                this.props.getUserRepos(userCollapse[i].repos_url, userId, this.reposDetails);
            }
        }

        this.setState({
            users : userCollapse
        });

    }
    // call back for handling responce
    reposDetails(response, id){
        console.log(id);
         let userCollapse = this.state.users;  // for immutability 


         for(let i=0; i< userCollapse.length ; i++){
            if(userCollapse[i].id == id){
                 userCollapse[i].Collapse = true;
                
                 userCollapse[i].full_name = response.full_name;
                 userCollapse[i].description = response.description;
                 userCollapse[i].assignees_url = response.assignees_url;
                 userCollapse[i].stargazers_count = response.stargazers_count;
             }
         }
         this.setState({
            users : userCollapse
        });
         
    }

    handleSearching(event){
        if(event.target.value.length > 0){
            this.props.searchUser(event.target.value);
        }else{
            this.props.getUserList();                // if input field is empty
        }
        
    }
    
    render(){
        
        return(
            <div>
                <div>
                    <div>
                        <select>
                            <option value="volvo">Sort by Name</option>
                            <option value="saab">Sort by type</option>
                            
                        </select>
                        <input type="text" onBlur ={(e) => this.handleSearching(e) } />
                    </div>
                </div>
                <div>
                <span>Total Result : { this.state.users.length }</span> 
                {
                 
                this.state.users.map((user) => <div key={user.id}>
                    
                    <div className="col-md-4 pull-left">
                        <img src={user.avatar_url} className="img-circle" alt="Cinque Terre" width="100" height="100" /> 
                    </div>
                    <div className="col-md-7 pull-right">
                        <h2>{ user.login }</h2>
                        <span>{user.url}</span>
                        <button type="button" className="btn btn-primary" onClick={() => this.handleCollapse(user.id)}>Collapse</button>
                        <div style={{ visibility: user.Collapse ? 'visible' : 'hidden' }}> 
                            <div>full_name : {user.full_name}</div>
                            <div>description : {user.description}</div>
                            <div>assignees url :{user.assignees_url}</div>
                            <div>organizations url :{user.organizations_url}</div>
                            <div>stargazers count :{user.stargazers_count}</div>
                        </div>
                                      
                    </div>
                    </div>)
                }
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
   
    return {
        users: state.users
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({ getUserList: getUserList, searchUser : searchUser, getUserRepos : getUserRepos }, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Gituser);