import React, { useState } from "react"
import "./switchTab.scss"
export default function SwitchTab({ data, onTabChange }) {
	const [selectedTab, setSelected] = useState(0)
	const [left, setLeft] = useState(0)

	const activeTab = (tab, index) => {
		setLeft(index * 100)
		setTimeout(() => {
			setSelected(index)
		}, 300)
		onTabChange(tab)
	}
	return (
		<div className='switchingTab'>
			<div className='switchingTab__tabItems'>
				{data.map((tab, index) => {
					return (
						<span
							className={`switchingTab__tabItem ${
								selectedTab === index ? "active" : ""
							}`}
							key={index}
							onClick={() => activeTab(tab, index)}>
							{tab}
						</span>
					)
				})}
				<span className='switchingTab__movingBg' style={{ left }} />
			</div>
		</div>
	)
}
