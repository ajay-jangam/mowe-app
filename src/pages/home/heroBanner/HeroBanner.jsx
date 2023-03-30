import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import useFetch from "../../../hooks/useFetch"
import "./heroBanner.scss"
import { useSelector } from "react-redux"
import Img from "../../../components/lazyLoadImage/Img"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"

export default function HeroBanner() {
	const [backgroundImage, setBackgroundImage] = useState("")
	const [query, setQuery] = useState("")
	const navigate = useNavigate()
	const { data, loading } = useFetch("/movie/upcoming")
	const { url } = useSelector((state) => state.home)

	useEffect(() => {
		const bgImage =
			url?.backdrop +
			data?.results?.[Math.floor(Math.random() * data?.results.length)]
				.backdrop_path
		setBackgroundImage(bgImage)
	}, [data])

	const searchQueryHandler = (e) => {
		if (e.key === "Enter" && query.length > 3) {
			navigate(`/search/${query}`)
		}
	}

	return (
		<div className={"heroBanner"}>
			{!loading && (
				<div className={"heroBanner__backdropImage"}>
					<Img src={backgroundImage} />
				</div>
			)}
			<div className='opacityLayer'></div>
			<ContentWrapper>
				<div className={"heroBanner__container"}>
					<div className={"heroBanner__content"}>
						<span className={"heroBanner__title"}>
							The Mo"<strong>We</strong>" Way Of Life
						</span>
						<span className={"heroBanner__subTitle"}>
							Millions of movies, TV shows and peoples to
							discover. Explore now
						</span>
						<div className={"heroBanner__search"}>
							<input
								type='text'
								placeholder='Search for entertainment...'
								value={query}
								onChange={(e) => setQuery(e.target.value)}
								onKeyDown={(e) => searchQueryHandler(e)}
							/>
							<button
								onClick={() => navigate(`/search/${query}`)}>
								Search{" "}
							</button>
						</div>
					</div>
				</div>
			</ContentWrapper>
		</div>
	)
}
