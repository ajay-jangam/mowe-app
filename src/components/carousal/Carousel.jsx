import React, { useRef } from "react"
import "./carousel.scss"
import {
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
import ContentWrapper from "../contentWrapper/ContentWrapper"
import Img from "../lazyLoadImage/Img"
import PosterFallback from "../../assets/images/no-poster.png"
import CircleRating from "../circleRating/CircleRating"
import Genres from "../genres/Genres"
import { useNavigate } from "react-router-dom"

export default function Carousel({ data, loading, endpoint, title }) {
	const carouselContainer = useRef()
	const navigate = useNavigate()
	const { url } = useSelector((state) => state.home)

	// Navigation for carousel arrows
	const navigation = (dir) => {
		const container = carouselContainer.current

		const scrollAmount =
			dir === "left"
				? container.scrollLeft - (container.offsetWidth + 20)
				: container.scrollLeft + (container.offsetWidth + 20)

		container.scrollTo({
			left: scrollAmount,
			behavior: "smooth",
		})
	}

	// Skelton render
	const skItems = () => {
		return (
			<div className='skeletonItem'>
				<div className='posterBlock skeleton'></div>
				<div className='textBlock'>
					<span className='title skeleton'></span>
					<span className='date skeleton'></span>
				</div>
			</div>
		)
	}

	return (
		<div className='carousel'>
			<ContentWrapper>
				{title && <div className='carouselTitle'>{title}</div>}
				<BsFillArrowLeftCircleFill
					className='carouselLeftNav arrow'
					onClick={() => navigation("left")}
				/>
				<BsFillArrowRightCircleFill
					className='carouselRighttNav arrow'
					onClick={() => navigation("right")}
				/>

				{!loading ? (
					<div className='carouselItems' ref={carouselContainer}>
						{data?.map((item) => {
							const posterUrl = item.poster_path
								? url.poster + item.poster_path
								: PosterFallback
							return (
								<div
									className='carouselItem'
									onClick={() => {
										navigate(
											`/${item.media_type || endpoint}/${
												item.id
											}`
										)
									}}
									key={item.id}>
									<div className='posterBlock'>
										<Img
											src={posterUrl}
											alt={item.original_title}
										/>
										<CircleRating
											rating={item?.vote_average?.toFixed(
												1
											)}
										/>
										<Genres
											data={item?.genre_ids?.slice(0, 2)}
										/>
									</div>
									<div className='textBlock'>
										<span className='title'>
											{item.title || item.name}
										</span>
										<span className='date'>
											{dayjs(item.release_date).format(
												"MMM DD, YYYY"
											)}
										</span>
									</div>
								</div>
							)
						})}
					</div>
				) : (
					<div className='loadingSkeleton'>
						{skItems()}
						{skItems()}
						{skItems()}
						{skItems()}
						{skItems()}
					</div>
				)}
			</ContentWrapper>
		</div>
	)
}
