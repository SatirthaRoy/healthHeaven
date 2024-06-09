import { Toaster } from 'react-hot-toast'
import { FaHome, FaUser } from 'react-icons/fa'
import { GiHamburgerMenu } from 'react-icons/gi'
import { MdEmail } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
import { NavLink, Outlet } from 'react-router-dom'
import SellerContents from './contents/Seller contents/SellerContents'
import Usercontents from './contents/User contents/Usercontents'
import useRole from '../../Hooks/useRole'
import AdminContents from './contents/Admin contents/AdminContents'
import HelemetTitle from '../../Shared components/HelemetTitle'
import { CiLogout } from 'react-icons/ci'
import useData from '../../Hooks/useData'

const Dashboard = () => {

  const [role] = useRole();
  const {logOut} = useData();
  return (
    <div className='flex justify-start bg-white'>
      <HelemetTitle title='Dashboard || HH'/>
      <Toaster
        position="top-center"
        reverseOrder={false}
      /> 
      <div className="drawer lg:drawer-open max-w-0 lg:max-w-80">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label htmlFor="my-drawer-2" className="text-4xl drawer-button lg:hidden fixed top-4 left-4"><GiHamburgerMenu /></label>
        
        </div> 
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 min-h-full bg-theme text-base-content *:p-1 space-y-2">
            {/* close drawer */}
            <label htmlFor="my-drawer-2" className="text-4xl drawer-button lg:hidden absolute top-6 right-4"><RxCross1/></label>
            {/* Sidebar content here */}
            <h1 className='text-9xl boska font-black text-white'>HH</h1>
            {/* add dashboard content according to role */}
            {/* {admin ? <AdminContent/> : <UserContent/>} */}
            { role === 'seller' && <SellerContents/> }
            {role === 'user' && <Usercontents/>}
            {role === 'admin' && <AdminContents/>}
            {/* navigations */}
            <div className='divider before:bg-white after:bg-white'></div>
            <NavLink to='/' className={({isActive}) => isActive ? 'text-white cinzel flex gap-4 items-center text-base' : `cinzel flex gap-4 items-center text-base`}><FaHome className='text-2xl'/>Home</NavLink>
            <NavLink to='/updateprofile' className={({isActive}) => isActive ? 'text-white cinzel flex gap-4 items-center text-base' : `cinzel flex gap-4 items-center text-base`}><FaUser className='text-2xl'/>Update Profile</NavLink>
            <button onClick={logOut} className={`flex gap-4 items-center text-base`}><CiLogout className='text-2xl' />Logout</button>
          </ul>
        
        </div>
      </div>


      <div className='w-full flex items-center justify-center'>
        <Outlet/>
      </div>
      
    </div>
  )
}

export default Dashboard