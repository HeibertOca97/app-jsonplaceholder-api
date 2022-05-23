import axios from 'axios';
import {UsersAPI} from '../interfaces/users.interface';


interface IUserAllResponse{
  data: Array<UsersAPI>;
  status: number;
}

interface IUserByIdResponse{
  data: UsersAPI;
  status: number;
}

export const getAllApi = async () => {
  try{
    let response = await axios.get('/users') as IUserAllResponse;
    const usersData = response.data as UsersAPI[];

    if(response.status !== 200){
      throw new Error("Resource not found");
    }

    let newList = usersData.map((user: UsersAPI, index: number) => {
      return {
        ...user,
        picture: getPhotoByIndex(index)
      } 
    });

    return {
      status: response.status,
      data: newList
    };
  }catch(err: any){
    let message;
    if(err.request.status === 404){
      message = err.request.status + " - Resource not found";
      return {
        status: err.request.status,
        message
      }
    }
  }
}


export const getByIdApi = async (id: number) => {
  try{
    let response = await axios.get(`/users/${id}`) as IUserByIdResponse;
    const userData = response.data as UsersAPI;

    if(response.status !== 200){
      throw new Error("Resource not found");
    }
    
    userData.picture = getPhotoByIndex(id - 1);

    return {
      status: response.status,
      data: userData
    };
  }catch(err: any){
    let message;
    if(err.request.status === 404){
      message = err.request.status + " - Resource not found";
      console.log(message);
      return {
        status: err.request.status,
        message
      }
    }
  }
}

function getPhotoByIndex(index: number){
  let pictures: Array<string> = [
    "https://archinect.imgix.net/uploads/gp/gp7hnwkptz21xnyz.jpg?fit=crop&auto=compress%2Cformat&crop=faces&w=158&h=158&dpr=3",
    "https://mycredit.education/wp-content/uploads/2020/05/testi_7121.jpg",
    "https://i1.rgstatic.net/ii/profile.image/674326781128705-1537783441689_Q512/Anastasia-Korobkova-2.jpg",
    "https://www.hydrologic.com/files/Minke-Wuis.jpg",
    "https://th.bing.com/th/id/R.f8bc826a55320910105778294816f131?rik=YcpUdZ5XDY0s8A&riu=http%3a%2f%2fs7d3.scene7.com%2fis%2fimage%2fBareEscentuals%2f81526_6&ehk=zMKHwWlSwW2LZdWfonSlbKMG%2bO0DXbMqQaH2ldHffvU%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.7JnhXk_QCmmyLnl5tB0figHaHa?pid=ImgDet&w=550&h=550&rs=1",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Audu_Paden_animation_director-producer.jpg/500px-Audu_Paden_animation_director-producer.jpg",
    "https://i.pinimg.com/originals/ba/bc/38/babc3896367b8d5a71d28eaf6b3a76f4.jpg",
    "https://i1.rgstatic.net/ii/profile.image/815390296920064-1571415604292_Q512/Monika_Slupska2.jpg",
    "https://pbs.twimg.com/profile_images/1081941429990113280/Sv3zJ3N0_400x400.jpg"
  ];

  return pictures[index];
}

