import React, { useState, useEffect } from "react"
import "./header.scss"
import { HiOutlineSearch } from "react-icons/hi"
import { SlMenu } from "react-icons/sl"
import { VscChromeClose } from "react-icons/vsc"
import { useNavigate, useLocation } from "react-router-dom"
import ContentWrapper from "../contentWrapper/ContentWrapper"
import logo from "../../assets/images/mowe-icon-white.png"

export default function Header() {
	const [show, setShow] = useState("top")
	const [lastScrollY, setLastScrollY] = useState(0)
	const [mobileMenu, setMobileMenu] = useState(false)
	const [query, setQuery] = useState("")
	const [showSearch, setShowSearch] = useState("")
	const navigate = useNavigate()
	const location = useLocation()

	// uesEffect for location scroll
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location])

	// Search bar handler
	const searchQueryHandler = (e) => {
		if (e.key === "Enter" && query.length > 3) {
			navigate(`/search/${query}`)
		}

		setTimeout(() => {
			setShowSearch(false)
		}, 3000)
	}

	// Handle Menu/Serach Item
	const openSearch = () => {
		setMobileMenu(false)
		setShowSearch(true)
	}
	const openMobileMenu = () => {
		setMobileMenu(true)
		setShowSearch(false)
	}

	// Navigation Handler
	const navigationHandler = (type) => {
		if (type === "movie") {
			navigate("/explore/movie")
		} else {
			navigate("/explore/tv")
		}
		setMobileMenu(false)
	}

	// Scroll Handler
	const controlNavbar = () => {
		if (window.scrollY > 200) {
			if (window.scrollY > lastScrollY && !mobileMenu) {
				setShow("hide")
			} else {
				setShow("show")
			}
		} else {
			setShow("top")
		}
		setLastScrollY(window.scrollY)
	}

	// useEffect for scroll
	useEffect(() => {
		window.addEventListener("scroll", controlNavbar)
		return () => {
			window.removeEventListener("scroll", controlNavbar)
		}
	}, [lastScrollY])

	return (
		<header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
			<ContentWrapper>
				<div className='header__logo'>
					<img src={logo} alt='logo' onClick={() => navigate("/")} />
				</div>
				<div className='header__menuItems menuItems'>
					<ul
						className='header__menuItem menuItem'
						onClick={() => navigationHandler("movie")}>
						Movies
					</ul>
					<ul
						className='header__menuItem menuItem'
						onClick={() => navigationHandler("tv")}>
						TV Shows
					</ul>
					<ul className='header__menuItem menuItem'>
						<HiOutlineSearch onClick={openSearch} />
					</ul>
				</div>
				<div className='header__mobileMenuItems'>
					<HiOutlineSearch onClick={openSearch} />
					{mobileMenu ? (
						<VscChromeClose onClick={() => setMobileMenu(false)} />
					) : (
						<SlMenu onClick={openMobileMenu} />
					)}
				</div>
			</ContentWrapper>

			{showSearch && (
				<div className='searchBar'>
					<ContentWrapper>
						<div className='searchBar__searchInput'>
							<input
								type='text'
								placeholder='Search for a movie orTV show...'
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								onKeyDown={(e) => searchQueryHandler(e)}
							/>
							<VscChromeClose
								onClick={() => setShowSearch(false)}
							/>
						</div>
					</ContentWrapper>
				</div>
			)}
		</header>
	)
}
