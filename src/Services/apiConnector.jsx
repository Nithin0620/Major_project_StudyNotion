import axios from "axios"

export const apiConnector = (method , url , bodyData , headers , params)=>{
   return axios.create({
      method : `${method}`,
      url : `${url}`, 
      data : bodyData ? bodyData : null,
      headers: headers ? headers : null,
      params : params? params: null,
   })
}