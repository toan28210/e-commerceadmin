import Cookies from "universal-cookie";

function headerAuthInterceptor(){
    const cookies = new Cookies();
    return  {Authorization: "Bearer " + cookies.get("accessToken")}
}
export {headerAuthInterceptor};
