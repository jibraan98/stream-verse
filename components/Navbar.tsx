'use client'
import React, {useState, useCallback, useEffect} from 'react'
import NavbarItem from './NavbarItem'
import { AiFillCaretDown } from 'react-icons/ai'
import { BsSearch, BsBell } from 'react-icons/bs'
import MobileMenu from './MobileMenu'
import AccountMenu from './AccountMenu'

const TOP_OFFSET = 66;

const Navbar = () => {
    const[showMobileMenu, setShowmobileMenu] = useState(false)
    const[showAccountMenu, setAccountMenu] = useState(false)
    const [showBackground, setShowBackground] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            } else {
                setShowBackground(false)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const toggleMobileMenu = useCallback(() => {
        setShowmobileMenu((current) => !current)
    },[])

    const toggleAccountMenu = useCallback(() => {
        setAccountMenu((current) => !current)
    },[])
  return (
    <nav className='w-full fixed z-40'>
        <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500  ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className='h-4 lg:h-7' src="/images/logo.png" alt="Logo" />
            <div className='flex-row ml-8 gap-7 hidden lg:flex'>
               <NavbarItem label='Home'/> 
               <NavbarItem label='TV Shows'/>
               <NavbarItem label='Movies'/>
               <NavbarItem label='New & Popular'/>
               <NavbarItem label='My List'/>
               <NavbarItem label='Browse by Languages'/>
            </div>
            <div onClick={toggleMobileMenu} className='lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer'>
                <p className='text-white text-sm'>Browse</p>
                <AiFillCaretDown className={`text-white transition ${showMobileMenu ? 'rotate-180' : 'rotate-0'} ` }/>
                <MobileMenu visible={showMobileMenu}/>
            </div>
            <div className='flex flex-row ml-auto gap-7 items-center'>
                <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
                    <BsSearch />
                </div>
                <div className='text-gray-200 hover:text-gray-300 cursor-pointer'>
                    <BsBell />
                </div>
                <div onClick={toggleAccountMenu} className='flex flex-row items-center gap-2 cursor-pointer relative'>
                    <div className='w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden'>
                        <img src="/images/default-blue.png" alt="logo" />
                    </div>
                    <AiFillCaretDown className={`text-white transition ${showAccountMenu ? 'rotate-180' : 'rotate-0'} ` }/>
                    <AccountMenu visible={showAccountMenu}/>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar