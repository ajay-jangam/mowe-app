import React, { useEffect, useState } from "react"
import InfiniteScroll from "react-infinite-scroll-component"
import { useParams } from "react-router-dom"
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"
import MovieCard from "../../components/moveiCard/MovieCard.jsx"
import Spinner from "../../components/spinner/Spinner"
import { fetchDataFromApi } from "../../utils/api"
import "./searchResult.scss"
import noResultFoundImg from "../../assets/images/no-results.png"
import Img from "../../components/lazyLoadImage/Img"

export default function SearchResult() {
	const [data, setData] = useState(null)
	const [pageNumber, setPageNumber] = useState(1)
	const [loading, setLoading] = useState(false)
	const { query } = useParams()

	// Fetch serch response from server
	const fetchInitialData = () => {
		setLoading(true)
		fetchDataFromApi(
			`/search/multi?query=${query}&page=${pageNumber}`
		).then((response) => {
			setData(response)
			setPageNumber((prev) => prev + 1)
			setLoading(false)
		})
	}

	// fetch by clicking next button
	const fetchNextPageData = () => {
		fetchDataFromApi(
			`/search/multi?query=${query}&page=${pageNumber}`
		).then((response) => {
			if (data?.results) {
				setData({
					...data,
					results: [...data?.results, ...response.results],
				})
			} else {
				setData(response)
			}
			setPageNumber((prev) => prev + 1)
		})
	}

	useEffect(() => {
		setPageNumber(1)
		fetchInitialData()
	}, [query])

	return (
		<div className='searchResultsPage'>
			{loading ? (
				<Spinner initial={true} />
			) : (
				<ContentWrapper>
					{data?.results?.length > 0 ? (
						<>
							<h2 className='pageTitle'>
								{`Search ${
									data?.total_results > 1
										? `Results`
										: `Result`
								} of '${query}'`}
							</h2>
							<InfiniteScroll
								className='content'
								dataLength={data?.results?.length || []}
								hasMore={pageNumber <= data.total_pages}
								next={fetchNextPageData}
								loader={<Spinner />}>
								{data?.results.map((result) => (
									<MovieCard
										key={result.id}
										data={result}
										fromSearch={true}
										mediaType={result?.media_type}
									/>
								))}
							</InfiniteScroll>
						</>
					) : (
						<div className='resultNotFound'>
							<Img src={noResultFoundImg} />
							<span className='noResultText'>
								Sorry no results were found
							</span>
						</div>
					)}
				</ContentWrapper>
			)}
		</div>
	)
}
