# Full-Stack Task Management Application

A clean, layered RESTful Web Application built with **Spring Boot** and **Angular**, using **PostgreSQL** for persistence and **Docker** for containerization.

---

## 🏗️ Architecture & Design Patterns

The backend follows clean architecture principles with strict separation of concerns:
- **Controller Layer (`@RestController`)**: Handles HTTP requests/responses and request mapping.
- **Service Layer (`@Service`)**: Encapsulates core business logic and data transformations.
- **Repository Layer (`@Repository`)**: Spring Data JPA abstraction for SQL operations.

### Design Patterns Used:
1. **Repository Pattern**: Provided by Spring Data JPA to isolate the domain layer from database details.
2. **DTO (Data Transfer Object) Pattern**: Separated `TaskRequest` and `TaskResponse` to decouple presentation entities from persistent JPA entities.
3. **Dependency Injection & IoC**: Used extensively via Spring Annotations to promote loose coupling and high testability.
4. **Builder / Static Factory Method**: For constructing responses clean and readably.

---

## 🗄️ Database Schema (ERD)

```mermaid
erDiagram
    USERS ||--o{ TASKS : "manages"
    USERS {
        BigInt id PK
        String username
    }
    TASKS {
        BigInt id PK
        String title
        String description
        String priority
        String status
        Date dueDate
        BigInt user_id FK
    }