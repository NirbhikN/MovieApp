# MovieApp - Full Stack Web Application

MovieApp is a full-stack web application designed to fetch, search, and display movies from an external API. Users can explore movie details, view trailers, and maintain a list of their favorite movies. Authentication is implemented, allowing users to log in and manage their favorites. The application is built using **Angular** on the frontend, **Spring Boot** on the backend, and it leverages **JWT (JSON Web Token)** for secure user authentication. User data is stored in **MongoDB** and **MySQL**.

## Features
- **Search and Browse Movies**: Users can search for movies by title and view detailed information including trailers.
- **Favorites List**: Authenticated users can add or remove movies to/from their favorites list.
- **Authentication and Authorization**: Users must register and log in to use certain features like managing their favorite movies.
- **JWT Validation**: Ensures secure access to protected routes.
- **Microservices Architecture**: Backend services are structured as microservices for better scalability and maintainability.
- **External API Integration**: Movie data is fetched from an external movie API.
  
## Technologies Used
### Frontend (Angular)
- **Angular**: Framework for building the user interface.
- **HTML5 & CSS3**: For structuring and styling the application.
- **TypeScript**: Superset of JavaScript, used for building Angular components.
- **Bootstrap**: For responsive design.

### Backend (Spring Boot)
- **Spring Boot**: Framework for building the backend REST API.
- **Spring Security**: For handling authentication and authorization.
- **JWT (JSON Web Token)**: For secure user authentication.
- **MySQL**: For relational database storage of user data.
- **MongoDB**: For non-relational database storage (optional movie details or user preferences).

### Others
- **External Movie API**: For fetching movie data.
- **Docker**: (Optional) Containerization for microservices.
- **Postman**: For testing API endpoints.
