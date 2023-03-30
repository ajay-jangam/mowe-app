import React from "react"
import Carousel from "../../../components/carousal/Carousel.jsx"
import useFetch from "../../../hooks/useFetch.jsx"

export default function Recommendation({ mediaType, id }) {
	const { data, loading, error } = useFetch(
		`/${mediaType}/${id}/recommendations`
	)

	return (
		<Carousel
			title='Recommendations'
			data={data?.results}
			loading={loading}
			endpoint={mediaType}
		/>
	)
}
