import {useEffect, useState} from 'react';
import {Header} from '../../components/Header';
import {getByIdApi} from '../../services/users.service';
import {UsersAPI} from '../../interfaces/users.interface'
import { Link, useParams } from "react-router-dom";

interface IUserByIdResponse{
  data: UsersAPI;
  status: number;
  message?: string|undefined;
}

export function Profile(){
  const [user, setUser] = useState<UsersAPI|any>({});
  const [errorRequest, setErrorRequest] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string|undefined>("");
  const {slug} = useParams();

  const getUserProfile = async () => { 
    let id = Number(slug);
    let {data, status, message} = await getByIdApi(id) as IUserByIdResponse;

    if(status === 200){
      setUser(data);
      setErrorRequest(false);
    }else{
      console.log("error");
      setErrorRequest(true);
      setErrorMessage(message);
    }
  }

  const removeStateComponent = () => { 
      setUser({});
      setErrorRequest(false);
      setErrorMessage('');
  }

  useEffect(() => {
    console.log("componentDidMount: Profile");
    getUserProfile();

    return () => {
      console.log("componentWillUnmount: Profile");
      removeStateComponent();
    }
  }, [slug]);

  return (
    <>
    {console.log("render: profile")}
      <Header />
      <h1>Hello, I'm {user.name}</h1>
      <img src={user.picture} alt="" width="200" height="200" />
    </>
  );

}
