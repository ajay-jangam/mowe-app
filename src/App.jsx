import React, { useEffect } from "react"
import "./App.css"
import { fetchDatafromApi } from "./utils/api"
import { useDispatch } from "react-redux"
import { getApiConfigurations, getGenres } from "./store/homeSlice"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import SearchResult from "./pages/searchResult/SearchResult"
import Explore from "./pages/explore/Explore"
import Details from "./pages/details/Details"
import PageNotFound from "./pages/404/PageNotFound"
import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"

function App() {
	const dispatch = useDispatch()

	// useEffect for API calls
	useEffect(() => {
		fetchApiConfig()
		genresCalls()
	}, [])

	// Fetch image urls from server for multiple image types
	const fetchApiConfig = () => {
		fetchDatafromApi("/configuration").then((response) => {
			const imageUrl = {
				backdrop: response.images.secure_base_url + "original",
				poster: response.images.secure_base_url + "original",
				profile: response.images.secure_base_url + "original",
			}

			// Store recieved image urls in redux store for globle use
			dispatch(getApiConfigurations(imageUrl))
		})
	}

	// Fetch Genres Api
	const genresCalls = async () => {
		const promises = []
		const endPoints = ["movie", "tv"]
		const allGenres = {}

		endPoints.forEach((url) => {
			promises.push(fetchDatafromApi(`/genre/${url}/list`))
		})

		const data = await Promise.all(promises)

		data?.map(({ genres }) => {
			return genres.map((item) => (allGenres[item.id] = item))
		})

		// Store all genres in redux store for globle use
		dispatch(getGenres(allGenres))
	}

	return (
		<div className='App'>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/:mediaType/:id' element={<Details />} />
					<Route path='/search/:query' element={<SearchResult />} />
					<Route path='/explore/:mediaType' element={<Explore />} />
					<Route path='*' element={<PageNotFound />} />
				</Routes>
				<Footer />
			</BrowserRouter>
		</div>
	)
}

export default App
