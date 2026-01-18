# Weather App (Vanilla JS)

A responsive weather dashboard originally built 5 years ago and recently **refactored**. It provides real-time weather data and a 5-day forecast for cities worldwide, featuring multi-language support.

> **Note:** The API Key is exposed in `config.js` intentionally for demo purposes (Free Tier), allowing this static site to function on GitHub Pages without a backend server.

## Key Features

- Real-time Weather: Displays current temperature, humidity, wind speed, and weather conditions.

- 5-Day Forecast: Shows the forecast for the upcoming days (data filtered for mid-day).

- Internationalization (i18n): Full support for English (EN), Portuguese (PT), and Spanish (ES). The app updates interface text, date formats, and API responses dynamically without reloading the page.

- Secure Architecture: API keys are isolated in a configuration file and excluded from version control for security.

- Responsive Design: Optimized layout for both desktop and mobile devices using Bootstrap.

## Technologies Used

- HTML5 & CSS3

- JavaScript (ES6+) - Pure Vanilla JS (No frontend frameworks).

- Bootstrap 5 - For responsive layout and styling.

- Axios - For handling asynchronous HTTP requests.

- OpenWeatherMap API - Source for weather data (migrated to the 5-Day Forecast endpoint).

## Refactoring Highlights (2026)

This project was revisited to improve code quality, security, design and maintainability:

- API Migration: Updated from the deprecated "One Call API" to the free "5 Day / 3 Hour Forecast" endpoint, implementing custom filtering logic in JavaScript.

- Code Cleanup: Replaced multiple HTML files (one per language) with a Single Page Application (SPA) approach using a Javascript dictionary (translations.js) for instant language switching.

- Security: Implemented config.js and .gitignore patterns to prevent API Key exposure on GitHub.

- Visuals: Redesigned the interface with a modern, transparent aesthetic. Added interactive elements like a Dark Mode switch, hover effects, and distinct toast notifications for error handling, replacing standard browser alerts. Also updated the weather icon set to match specific API condition codes.
