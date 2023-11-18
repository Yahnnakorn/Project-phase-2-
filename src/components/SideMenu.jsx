import React, {useState} from 'react';
import './sideMenu.css';
import navListData from '../data/navListData';
import NavListItem from './NavListItem';

function SideMenu({active, sectionActive}) {
    const [navData, setNavData] = useState(navListData);
      
    const handleNavOnClick =(id, target)=>{
        const newNavData = navData.map(nav=>{
            nav.active=false;
            if(nav._id === id) nav.active=true;
            return nav;
        });
        setNavData(newNavData);
        sectionActive(target);
    };

  return (
  <div className={`sideMenu ${active ? 'active' : undefined}`}>
    <a href="#" className="logo">
        <i className="bi bi-controller"></i>
         <span className="brand">WGShop</span>
    </a>
    <ul className="nav">
        {navData.map(item=> (
          <NavListItem key={item._id} 
          item={item} 
          navOnClick={handleNavOnClick} />
        ))}
    </ul>
    <ul className="social">
        <li>
            <a href='#'>
                <i className="bi bi-meta"></i>
            </a>
        </li>
        <li>
            <a href='https://youtu.be/dQw4w9WgXcQ?si=wt3s_GGspunEzjDl' target="_blank">
                <i className="bi bi-youtube"></i>
            </a>
        </li>
    </ul>
  </div>
  );  
}

export default SideMenu;