import React, {useState, useEffect} from 'react';
import './style.css';
import {getAllApi} from '../../services/users.service';
import { Link } from "react-router-dom";
import {UsersAPI} from '../../interfaces/users.interface';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AssignmentIndOutlinedIcon from '@material-ui/icons/AssignmentIndOutlined';

interface IUserResponse{
  data: Array<UsersAPI>;
  status: number;
  message?: string|undefined;
}

export const UserCard: React.FC<{}> = () => {

  const [errorRequest, setErrorRequest] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string|undefined>("");
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchState, setSearchState] = useState<boolean>(false);
  const [users, setUsers] = useState<UsersAPI[]>([]);
  const [newUsersList, setNewUsersList] = useState<UsersAPI[]>([]);

  const getUsersData = async () => {
    let {data, status, message} = await getAllApi() as IUserResponse;
    if(status === 200){
      setUsers(data);
      setErrorRequest(false);
    }else{
      setErrorRequest(true);
      setErrorMessage(message);
    }  
  }

  const getStringAsSlugName = (stringName: string) => {
    let newString = stringName.replace(/\s*$/, "");
    return {
      slug: newString.replaceAll(/ /g, "-"),
    }
  }

  const getFindUser =  (ev: any) => {
    let inputValue: string = ev.target.value,
    inputLength: number = inputValue.length;
    setSearchValue(inputValue);

    let newList: UsersAPI[] = users.filter(user => {
      if(user.name.toLocaleLowerCase().slice(0, inputLength) === inputValue.toLocaleLowerCase()) return user;
    });

    if(Array.isArray(newList) && newList.length > 0) {
      setSearchState(false);
      setNewUsersList(newList);
    }

    if(Array.isArray(newList) && newList.length < 1 && inputLength > 0){
      setSearchState(true);
      setNewUsersList([]);
    }

  }

  const searchSection = () => {
    return searchState ? (<p>We didn't find any result for <b>{searchValue}</b>. Sorry!</p>) : '';
  }

  const userListContainer = () => {
    if(errorRequest) return <h4>{errorMessage}</h4>;

    if(searchValue.length > 0 && searchState) return <h4>Resource not found</h4>;

    if(!searchState){
      let usersData = newUsersList.length < 1 ? users : newUsersList;

      return (
        usersData.map((user: UsersAPI, index: number) => (
          <article className="card_user" key={index}>
            <div className="card-picture">
              <img 
                src={user.picture} 
                alt="Couldn't loaded the picture" 
                title={user.name}
              />
            </div>
            <div className="card-body">
              <h4>{user.name}</h4> 
              <div>
                <h6>Posts</h6>
                <p>10</p>
              </div>
              <div>
                <h6>Todos</h6>
                <p>10</p>
              </div>
              <div>
                <h6>Albums</h6>
                <p>10</p>
              </div>
            </div>
            <div className="card-link">
              <Link 
                to={`/profile/${user.id}`}
                className="link link-primary"
              >
                <AssignmentIndOutlinedIcon 
                /> 
                <span>See more</span>
              </Link>
            </div>
          </article>
        ))
      );
    }

  } 

  const resetComponentState = () => {
    setUsers([]);
    setNewUsersList([]);
    setSearchValue('');
    setSearchState(false);
    setErrorMessage('');
    setErrorRequest(false);
  }

  useEffect(()=>{
    console.log("componentDidMount: UserCard");
    getUsersData();

    return () => {
      console.log('componentWillUnmount: UserCard');
      getUsersData();
      resetComponentState();
    }
  }, []);



  return (
    <>
      {console.log("render")}
      <main className="hero_user_container">
        <section className="container-search">
          <div className="box-search">
            <SearchOutlinedIcon />
            <input 
              type="text" 
              name="search" 
              autoComplete="off"
              onChange={(ev) => getFindUser(ev)}
              placeholder="Search user .."
            />
          </div>
        </section>


        {searchSection()}
        <section className="list_user_container">
          {userListContainer()}
        </section>
      </main>
    </>
  );

}

