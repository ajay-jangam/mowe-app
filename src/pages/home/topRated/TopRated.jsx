import React, { useState } from "react"
import Carousel from "../../../components/carousal/Carousel"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTab from "../../../components/switchTab/SwitchTab"
import useFetch from "../../../hooks/useFetch"

export default function Popular() {
	const [endpoint, setEndPoint] = useState("movie")
	const { data, loading } = useFetch(`/${endpoint}/top_rated`)
	const onTabChange = (tab) => {
		setEndPoint(tab === "Movies" ? "movie" : "tv")
	}

	return (
		<div className='trending'>
			<div className='trending__carousalSection'>
				<ContentWrapper>
					<h1 className='trending__carousalTitle'>Top Rated</h1>
					<SwitchTab
						data={["Movies", "TV Shows"]}
						onTabChange={onTabChange}
					/>
				</ContentWrapper>
				<Carousel
					data={data?.results}
					endpoint={endpoint}
					loading={loading}
				/>
			</div>
		</div>
	)
}
