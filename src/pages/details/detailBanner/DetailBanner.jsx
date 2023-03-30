import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import dayjs from "dayjs"
import "./detailBanner.scss"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import useFetch from "../../../hooks/useFetch.jsx"
import Genres from "../../../components/genres/Genres.jsx"
import CircleRating from "../../../components/circleRating/CircleRating"
import Img from "../../../components/lazyLoadImage/Img.jsx"
import PosterFallback from "../../../assets/images/no-poster.png"
import PlayButton from "../playButton/PlayButton"
import VideoPopup from "../../../components/videoPopup/VideoPopup"

export default function DetailsBanner({ video, crew }) {
	const [show, setShow] = useState(null)
	const [videoId, setVideoId] = useState(null)
	const { url } = useSelector((state) => state.home)
	const { mediaType, id } = useParams()
	const { data, loading } = useFetch(`/${mediaType}/${id}`)
	const _genres = data?.genres.map((g) => g.id)
	const directors = crew?.filter((d) => d.job === "Director")
	const writers = crew?.filter(
		(w) => w.job === "Writer" || w.job === "Screenplay" || w.job === "Story"
	)

	const toHoursAndMinutes = (totalMinutes) => {
		const hours = Math.floor(totalMinutes / 60)
		const minutes = totalMinutes % 60
		return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`
	}

	return (
		<div className='detailsBanner'>
			{!loading ? (
				<>
					{!!data && (
						<React.Fragment>
							<div className='backdrop-img'>
								<Img
									className={"backdropImg"}
									src={url.backdrop + data.backdrop_path}
								/>
							</div>
							<div className='opacityLayer'></div>
							<ContentWrapper>
								<div className='content'>
									<div className='left'>
										<Img
											className='posterImg'
											src={
												data?.poster_path
													? url.poster +
													  data?.poster_path
													: PosterFallback
											}
										/>
									</div>
									<div className='right'>
										<h2 className='title'>
											{data?.title || data?.name} (
											{dayjs(data?.release_date).format(
												"YYYY"
											)}
											)
										</h2>
										<span className='subtitle'>
											{data?.tagline}
										</span>
										<Genres data={_genres} />
										<div className='row'>
											<CircleRating
												rating={data?.vote_average?.toFixed(
													1
												)}
											/>
											<div
												className='playbtn'
												onClick={() => {
													setShow(true)
													setVideoId(video?.key)
												}}>
												<PlayButton />
												<span className='text'>
													Watch Trailer
												</span>
											</div>
										</div>
										<div className='overview'>
											<h3 className='heading'>
												Overview
											</h3>
											<p className='description'>
												{data?.overview}
											</p>
											<div className='info'>
												{data?.status && (
													<div className='infoItem'>
														<span className='text bold'>
															Status:{" "}
														</span>
														<span className='text'>
															{data.status}
														</span>
													</div>
												)}
												{data?.release_date && (
													<div className='infoItem'>
														<span className='text bold'>
															Release Date:{" "}
														</span>
														<span className='text'>
															{dayjs(
																data.release_date
															).format(
																"MMM DD YYYY"
															)}
														</span>
													</div>
												)}
												{data?.runtime && (
													<div className='infoItem'>
														<span className='text bold'>
															Running:{" "}
														</span>
														<span className='text'>
															{toHoursAndMinutes(
																data.runtime
															)}
														</span>
													</div>
												)}
											</div>
										</div>
										{directors?.length > 0 && (
											<div className='info'>
												<span className='text bold'>
													Director:{" "}
												</span>
												<div className='text'>
													{directors.map(
														(director, i) => (
															<span key={i}>
																{director.name}
																{directors?.length -
																	1 !==
																	i && ", "}
															</span>
														)
													)}
												</div>
											</div>
										)}
										{writers?.length > 0 && (
											<div className='info'>
												<span className='text bold'>
													Writer:{" "}
												</span>
												<div className='text'>
													{writers.map(
														(writer, i) => (
															<span key={i}>
																{writer.name}
																{writers?.length -
																	1 !==
																	i && ", "}
															</span>
														)
													)}
												</div>
											</div>
										)}
										{data?.created_by?.length > 0 && (
											<div className='info'>
												<span className='text bold'>
													Creator:{" "}
												</span>
												<span className='text'>
													{data?.created_by.map(
														(creator, i) => (
															<span key={i}>
																{creator.name}
																{data
																	?.created_by
																	?.length -
																	1 !==
																	i && ", "}
															</span>
														)
													)}
												</span>
											</div>
										)}
									</div>
								</div>
							</ContentWrapper>
							<VideoPopup
								show={show}
								setShow={setShow}
								videoId={videoId}
								setVideoId={setVideoId}
							/>
						</React.Fragment>
					)}
				</>
			) : (
				<div className='detailsBannerSkeleton'>
					<ContentWrapper>
						<div className='left skeleton'></div>
						<div className='right'>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
							<div className='row skeleton'></div>
						</div>
					</ContentWrapper>
				</div>
			)}
		</div>
	)
}
