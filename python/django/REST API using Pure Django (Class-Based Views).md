
# 🧾 REST API using Pure Django (Class-Based Views)

These notes explain how to build a simple REST API in Django **without Django REST Framework**, using **Class-Based Views (CBVs)**. Perfect for beginners to understand Django's built-in capabilities.

---

## 📌 What is a REST API?

**REST (Representational State Transfer)** is an architecture used for building web services.
A **REST API** allows frontend or client apps to interact with backend data using standard HTTP methods:

* `GET` → Retrieve data
* `POST` → Create data
* `PUT` → Update data
* `DELETE` → Delete data

---

## 📘 What are Class-Based Views (CBVs) in Django?

Class-Based Views are views written as **Python classes** instead of functions. Each HTTP method (GET, POST, etc.) is handled using a method inside the class.

🔹 **Advantages over Function-Based Views (FBVs):**

* Cleaner, DRY code
* Easy to reuse and extend using inheritance
* Handles multiple HTTP methods inside one class

---

## 🧑‍💻 Step-by-Step: Create REST API with CBVs

---

### ✅ Step 1: Organize Your Views

📁 Inside your Django app (e.g., `my_app`), create a folder named `views/` and add:

#### 📄 `my_app/views/__init__.py`

```python
# This allows you to import views easily from the package
from my_app.views.fn_based_views import *
from my_app.views.class_based_views import *
```

---

### ✅ Step 2: Create Class-Based View

#### 📄 `my_app/views/class_based_views.py`

```python
from django.views import View
from django.http import JsonResponse

class BlogsView(View):
    # *args and **kwargs are used to accept any number of positional and keyword arguments
    # They are often used in views to catch route or context-related data passed through URLs

    def get(self, request, *args, **kwargs):
        # Handles GET requests — for fetching blogs
        return JsonResponse({
            'success': True,
            'message': 'Class based view: API to get blogs'
        })

    def post(self, request, *args, **kwargs):
        # Handles POST requests — for creating a new blog
        return JsonResponse({
            'success': True,
            'message': 'Class based view: API to create a blog'
        })

    def put(self, request, *args, **kwargs):
        # Handles PUT requests — for updating an existing blog
        return JsonResponse({
            'success': True,
            'message': 'Class based view: API to update a blog'
        })

    def delete(self, request, *args, **kwargs):
        # Handles DELETE requests — for deleting a blog
        return JsonResponse({
            'success': True,
            'message': 'Class based view: API to delete a blog'
        })
```

---

### ✅ Step 3: Register URLs

#### 📄 `pure_dj_apis/urls.py` (or your project’s main `urls.py`)

```python
from django.contrib import admin
from django.urls import path

from my_app.views.fn_based_views import get_blogs, create_blog, update_blog
from my_app.views.class_based_views import BlogsView

urlpatterns = [
    path('admin/', admin.site.urls),

    # Function-Based View URLs (require separate routes for each action)
    path('fn/blogs', get_blogs),
    path('blogs/create', create_blog),
    path('blogs/update', update_blog),

    # Class-Based View: single URL handles GET, POST, PUT, DELETE
    path('blogs', BlogsView.as_view()),  # as_view() turns the class into a view function
]
```

---

## ❓ Why No Separate URLs Needed in CBVs?

Unlike function-based views (FBVs), **CBVs can handle multiple HTTP methods inside one class**.
By using `.as_view()`, Django automatically routes incoming requests based on the HTTP method (`GET`, `POST`, `PUT`, `DELETE`) to the matching method in the class.

🔁 So you can use a **single URL** like `/blogs` for all operations, making routing much cleaner.

---

## ❓ What is `*args`, `**kwargs`?

These are special Python syntax to handle **variable arguments**:

| Symbol     | Purpose                                |
| ---------- | -------------------------------------- |
| `*args`    | Accepts extra **positional** arguments |
| `**kwargs` | Accepts extra **keyword** arguments    |

🔹 In Django views, they are used to **capture any parameters** passed from the URL or other middleware, even if not directly used.

---

## 🧪 Step 4: Test with Postman

| Method | URL                           | Action            |
| ------ | ----------------------------- | ----------------- |
| GET    | `http://localhost:8000/blogs` | Get list of blogs |
| POST   | `http://localhost:8000/blogs` | Create a new blog |
| PUT    | `http://localhost:8000/blogs` | Update a blog     |
| DELETE | `http://localhost:8000/blogs` | Delete a blog     |

> ⚠️ PUT/DELETE requests **can’t be sent via browser forms**, so use tools like **Postman** or JavaScript/AJAX to test them.

---

## 📘 Definitions Recap

| Term                | Meaning                                         |
| ------------------- | ----------------------------------------------- |
| `View`              | Django base class for class-based views         |
| `JsonResponse`      | Django response that returns JSON data          |
| `as_view()`         | Class method that converts CBV to view function |
| `request`           | The incoming HTTP request                       |
| `*args`, `**kwargs` | Catch-all for extra arguments                   |
| `Postman`           | API testing tool for sending requests           |

---

## ✅ Tips for Beginners

* ✅ Use `.as_view()` when adding CBVs to `urls.py`
* 🧪 Use **Postman** or **Curl** for PUT/DELETE testing
* 🚫 Django doesn’t allow PUT/DELETE directly via HTML forms
* 🧱 For full API power (like serializers, authentication), learn **Django REST Framework** later

---
