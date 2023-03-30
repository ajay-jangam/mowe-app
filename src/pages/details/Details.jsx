import React from "react"
import useFetch from "../../hooks/useFetch"
import DetailsBanner from "./detailBanner/DetailBanner"
import "./details.scss"
import { useParams } from "react-router-dom"
import Cast from "./cast/Cast"
import VideosSection from "./videoSection/VideoSection"
import Similar from "./carousels/Similar"
import Recommendation from "./carousels/Recommendation"

export default function Details() {
	const { mediaType, id } = useParams()
	const { data, loading } = useFetch(`/${mediaType}/${id}/videos`)
	const { data: credits, loading: creditsLoading } = useFetch(
		`/${mediaType}/${id}/credits`
	)

	return (
		<div>
			<DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
			<Cast data={credits?.cast} loading={loading} />
			<VideosSection data={data} />
			<Similar mediaType={mediaType} id={id} />
			<Recommendation mediaType={mediaType} id={id} />
		</div>
	)
}
