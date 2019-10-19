import React, { useEffect, useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom'; 

function NavBar(props) {

  const [activeMenu, setActiveMenu] = useState('home');
  
  useEffect(() => {
    const pathname = props.location.pathname;
    if (pathname === '/home') setActiveMenu('home');
    else if (pathname === '/simulator') setActiveMenu('simulator');

    return;
  }, [props.location.pathname])

  return (
    <Menu fixed='top' className='navbar'>
      <Link to='/'>
        <h2><i className="fas fa-link"></i> Supply Chain</h2>
      </Link>
      <Menu.Menu position='right'>
        <Menu.Item>
          <Link to='/' className={activeMenu === 'home' ? 'active' : ''}>Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/simulator' className={activeMenu === 'simulator' ? 'active' : ''}>Simulator</Link>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}

export default withRouter(NavBar);