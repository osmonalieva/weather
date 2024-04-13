import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
	const [city, setCity] = useState('')
	const [weatherData, setWeatherData] = useState(null)
	const [error, setError] = useState(null)
	const API_KEY = '0343c93c1985dc54f5305d632d3edba7'

	const getWeather = async () => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city},KG&appid=${API_KEY}&units=metric`
			)
			const data = await response.json()
			if (response.ok) {
				setWeatherData(data)
				setError(null)
			} else {
				setError(
					'Город не найден или произошла ошибка при получении данных о погоде.'
				)
				setWeatherData(null)
			}
		} catch (error) {
			console.error('Ошибка при получении данных о погоде:', error)
			setError('Произошла ошибка при получении данных о погоде.')
			setWeatherData(null)
		}
	}

	useEffect(() => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(async position => {
				const { latitude, longitude } = position.coords
				try {
					const response = await fetch(
						`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
					)
					const data = await response.json()
					if (response.ok) {
						setWeatherData(data)
						setError(null)
					} else {
						setError('Произошла ошибка при получении данных о погоде.')
						setWeatherData(null)
					}
				} catch (error) {
					console.error('Ошибка при получении данных о погоде:', error)
					setError('Произошла ошибка при получении данных о погоде.')
					setWeatherData(null)
				}
			})
		} else {
			setError('Геолокация не поддерживается вашим браузером.')
		}
	}, [])

	const renderWeatherInfo = () => {
		if (error) {
			return <p>{error}</p>
		} else if (weatherData) {
			let weatherCondition = null
			if (
				weatherData &&
				weatherData.weather &&
				weatherData.weather.length > 0
			) {
				weatherCondition = weatherData.weather[0].main.toLowerCase()
			}

			let weatherContent = null

			if (weatherCondition === 'rain') {
				weatherContent = (
					<div className='block' >
						<h1 style={{color:'black'}}>Погода в городе {weatherData.name}:</h1>
						<p style={{color:'black'}}>Температура: {weatherData.main.temp}°C</p>=
						<p style={{color:'black'}}>Ощущается как: {weatherData.main.feels_like}°C</p>
						<p style={{color:'black'}}>Минимальная температура: {weatherData.main.temp_min}°C</p>
						<p style={{color:'black'}}>Максимальная температура: {weatherData.main.temp_max}°C</p>
						<p style={{color:'black'}}>Скорость ветра: {weatherData.wind.speed} м/с</p>
						<p style={{color:'black'}}>Атмосферное давление: {weatherData.main.pressure} hPa</p>
						<p style={{color:'black'}}>Влажность: {weatherData.main.humidity}%</p>
						<p style={{color:'black'}}>Погодные условия: {weatherData.weather[0].description}</p>
						<iframe
							width='560'
							height='315'
							src='https://cdn.pixabay.com/video/2023/02/13/150531-798555662_large.mp4'
							allowfullscreen
							loop
							className='chatptVidio'
						></iframe>
					</div>
				)
			} else if (weatherCondition === 'spring') {
				weatherContent = (
					<div className='block'>
						<h2>Погода в городе {weatherData.name}:</h2>
						<p>Сейчас весна! Ура!</p>
					</div>
				)
			} else {
				weatherContent = (
					<div className='block'>
						<h2>Погода в городе {weatherData.name}:</h2>
						<p>Температура: {weatherData.main.temp}°C</p>
						<p>Ощущается как: {weatherData.main.feels_like}°C</p>
						<p>Минимальная температура: {weatherData.main.temp_min}°C</p>
						<p>Максимальная температура: {weatherData.main.temp_max}°C</p>
						<p>Скорость ветра: {weatherData.wind.speed} м/с</p>
						<p>Атмосферное давление: {weatherData.main.pressure} hPa</p>
						<p>Влажность: {weatherData.main.humidity}%</p>
						<p>Погодные условия: {weatherData.weather[0].description}</p>
						<img
							src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTOv2UZkA46QVgS2Xqf1ZqoZ9D81zCzltwg&s'
							alt=''
							className='chatptVidio'
						/>
					</div>
				)
			}
			return weatherContent
		} else {
			return null
		}
	}

	return (
		<div className='App'>
			<h1>Погода в Кыргызстане</h1>
			<input
				type='text'
				placeholder='Введите название города'
				value={city}
				onChange={e => setCity(e.target.value)}
			/>
			<button onClick={getWeather}>Получить погоду</button>
			{renderWeatherInfo()}
		</div>
	)
}

export default App
