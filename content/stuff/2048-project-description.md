---
title: 2048 project description
---
### Description
This is an implementation of the classic game 2048 that I made from scratch in Kotlin Android. It lets you seamlessly pick up where you left off. The game boasts smooth animations, allowing you to fully immerse yourself in it. It lets you track your current progress with a current score and a high score. And for those strategic missteps, the undo option has you covered.

### What I learned
I did this project to get my hands dirty in native Android development. While creating this project, I learned:

1. MVVM architecture: This is one of the most widely used architectures in mobile development. Its main aim is to separate concerns of the application into different components which in turn helps in keeping the code clean and maintainable.

2. Concurrency primitive: Coroutines can be thought of as lightweight threads used to safely achieve asynchronous execution of code

3. State management primitives: I used Live data and flows for managing and observing the changing state of my application.

4. Local Persistence: Proto Datastore is a type-safe alternative to datastore, used for local persistence in the app.

5. RecyclerView: It is an optimized list/grid user interface element. This is the heart of my application, this facilitated moves and animations.

6. Dependency Injection: Used hilt for injection of dependencies. Using it made the management of dependencies more manageable and clean.