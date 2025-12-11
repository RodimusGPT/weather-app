# Weather App

A simple, mobile-friendly weather application built with Next.js 16.

## Features

- Current weather conditions with temperature, humidity, wind, and pressure
- 5-day weather forecast
- City search with autocomplete
- Geolocation support (use your current location)
- Unit toggle (Celsius/Fahrenheit)
- PWA support for mobile installation
- Responsive design optimized for mobile devices

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand with persistence
- **Weather API**: OpenWeatherMap

## Getting Started

### Prerequisites

- Node.js 18+
- OpenWeatherMap API key (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/RodimusGPT/weather-app.git
cd weather-app
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file with your API key:
```bash
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## API Key

Get your free API key at [OpenWeatherMap](https://openweathermap.org/api).

## License

MIT
