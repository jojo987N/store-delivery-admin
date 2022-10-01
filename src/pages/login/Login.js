import { signInWithEmailAndPassword } from "firebase/auth"
import { useContext, useState } from "react"
import { auth, getRestaurantById, getRestaurantId } from "../../firebase"
import "./login.scss"
import { useNavigate } from "react-router-dom";
import { RestaurantContext } from "../../context/RestaurantContext";
import { LoadingContext } from "../../context/LoadingContext";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const {setCurrentRestaurant} = useContext(RestaurantContext)
  const {setLoading} = useContext(LoadingContext)
  const [buttonStyle, setButtonStyle] = useState({
    backgroundColor: "",
    color: "",
    text: "Sign In"
  })
  const SignInUser = async (e)=>{
     e.preventDefault()
    setButtonStyle({
      backgroundColor: "green",
      color: "white",
      text: "Try to..."
    })
    try{
      const re = await signInWithEmailAndPassword(auth, email, password)
      setLoading(true)
       window.location.reload()
    }catch(err){
    err.message.includes("password")?setPasswordError(err.message.replace(/Firebase:|auth\//g,''))
     :setEmailError(err.message.replace(/Firebase:|auth\//g,''))
    }
  }
  return (
    <section className="login">
      <div className="loginContainer" >
      <div style={{display: "flex", justifyContent: "center"}}>
        <h1 style={{color: "white", fontSize: 25}}>Good</h1>
        <h1 style={{color: "green", marginLeft: 10, fontSize: 25}}>Food</h1>
      </div>
      <form onSubmit={SignInUser}>
        <label>Username</label>
        <input 
          type={"text"}
          autoFocus
          required
          onChange={e => setEmail(e.target.value)}
          />
        <p className="errorMsg">{emailError}</p>
        <label>Password</label>
        <input 
          type={"password"}
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          />
        <p className="errorMsg">{passwordError}</p>
        {/* <div className="btnContainer">
        <button style={{backgroundColor: buttonStyle.backgroundColor, color: buttonStyle.color}}>{buttonStyle.text}</button>
        </div> */}
         </form>
      </div>
    </section>
  )
}
export default Login