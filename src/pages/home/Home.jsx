import React from "react"
import HeroBanner from "./heroBanner/HeroBanner"
import "./home.scss"
import Popular from "./popular/Popular"
import Tranding from "./tranding/Tranding"
import TopRated from "./topRated/TopRated"
export default function Home() {
	return (
		<div className='homePage'>
			<HeroBanner />
			<Tranding />
			<Popular />
			<TopRated />
		</div>
	)
}
