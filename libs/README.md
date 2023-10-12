# Components in layers

## Domain

- Entities: Represent core business objects, such as User, Product, Order, etc.
- Value Objects: Immutable objects that have no distinct identity but represent a specific attribute or value within an entity.
- Aggregates: Logical groupings of related entities and value objects.
- Repositories: Interfaces defining the contract for data access operations specific to your domain entities.
- Domain Services: Classes responsible for encapsulating domain-specific logic that doesn't naturally belong to an entity or value object.
- Domain Events: Events that capture state changes within the domain.

## Application

- Use Cases: Application services or use case classes that implement specific business processes.
- DTOs (Data Transfer Objects): Objects used for transferring data between the application layer and the interface layer.
- Application Exceptions: Custom exceptions specific to your application logic.
- Authorization and Authentication Logic: Code responsible for user authentication and authorization.
- Business Logic: Additional application-specific business logic that doesn't belong in the domain layer.

## Infrastructure

- Database Access: Code for connecting to and interacting with databases (e.g., using an ORM like TypeORM).
- External Service Clients: Code for making calls to external services (e.g., REST APIs, GraphQL services).
- Message Brokers: Code for interacting with message brokers (e.g., RabbitMQ, Kafka) if your microservice uses messaging.
- Caching: Code for implementing caching mechanisms if needed.
- Logging: Logging configuration and setup.
- Configuration: Reading and managing configuration settings.

## Presentation

- Controllers: Responsible for handling incoming HTTP requests and defining API endpoints.
- Request and Response Models: DTOs that define the shape of data sent and received over API endpoints.
- GraphQL Resolvers: If you're using GraphQL, these handle GraphQL query and mutation resolution.
- WebSocket Handlers: Code for handling WebSocket connections and events.
- Middleware: Custom middleware for handling cross-cutting concerns like authentication, logging, etc.
- Interceptors: Custom interceptors for manipulating incoming and outgoing data or requests/responses.
- Error Handling: Code for handling and customizing error responses.
- API Documentation: If applicable, documentation for your API using tools like Swagger or GraphQL documentation generators.

# Dependency between layers

```
Client -> Presentation Layer <-- Application Layer <-- Domain Layer
                 |                    ^
                 v                    |
                  Infrastructure Layer
```

- The "Presentation Layer" interacts with the "Application Layer" to serve external clients.
- The "Application Layer" relies on the "Domain Layer" for core business logic and the "Infrastructure Layer" for external resources.
- The "Infrastructure Layer" provides access to external resources and may interact with the "Application Layer."
