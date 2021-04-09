import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { useContext, useState } from 'react';
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";


if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}

function Login() {
  const [newUser ,setNewUser] = useState(false)
  const [user , setUser] = useState({
    isSignedIn : false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error:'',
    success:false

  });

  const [loggedInUser , setLoggedInUser] = useContext(userContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };




  const provider = new firebase.auth.GoogleAuthProvider();
  const FacebookProvider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res =>{
      console.log(res);
      const {displayName,email,photoURL} = res.user

      const signInUser ={
        isSignedIn : true,
        name: displayName,
        email:email,
        photo :photoURL
      }
      setUser(signInUser)
      setLoggedInUser(signInUser)
      setUserToken()
      return signInUser
     
    })
    .catch(err =>{
      console.log(err);
    })
  }
   const setUserToken = () =>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(function(idToken) {
      sessionStorage.setItem('token',idToken)
    }).catch(function(error) {
      // Handle error
    });
   }

  const handleSignOut = () =>{
    firebase.auth().signOut()
    .then(res=>{
      const SignedOutUser = {
        isSignedIn: false,
        name :'',
        photo :'',
        email:''
      }
      setUser(SignedOutUser)
      console.log(res);
    })
    .catch(error =>{
      console.log(error.message);
    })
  }
  const handleSubmit =(e) =>{
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        const newUser ={...user};
        newUser.error ="";
        newUser.success =true
        setUser(newUser)
        UpdateUserName(user.name)

  })
  .catch((error) => {
    const newUser ={...user}
    newUser.error = error.message;
    newUser.success = false
    setUser(newUser)
  });

  }
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((res) => {
      const newUser ={...user};
        newUser.error ="";
        newUser.success =true
        setUser(newUser)
        setLoggedInUser(newUser)
        history.replace(from);
        console.log("sign in" ,res.user);
        
    })
    .catch((error) => {
      const newUser ={...user}
      newUser.error = error.message;
      newUser.success = false
      setUser(newUser)
    });
  
  }
    e.preventDefault()
  }
  
  //Form Validation
  const handleChanged = (e) =>{
    let IsFormValid;
    // console.log(e.target.name,e.target.value);
    if(e.target.name ==="email"){
      IsFormValid = /\S+@\S+\.\S+/.test(e.target.value)
      // console.log(IsFormValid);
    }
    if(e.target.name ==="password"){
      const IsPassWordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      IsFormValid =(IsPassWordValid && passwordHasNumber);
      // console.log(IsFormValid);
    }
    if(IsFormValid){
      const newUserInfo = {...user}
      newUserInfo [e.target.name] = e.target.value;
      setUser(newUserInfo)

    }
  }
  const UpdateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    })  
    .then(function() {
      console.log("user Updated Successfully");
    }).catch(function(error) {
      console.log(error);
    });
  }

  const handleFacebookSignIn =() =>{
  firebase
  .auth()
  .signInWithPopup(FacebookProvider)
  .then((result) => {

    
    console.log("successfully signIn" ,result.user);

    // // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    // var accessToken = credential.accessToken;

    // ...
  })
  .catch((error) => {
    console.log(error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
  }


  return (
    <div style={{textAlign:"center"}}>
      {
        user.isSignedIn ? <button onClick={handleSignOut}>Sign out</button>:
        <button onClick={handleSignIn}>Sign In</button>
      }
      <br/>
      <button onClick={handleFacebookSignIn}>Sign in with Facebook</button>
      
      {
        user.isSignedIn && <div>
        <h3>Welcome {user.name}</h3>
        <p>Email : {user.email}</p>
        <img src={user.photo} alt=""/>
        </div>
      }
      <h2>Our Own Authentication</h2>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> */}
       <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser">New User SignUp</label><br/>
      <form onSubmit={handleSubmit}>
       {
        newUser &&  <input type="text" onBlur={handleChanged} name="name"  placeholder="Your name" />
       }
       
       <br/>
        <input type="text" name="email" onBlur={handleChanged} placeholder="Your email" required/><br/>
        <input type="password" onBlur={handleChanged} name="password" id="" placeholder="Type Your Password" required/>
        <br/>
        <input type="submit" value={newUser ? "Sign up": "Sign in"}/>
      </form>
      <p style={{color:"red"}}>{user.error}</p>
      {
        user.success && <p style={{color:"green"}}>User {newUser?'Created':"Logged In"} Successfully</p>
      }
    </div>
  );
}

export default Login;
