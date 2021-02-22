import { toast } from "react-toastify";
import { auth, provider} from "../../src/helpers/firebase";

export const signInWithGoogle = async () => {
    let user;
    await auth.signInWithPopup(provider).then((res)=>{
        user = res.user;
    }).catch((error)=>{
        console.log(error.message);
        toast.error(error.message);
    });
    return user;
}

export const logout = async () =>{
    let logout_sucess;
    await auth.signOut()
    .then(()=>{
        logout_sucess = true;
    }).catch((error)=>{
        console.log(error.message);
        toast.error(error.message);
    })
    return logout_sucess;
}