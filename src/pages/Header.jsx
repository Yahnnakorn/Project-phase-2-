import React, {useContext} from 'react';
import './header.css';
import { AppContext } from '../App';
import userImage from '../images/pochita.PNG';

function Header({toggleActive}) {
  const {library, bag, user} = useContext(AppContext);
  const handleLogout = () => {
  
 };
 return (
   <header>
     <a href="#" className="menu" onClick={toggleActive}>
       <i className="bi bi-sliders"></i>
     </a>
     <div className="userItems">
       <a href="#" className="icon">
         <i className="bi bi-heart-fill"></i>
         <span className="like">{library.length}</span>
       </a>
       <a href="#" className="icon">
         <i className="bi bi-bag-fill"></i>
         <span className="bag">{bag.length}</span>
       </a>
       {user ? (
         <div className="avatar">
           <span className="user">{user.username}</span>
           <a href="#" onClick={handleLogout}>
             Logout
           </a>
         </div>
       ) : (
         <div className="avatar">
           <a href="#">
             <img src={userImage} alt="User Image" />
           </a>
           <div className="user">
             <span>User Name</span>
             <a href="#">View Profile</a>
           </div>
         </div>
       )}
     </div>
   </header>
 );
}

export default Header;