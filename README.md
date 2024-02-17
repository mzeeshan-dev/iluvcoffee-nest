NEST JS Concepts
================
- Decorators
- Controllers
- Services
  - Each service is a provider(cen inject depedecies); that is, it can be injected into other components.
  - So providers are just a class with the @Injectable() decorator.
- Dependency Injection
  - To inject a provider, we can simply use the constructor of the class.

- Errors
  - HTTP Exceptions
  - Custom Exceptions
  - Specific Lirary Response Objects
  - Interceptors
- Pipes
- Validation
  - ValidationPipe
  - ParseIntPipe
  - ParseBoolPipe
  - ParseArrayPipe
  - ParseUUIDPipe
- Repository Pattern - TypeORM
  - Acts as an  abstraction over the data source; a layer that sits between the application and the database.
  - It exposes methods for performing CRUD operations without exposing the underlying database.
  
- Active Record Pattern - Sequelize (Modal Classes)
  

Pipes have two typical use cases:

Validation: Validate input data to check if the data is in the correct format and meets certain conditions. If the data is invalid, the pipe can throw an exception.

Transformation: Transform input data to a desired form. For example, you might want to automatically convert a string to a number, or a flat object into a class instance.

Pipes can be used at several levels in a NestJS application:

Method-scoped pipe: A pipe can be used on a specific route handler with the @UsePipes() decorator.

Controller-scoped pipe: A pipe can be used on a controller, affecting all routes within the controller.

Global-scoped pipe: A pipe can be used application-wide in the main file where the application is bootstrapped.