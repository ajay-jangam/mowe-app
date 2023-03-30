import { useEffect, useState } from "react"
import { fetchDataFromApi } from "../utils/api"

export default function useFetch(url) {
	const [loading, setLoading] = useState(null)
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)

	useEffect(() => {
		setLoading("Loading...")
		setData(null)
		setError(null)

		fetchDataFromApi(url)
			.then((res) => {
				setLoading(false)
				setData(res)
			})
			.catch((err) => {
				setLoading(false)
				setError("Something went wrong")
			})
	}, [url])

	return { loading, data, error }
}
