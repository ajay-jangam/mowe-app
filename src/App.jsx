import { useEffect } from "react"
import "./App.css"
import { fetchDatafromApi } from "./utils/api"
import { useDispatch } from "react-redux"
import { getApiConfigurations } from "./store/homeSlice"

function App() {
	const dispatch = useDispatch()
	useEffect(() => {
		fetchApi()
	}, [])

	const fetchApi = () => {
		fetchDatafromApi("/movie/popular").then((response) => {
			console.log(response)
			dispatch(getApiConfigurations(response))
		})
	}

	return <div className='App'></div>
}

export default App
