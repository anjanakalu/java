# Frontend Interview Questions

## 1. HTML Questions
1. What is the difference between `<div>` and `<section>` tags?
2. How can you make a website accessible with semantic HTML?
3. What are data attributes in HTML, and how can they be used?
4. Explain the difference between inline, inline-block, and block elements.
5. What is the purpose of the `<!DOCTYPE>` declaration?
6. How do you handle SEO considerations with HTML structure?
7. What is the difference between the `<header>` and `<head>` elements?
8. How does the `<picture>` element work, and when should it be used?
9. What is the `<template>` tag, and how is it used?

### Scenario-Based Questions:
1. You need to build a blog page. How would you structure the HTML for the header, main content, and footer while ensuring semantic correctness and SEO optimization?
2. You are developing an e-commerce site. How would you use semantic HTML to create a product listing page that is accessible to screen readers?

---

## 2. CSS Questions
1. What is the difference between relative, absolute, fixed, and sticky positioning in CSS?
2. How do CSS Grid and Flexbox differ, and when would you use each?
3. What are pseudo-classes and pseudo-elements in CSS? Can you give examples?
4. How can you create a responsive layout using CSS?
5. Explain the concept of specificity in CSS. How does it impact styling?
6. What is the difference between `em`, `rem`, `px`, and `%` units?
7. How do media queries work, and can you provide an example?
8. What is the difference between `opacity` and `visibility`?
9. How do CSS variables (custom properties) work, and what are their benefits?
10. How can you implement dark mode using CSS?

### Scenario-Based Questions:
1. You are building a dashboard with several widgets. Some widgets need to have a fixed position while others scroll. How would you implement this layout using CSS?
2. A website needs to be optimized for mobile devices and desktop views. How would you implement a layout that adapts seamlessly to both screen sizes using Flexbox or CSS Grid?
3. A webpage has a slow loading time due to large images and unnecessary CSS files. How would you optimize the CSS and images to improve performance?

---

## 3. JavaScript Questions
1. What is the difference between `var`, `let`, and `const`?
2. Explain the concept of closures in JavaScript.
3. How does the `this` keyword work, and how is it determined?
4. What is the difference between synchronous and asynchronous code?
5. How do promises and `async/await` work?
6. Explain event delegation and provide an example.
7. What are some common ways to optimize JavaScript code for performance?
8. What is the difference between `==` and `===` in JavaScript?
9. How does the JavaScript engine perform garbage collection?
10. What is the Event Loop, and how does it work in JavaScript?

### Scenario-Based Questions:
1. You are building a live search feature. How would you handle API calls in a way that avoids making excessive requests when the user types quickly? 
2. A function is running into performance issues with large datasets. How would you optimize the code to improve its efficiency in terms of time complexity?
3. You're building a to-do list application, and the user wants to mark tasks as completed by clicking on them. How would you handle event delegation to ensure this works efficiently?

---

## 4. React Questions

### Core React
1. What is the difference between functional and class components?
2. How does the `useState` hook work?
3. What is the Virtual DOM, and how does it improve performance?
4. What is React's Context API, and when should you use it?
5. How does the `useEffect` hook work, and what are its common use cases?
6. What is the purpose of keys in React, and why are they important?
7. How does React handle rendering of components? (Reconciliation)
8. What are higher-order components (HOCs), and how are they used?
9. How do you handle error boundaries in React?
10. What is the difference between controlled and uncontrolled components?

### Advanced React
1. What are React portals, and when would you use them?
2. How does React handle reconciliation and updates?
3. What is the difference between `useMemo` and `useCallback`?
4. How can you optimize the performance of a React application?
5. What are render props, and how do they work?

### React Scenario-Based Questions:
1. You are working on a large React application, and the performance is degrading when rendering long lists of items. What optimizations can you make to improve the performance (e.g., virtual DOM, lazy loading, or memoization)?
2. The application requires a global state to be accessible throughout a deep component tree, and props drilling is becoming cumbersome. How would you implement a solution using React's Context API or Redux?
3. You need to build a form with dynamic inputs that users can add or remove. How would you handle this with controlled components in React?
4. A component’s state is changing frequently, but re-rendering is slow due to too many updates. How would you prevent unnecessary re-renders using hooks or memoization?

---

## 5. Redux Questions
1. What is Redux, and why would you use it in a React application?
2. What are the main concepts of Redux (store, actions, reducers)?
3. What is the difference between Redux and Context API?
4. How does middleware (e.g., Redux Thunk, Redux Saga) work in Redux?
5. What are pure functions, and why are they important in Redux reducers?
6. What is the purpose of the `connect` function in React-Redux?
7. How does Redux DevTools help with debugging?
8. What is the difference between synchronous and asynchronous actions in Redux?
9. What are some best practices for structuring a Redux application?
10. How does the `useSelector` and `useDispatch` hooks work in React-Redux?

### Scenario-Based Questions:
1. You need to manage the state for a complex form with multiple input fields and validation. How would you structure the Redux store and create the necessary actions to handle form data and validation errors?
2. You are building a React app with a list of items, and you need to implement pagination. How would you manage the state of the current page and items per page using Redux?

---

## 6. Framework-Specific Questions

### React
1. What are React portals, and when would you use them?
2. How does React handle reconciliation and updates?
3. What is the difference between `useMemo` and `useCallback`?
4. How can you optimize the performance of a React application?
5. What are render props, and how do they work?

### Angular
1. What is the difference between a service and a directive in Angular?
2. How does Angular's change detection mechanism work?
3. What are Angular modules, and why are they important?

### Vue
1. What is the difference between Vue 2 and Vue 3?
2. How do you manage state in Vue using Vuex or Pinia?

### Scenario-Based Questions:
1. In Angular, you need to create a service that fetches data from an API and is used in multiple components. How would you create and use this service efficiently across your application?
2. In Vue, you are working on a single-page application (SPA) that requires state management for user authentication. How would you manage authentication state using Vuex or Pinia?

---

## 7. DOM Manipulation and Browser APIs
1. What is the difference between `document.querySelector()` and `document.getElementById()`?
2. How do you add, remove, or toggle classes on an HTML element with JavaScript?
3. What is the Shadow DOM, and how is it used?
4. Explain the concept of the event loop in JavaScript.
5. How do you use the Fetch API to make HTTP requests?
6. What are Intersection Observers, and how can they be used?
7. How can you handle cross-origin requests using CORS?

### Scenario-Based Questions:
1. You need to build a "back to top" button that appears when the user scrolls down the page. How would you implement this using JavaScript and DOM manipulation?
2. You're building a custom dropdown component, and it needs to be accessible. How would you implement it with JavaScript and manage its open/close state?

---

## 8. Web Performance Optimization
1. How do you minimize render-blocking resources?
2. What is lazy loading, and how can it be implemented?
3. How do you optimize images for the web?
4. What are some strategies for reducing the size of CSS and JavaScript bundles?
5. How does a Content Delivery Network (CDN) improve website performance?
6. What is the purpose of code splitting, and how can you implement it?
7. How does browser caching work, and how can you optimize it?

### Scenario-Based Questions:
1. The page loads slowly due to large CSS and JS files. How would you implement lazy loading and code splitting to improve the load time of the page?
2. You have a responsive image-heavy website. How would you optimize the images for fast loading and better performance across devices?

---

## 9. Testing and Debugging
1. How do you debug JavaScript code in the browser?
2. What is the purpose of unit testing in frontend development?
3. What is the difference between Jest and Mocha for JavaScript testing?
4. How do you test for accessibility in your application?
5. What are end-to-end (E2E) tests, and how are they different from unit tests?
6. What tools can you use to test React components?
7. How do you handle errors during testing?

### Scenario-Based Questions:
1. You need to test a form component that handles validation and submission. How would you write unit tests to verify that the form behaves correctly?
2. You have a large-scale application with complex UI interactions. How would you ensure that the user interface is thoroughly tested for edge cases and that the tests are scalable?
