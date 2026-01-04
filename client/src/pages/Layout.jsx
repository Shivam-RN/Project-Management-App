import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadTheme } from '../features/themeSlice'
import { Loader2Icon } from 'lucide-react'
import {useUser, SignIn} from '@clerk/clerk-react'

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { loading } = useSelector((state) => state.workspace)
    const dispatch = useDispatch()
    const  {user,isLoaded} = useUser();

    useEffect(() => {
        dispatch(loadTheme())
    }, [])

    if(!user){
    return(
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            gap: '2rem'
        }}>
            {/* Animated gradient overlay */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
                pointerEvents: 'none',
                zIndex: 0
            }}/>
            {/* Dot pattern */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
                backgroundSize: '50px 50px',
                pointerEvents: 'none',
                zIndex: 0
            }}/>
            
            {/* Logo */}
           <div style={{ position: 'relative', zIndex: 1 }}>
  <svg
    viewBox="-7 7 300 80"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: '320px', height: 'auto' }}
  >
    {/* Project board icon */}
    <g transform="translate(5, 28)">
      {/* Board 1 */}
      <rect x="0" y="0" width="56" height="14" rx="4" fill="#22c55e" />
      {/* Board 2 */}
      <rect x="0" y="18" width="56" height="14" rx="4" fill="#3b82f6" />
      {/* Board 3 */}
      <rect x="0" y="36" width="56" height="14" rx="4" fill="#d14141" />

      {/* Progress check */}
      <circle cx="46" cy="7" r="6" fill="white" />
      <path
        d="M43 7 l3 3 l6 -6"
        fill="none"
        stroke="#22c55e"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>

    {/* App name */}
    <text
      x="80"
      y="56"
      fontFamily="'Outfit', Arial, sans-serif"
      fontSize="38"
      fontWeight="700"
      fill="white"
      letterSpacing="-0.6"
    >
      Task
      <tspan fill="#b3bcdc">Stack</tspan>
    </text>

    {/* Tagline */}
    <text
      x="82"
      y="78"
      fontFamily="'Outfit', Arial, sans-serif"
      fontSize="14"
      fill="#e5e7eb"
      opacity="0.9"
    >
      Manage projects. Track progress.
    </text>
  </svg>
</div>

            
            {/* Sign in form */}
            <div style={{ position: 'relative', zIndex: 1 }}>
                <SignIn/>
            </div>
        </div>
    )
}

    if (loading) return (
        <div className='flex items-center justify-center h-screen bg-white dark:bg-zinc-950'>
            <Loader2Icon className="size-7 text-blue-500 animate-spin" />
        </div>
    )

    return (
        <div className="flex bg-white dark:bg-zinc-950 text-gray-900 dark:text-slate-100">
            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col h-screen">
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <div className="flex-1 h-full p-6 xl:p-10 xl:px-16 overflow-y-scroll">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout