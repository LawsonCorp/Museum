import frame from "./assets/images/frame.png";
import hercules1Crop from "./assets/images/hercules1-crop.jpg";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import "./App.css";

function App() {
	const startButton = useRef(null);
	const wall = useRef(null);
	const hero = useRef(null);
	const expo = useRef(null);
	const paint = useRef(null);
	const backButton = useRef(null);

	const [data, setData] = useState([]);
	const [wallTitle, setWallTitle] = useState("");
	const [wallText, setWallText] = useState("");

	useEffect(() => {
		axios
			.get("http://localhost:8080/data")
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	useEffect(() => {
		if (startButton.current && hero) {
			const startButtonElement = startButton.current;
			const heroDiv = hero.current;
			startButtonElement.addEventListener("click", () => {
				heroDiv.classList.add("open");
				setTimeout(() => {
					heroDiv.style.display = "none";
				}, 1000);
			});
		}
	}, []);

	useEffect(() => {
		if (data) {
			const expos = document.getElementsByClassName("app__expo-artwork");
			const exposPicker = document.getElementsByClassName(
				"app__expo-artwork_frame"
			);
			const expoTitle = document.getElementsByClassName(
				"app__expo-container_title-expo"
			)[0];
			expoTitle.style.opacity = 1;
			const paintTitle = document.getElementsByClassName(
				"app__expo-container_title-paint"
			);

			if (
				expos &&
				expo.current &&
				exposPicker &&
				expoTitle &&
				backButton.current
			) {
				const expoElement = expo.current;
				const backButtonElement = backButton.current;

				backButtonElement.addEventListener("click", () => {
					for (let x = 0; x < expos.length; x++) {
						expoElement.style.display = "block";
						backButtonElement.style.display = "none";
						setTimeout(() => {
							expos[x].classList.remove("turned");
							expos[x].style.opacity = 1;
							expoElement.style.opacity = 1;
						}, 1000);
					}
				});

				for (let y = 0; y < expos.length; y++) {
					const expoPaint = document
						.getElementsByClassName("app__expo-artwork_frame-paint")
						[y].getElementsByTagName("img")[0];

					exposPicker[y]
						.getElementsByTagName("img")[0]
						.addEventListener("click", () => {
							for (let x = 0; x < expos.length; x++) {
								expos[x].classList.add("turned");
								expos[x].style.opacity = 0;
								expoElement.style.opacity = 0;
								setTimeout(() => {
									expoElement.style.display = "none";
									backButtonElement.style.display = "block";
								}, 1000);
							}
							if (wall.current && paint.current) {
								const wallElement = wall.current;
								const paintElement = paint.current;

								setWallTitle(data.results[y].title);
								setWallText(data.results[y].text);

								paintElement.src = expoPaint.src;
								setTimeout(() => {
									wallElement.style.opacity = 1;
								}, 1000);
							}
						});
					exposPicker[y]
						.getElementsByTagName("img")[0]
						.addEventListener("mouseover", () => {
							expoTitle.style.opacity = 0;
							for (let z = 0; z < expos.length; z++) {
								paintTitle[z].style.opacity = 0;
							}
							paintTitle[y].style.opacity = 1;
						});

					exposPicker[y]
						.getElementsByTagName("img")[0]
						.addEventListener("mouseout", () => {
							expoTitle.style.opacity = 1;
							for (let z = 0; z < expos.length; z++) {
								paintTitle[z].style.opacity = 0;
							}
						});

					exposPicker[y]
						.getElementsByTagName("img")[0]
						.addEventListener("mouseout", () => {
							expoTitle.style.opacity = 1;
							for (let z = 0; z < expos.length; z++) {
								paintTitle[z].style.opacity = 0;
							}
						});
				}
			}
		}
	}, [data]);

	return (
		<div className="app">
			<div ref={hero} className="app__hero">
				<div className="app__hero-container">
					<h1 className="app__hero-container__title">Museo</h1>
					<button ref={startButton} className="app__hero-container__button">
						Se Lancer dans l'aventure
					</button>
					<h2 className="app__hero-container__subtitle">
						Découvrez l'histoire de Jason et son voyage à Iolcos
					</h2>
				</div>
			</div>

			<div ref={expo} className="app__expo">
				<div className="app__expo-container">
					<div className="app__expo-container_title">
						<h1 className="app__expo-container_title-expo">Exposition Jason</h1>

						{data.results
							? data.results.map((element, index) => (
									<h1 className="app__expo-container_title-paint" key={index}>
										{element.title}
									</h1>
							  ))
							: null}
					</div>
					{data.results
						? data.results.map((element, index) => (
								<div className="app__expo-artwork" key={index}>
									<div className="app__expo-artwork_frame">
										<img src={frame} alt="frame"></img>
										<div className="app__expo-artwork_frame-paint">
											<img src={element.imgUrl} alt="paint" />
										</div>
									</div>
								</div>
						  ))
						: null}
				</div>
			</div>

			<div ref={wall} className="app__star">
				<div className="app__star-container">
					<div ref={backButton} className="app__star-container_controls">
						<IoArrowBackCircleOutline />
					</div>
					<div className="app__star-container_artwork">
						<div className="app__star-container_artwork-frame">
							<img src={frame} alt="frame" />
							<div className="app__star-container_artwork-frame_paint">
								<img ref={paint} src={hercules1Crop} alt="paint" />
							</div>
						</div>
					</div>

					<div className="app__star-container_caption">
						<h1 className="app__star-container_caption-title">{wallTitle}</h1>
						<p className="app__star-container_caption-text">{wallText}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
