# Star Wars Heroes & Starships Dashboard

### Project Overview

This project is a user interface for displaying information about Star Wars heroes and starships. It leverages **React**, **TypeScript**, **Zustand**, and **SWR** libraries for state management and data caching. The main goal of the project is to minimize API requests by caching data on the client side.

### Key Technologies

- **React** for building the user interface.
- **TypeScript** for type safety.
- **Zustand** for state management.
- **SWR** for data caching.
- **React Router** for navigation within the app.
- **NextUI** for UI components.
- **Tailwind CSS** for styling.

### Project Structure

```plaintext
src/
|-- app/
|   |-- ui/
|       |-- hero-page/  # Hero page component
|       |-- home-page/  # Home page component
|-- shared/
|   |-- hooks/          # Custom hooks using Zustand
|-- lib/                # Shared types and routes
|-- widgets/
|   |-- layout/         # Layout component
|-- public/             # Public assets
|-- node_modules/       # Project dependencies
```

# Star Wars Heroes & Starships Dashboard

## Caching and Optimization

The main task was to cache API results and reduce server load. We used **SWR** and **Zustand** libraries for caching:

- **SWR** is responsible for caching the heroes' data.
- **Zustand** caches an array of movies and starships.

The cache stores the films and starships that have already been retrieved from the API. When switching heroes, the system first checks the cache, and if the requested hero is not found, it makes a new request to the API. This minimizes server load since most of the data is cached on the client.

To fetch starships, we implemented a stepwise selection because the API does not support batch requests and returns errors when handling too many requests simultaneously. We use `await` to fetch each starship one by one, ensuring the next request is sent only after the previous one completes.

## Components

### HeroPage:

- Displays information about the selected hero, including films and starships.
- Films and starships are cached using **Zustand** and retrieved when necessary.

### HomePage:

- Contains a list of all heroes and pagination to navigate through the pages.
- Pagination is implemented using **React Router** and **NextUI** components.

### Layout:

- The main layout of the application, including a header and footer, where pages are loaded via **React Router Outlet**.

## Setup Instructions

### Install dependencies:

```bash
npm install
```

### Start the project in development mode:

```bash
npm start
```

### To build the project for production:

```bash
npm run build
```

## Environment Variables

The project uses the following environment variables, which should be added to the `.env` file:

```plaintext
REACT_APP_API_URL=<API URL>
```
