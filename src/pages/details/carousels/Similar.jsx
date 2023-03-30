import React from "react"
import Carousel from "../../../components/carousal/Carousel.jsx"
import useFetch from "../../../hooks/useFetch.jsx"

export default function Similar({ mediaType, id }) {
	const { data, loading, error } = useFetch(`/${mediaType}/${id}/similar`)

	const title = mediaType === "tv" ? "Similar TV Shows" : "Similar Movies"
	return (
		<Carousel
			title={title}
			data={data?.results}
			loading={loading}
			endpoint={mediaType}
		/>
	)
}
