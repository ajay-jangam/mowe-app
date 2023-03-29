import React, { useState } from "react"
import Carousel from "../../../components/carousal/Carousel"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTab from "../../../components/switchTab/SwitchTab"
import useFetch from "../../../hooks/useFetch"

export default function Tranding() {
	const [endpoint, setEndPoint] = useState("day")
	const { data, loading } = useFetch(`/trending/all/${endpoint}`)
	const onTabChange = (tab) => {
		setEndPoint(tab === "Day" ? "day" : "week")
	}

	return (
		<div className='trending'>
			<div className='trending__carousalSection'>
				<ContentWrapper>
					<h1 className='trending__carousalTitle'>Trending</h1>
					<SwitchTab
						data={["Day", "Week"]}
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
