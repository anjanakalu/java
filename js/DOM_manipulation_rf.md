### **1) DOM Manipulation Questions and Answers**

---

#### **Q1: Prevents the default action of an event. What does it do?**
**A1:**  
The `event.preventDefault()` method prevents the default behaviour associated with an event from occurring. For example, it can prevent a form from submitting, a link from navigating to a new page, or a context menu from appearing.

```javascript
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from submitting
});
```
Some default behaviours like: 
* When submit is clicked on Form (submit), Form data is sent to the server, and the **page reloads**.
* When any button is clicked on Form, it will Submit or reset the form.
---

#### **Q2: Stops the propagation of an event. How does it work?**
**A2:**  
The `event.stopPropagation()` method stops the event from bubbling up through the DOM tree, preventing any parent handlers from being notified of the event.

```javascript
element.addEventListener('click', function(event) {
    event.stopPropagation(); // Stops the event from propagating to parent elements
});
```

---

#### **Q3: How to select all elements with a specific class or tag?**
**A3:**  
You can use `document.getElementsByClassName()` or `document.getElementsByTagName()` to select all elements with a specific class or tag. Alternatively, you can use `document.querySelectorAll()` for more flexibility.

```javascript
// Select all elements with class 'myClass'
const elementsByClass = document.getElementsByClassName('myClass');

// Select all <div> elements
const divElements = document.getElementsByTagName('div');

// Using querySelectorAll (more flexible)
const elements = document.querySelectorAll('.myClass');
```

---

#### **Q4: What is the difference between `querySelector` and `querySelectorAll`?**
**A4:**  
- **`querySelector(selector)`**: Returns the **first element** that matches the specified CSS selector.
  ```javascript
  const firstElement = document.querySelector('.myClass');
  ```
  
- **`querySelectorAll(selector)`**: Returns a **NodeList** of all elements that match the specified CSS selector.
  ```javascript
  const allElements = document.querySelectorAll('.myClass');
  ```

---

#### **Q5: How to add and remove event handlers?**
**A5:**  
To add an event handler, use `addEventListener()`. To remove an event handler, use `removeEventListener()`.

```javascript
function handleClick() {
    alert('Button clicked!');
}

// Add event listener
button.addEventListener('click', handleClick);

// Remove event listener
button.removeEventListener('click', handleClick);
```

---

#### **Q6: How to get or set the title of the document?**
**A6:**  
You can get or set the title of the document using the `document.title` property.

```javascript
// Get the current title
const currentTitle = document.title;

// Set a new title
document.title = 'New Page Title';
```

---

#### **Q7: How to remove an element from the DOM?**
**A7:**  
You can remove an element using the `removeChild()` method or the `remove()` method.

```javascript
// Using removeChild()
const parent = document.getElementById('parent');
const child = document.getElementById('child');
parent.removeChild(child);

// Using remove() (modern approach)
const element = document.getElementById('element');
element.remove();
```
#### **Q8: Default behaviour/ action of event?** Solution: `event.stopPropagation()`
---
| **Event Category**        | **Default Behavior**                                                       |
|---------------------------|-----------------------------------------------------------------------------|
| **Form Events**            |                                                                             |
| Submit Form                | Form data is sent to the server, and the page reloads.                      |
| Button Click               | Submit or reset the form.                                                  |
| Input Focus                | Cursor appears inside the field.                                           |
| Checkbox/Radio Button      | Toggling the checked state.                                                |
| **Link (<a>) Events**      |                                                                             |
| Click                      | Navigates to the URL in `href`.                                            |
| Anchor                     | Scrolls to the element with the matching `id`.                              |
| **Mouse Events**           |                                                                             |
| Click                      | Triggers click action on the element.                                       |
| Double-click               | Selects text or opens files.                                               |
| Right-click                | Opens the context menu.                                                    |
| Drag                       | Enables dragging elements across the page.                                  |
| Drop                       | Inserts dragged element in the drop location.                               |
| **Keyboard Events**        |                                                                             |
| Enter Key                  | Submits a form or activates a button.                                       |
| Tab Key                    | Moves focus to the next element.                                           |
| Arrow Keys                 | Scrolls the page or moves focus.                                           |
| Spacebar                   | Scrolls the page or toggles buttons.                                       |
| **Context Menu**           |                                                                             |
| Right-click                | Opens the browser's context menu.                                           |
| **Scroll Events**          |                                                                             |
| Page Scrolling             | Moves page content vertically or horizontally.                             |
| **Media Events**           |                                                                             |
| Play Video/Audio           | Starts playing the media.                                                  |
| Pause Video/Audio          | Pauses the media.                                                          |
| Volume Change              | Changes the media volume.                                                  |
| **File Input Events**      |                                                                             |
| File Selection             | Files are added to the input field.                                         |
| **Form Reset**             |                                                                             |
| Form Reset                 | Resets all form fields to their default values.                             |
| **Focus and Blur**         |                                                                             |
| Focus                      | Places the cursor inside an input field.                                   |
| Blur                       | Commits changes when focus is lost.                                        |
| **Image Loading**          |                                                                             |
| Image Load                 | Displays the image when it’s fully loaded.                                  |
| **Drag and Drop Events**   |                                                                             |
| Drag                       | Starts dragging an element.                                                |
| Drop                       | Drops a dragged element at the specified location.                          |


### **2) DOM Manipulation Cheatsheet**

---

### **Selecting Elements**

- **`document.getElementById(id)`**  
  Selects an element by its `id`.
  ```javascript
  const element = document.getElementById('myId');
  ```

- **`document.querySelector(selector)`**  
  Selects the first element that matches the CSS selector.
  ```javascript
  const element = document.querySelector('.myClass');
  ```

- **`document.querySelectorAll(selector)`**  
  Returns a NodeList of all elements matching the CSS selector.
  ```javascript
  const elements = document.querySelectorAll('.myClass');
  ```

- **`document.getElementsByClassName(class)`**  
  Returns a collection of elements with the specified class name.
  ```javascript
  const elements = document.getElementsByClassName('myClass');
  ```

- **`document.getElementsByTagName(tag)`**  
  Returns a collection of elements with the specified tag name.
  ```javascript
  const elements = document.getElementsByTagName('div');
  ```

---

### **Creating and Adding Elements**

- **`document.createElement(tagName)`**  
  Creates a new element with the specified tag name.
  ```javascript
  const newElement = document.createElement('div');
  ```

- **`element.appendChild(child)`**  
  Adds a child element to the parent.
  ```javascript
  const parent = document.getElementById('parent');
  parent.appendChild(newElement);
  ```

- **`element.append(...nodesOrDOMStrings)`**  
  Appends multiple nodes or strings to the parent.
  ```javascript
  parent.append(newElement, 'Some text');
  ```

- **`element.prepend(...nodesOrDOMStrings)`**  
  Prepends multiple nodes or strings to the parent.
  ```javascript
  parent.prepend(newElement, 'Some text');
  ```

---

### **Modifying Elements**

#### **Changing Content**
- **`element.innerHTML`**  
  Gets or sets the HTML content inside an element.
  ```javascript
  element.innerHTML = '<p>New content</p>';
  ```

- **`element.textContent`**  
  Gets or sets the text content of an element.
  ```javascript
  element.textContent = 'New text';
  ```

#### **Changing Attributes**
- **`element.setAttribute(name, value)`**  
  Sets the value of an attribute on the specified element.
  ```javascript
  element.setAttribute('class', 'newClass');
  ```

- **`element.getAttribute(name)`**  
  Returns the value of a specified attribute.
  ```javascript
  const className = element.getAttribute('class');
  ```

- **`element.removeAttribute(name)`**  
  Removes the specified attribute from an element.
  ```javascript
  element.removeAttribute('class');
  ```

#### **Changing Classes**
- **`element.classList.add(className)`**  
  Adds a class to the element.
  ```javascript
  element.classList.add('active');
  ```

- **`element.classList.remove(className)`**  
  Removes a class from the element.
  ```javascript
  element.classList.remove('active');
  ```

- **`element.classList.toggle(className)`**  
  Toggles a class (adds if not present, removes if present).
  ```javascript
  element.classList.toggle('active');
  ```

---

### **Removing Elements**

- **`element.removeChild(child)`**  
  Removes a child element from the parent.
  ```javascript
  const parent = document.getElementById('parent');
  parent.removeChild(childElement);
  ```

- **`element.remove()`**  
  Removes the element itself from the DOM.
  ```javascript
  element.remove();
  ```

---

### **Traversing the DOM**

- **`element.parentNode`**  
  Returns the parent node of the element.
  ```javascript
  const parent = element.parentNode;
  ```

- **`element.children`**  
  Returns a collection of child elements.
  ```javascript
  const children = element.children;
  ```

- **`element.nextElementSibling`**  
  Returns the next sibling element.
  ```javascript
  const nextSibling = element.nextElementSibling;
  ```

- **`element.previousElementSibling`**  
  Returns the previous sibling element.
  ```javascript
  const prevSibling = element.previousElementSibling;
  ```

- **`element.firstElementChild`**  
  Returns the first child element.
  ```javascript
  const firstChild = element.firstElementChild;
  ```

- **`element.lastElementChild`**  
  Returns the last child element.
  ```javascript
  const lastChild = element.lastElementChild;
  ```

---

### **Styling Elements**

- **`element.style.property`**  
  Sets or gets inline styles.
  ```javascript
  element.style.color = 'red';
  element.style.backgroundColor = 'blue';
  ```

- **`window.getComputedStyle(element)`**  
  Returns the computed style of an element.
  ```javascript
  const style = window.getComputedStyle(element);
  console.log(style.color);
  ```

---

### **Event Handling**

- **`element.addEventListener(event, callback)`**  
  Adds an event listener to an element.
  ```javascript
  element.addEventListener('click', function() {
      alert('Clicked!');
  });
  ```

- **`element.removeEventListener(event, callback)`**  
  Removes an event listener from an element.
  ```javascript
  function handleClick() {
      alert('Clicked!');
  }
  element.addEventListener('click', handleClick);
  element.removeEventListener('click', handleClick);
  ```

- **`event.preventDefault()`**  
  Prevents the default action of an event.
  ```javascript
  form.addEventListener('submit', function(event) {
      event.preventDefault();
  });
  ```

- **`event.stopPropagation()`**  
  Stops the propagation of an event.
  ```javascript
  element.addEventListener('click', function(event) {
      event.stopPropagation();
  });
  ```

---

### **Working with Forms**

- **`form.elements`**  
  Accesses all form elements.
  ```javascript
  const form = document.querySelector('form');
  const inputs = form.elements;
  ```

- **`input.value`**  
  Gets or sets the value of an input field.
  ```javascript
  const inputValue = input.value;
  input.value = 'New Value';
  ```

- **`checkbox.checked`**  
  Gets or sets whether a checkbox is checked.
  ```javascript
  const isChecked = checkbox.checked;
  checkbox.checked = true;
  ```

---

### **Miscellaneous**

- **`document.documentElement`**  
  Returns the root `<html>` element.
  ```javascript
  const htmlElement = document.documentElement;
  ```

- **`document.body`**  
  Returns the `<body>` element.
  ```javascript
  const body = document.body;
  ```

- **`document.head`**  
  Returns the `<head>` element.
  ```javascript
  const head = document.head;
  ```

- **`document.title`**  
  Gets or sets the title of the document.
  ```javascript
  document.title = 'New Title';
  ```

---
