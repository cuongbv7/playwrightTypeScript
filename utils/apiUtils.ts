import { APIRequestContext, APIResponse  } from "@playwright/test";
import { userInfo } from "../model/userInfo";

class ApiUtils {

    private apiContext : APIRequestContext;

    constructor ( context : APIRequestContext){
        this.apiContext = context;
    
    }

    getToken= async(reqBody:userInfo)=>{
        
        const loginResponse:APIResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
            data:reqBody
            }            
        )
        const loginResponeJson = await loginResponse.json();
        return loginResponeJson.token;
    }
}

export default ApiUtils;