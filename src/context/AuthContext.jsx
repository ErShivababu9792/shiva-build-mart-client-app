import {
createContext,
useContext,
useEffect,
useState
} from "react";


import api from "../api/axios";


const AuthContext = createContext();



export const AuthProvider = ({children})=>{


const [user,setUser] = useState(null);

const [loading,setLoading] = useState(true);





useEffect(()=>{


const token = localStorage.getItem("token");


if(token){

getProfile();

}
else{

setLoading(false);

}


},[]);







const getProfile = async()=>{

try{


const res = await api.get("/auth/profile");


console.log(
"PROFILE RESPONSE:",
res.data.data
);



setUser(res.data.data);



return res.data.data;



}

catch(error){


console.log(
"PROFILE ERROR:",
error
);



localStorage.removeItem("token");


setUser(null);



}

finally{

setLoading(false);

}

};








const login = async(form)=>{


const res = await api.post(

"/auth/login",

form

);




localStorage.setItem(

"token",

res.data.data.token

);





const profile = await getProfile();





// IMPORTANT

return profile;



};







const logout = ()=>{


localStorage.removeItem("token");


setUser(null);



};







return (

<AuthContext.Provider

value={{

user,

login,

logout,

loading

}}

>


{children}


</AuthContext.Provider>

);


};






export const useAuth = ()=>{


return useContext(AuthContext);


};