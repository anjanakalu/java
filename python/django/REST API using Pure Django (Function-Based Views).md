# 📘 REST API using Pure Django (Function-Based Views)
```
python manage.py runserver # Run and test
```

## ✅ What is a REST API?

A **REST API (Representational State Transfer API)** is a way to allow communication between a client and a server over HTTP using standard methods like:

* `GET` → retrieve data
* `POST` → create data
* `PUT` → update data
* `DELETE` → delete data

---

## 🧠 Key Concepts in Django REST API

| Term                          | Description                                                             |
| ----------------------------- | ----------------------------------------------------------------------- |
| **View**                      | A function (or class) that handles the logic when a user visits a URL.  |
| **Function-Based View (FBV)** | A Django view written as a regular Python function.                     |
| **JsonResponse**              | A special response object from Django that returns data in JSON format. |
| **URLconf**                   | A configuration that maps URLs to views.                                |
| **Postman**                   | A tool to test APIs by sending HTTP requests.                           |

---

## 📂 Step-by-Step Guide to Create REST API Using FBV in Django

---

### 🧱 Step 1: Create a `views/` Folder

Structure your app better by separating views:

```bash
my_app/
├── views/
│   ├── __init__.py
│   └── fn_based_views.py
```

---

### 📝 Step 1.1: Define `__init__.py`

This allows Django to treat the `views/` folder as a Python package.

**`my_app/views/__init__.py`**

```python
from my_app.views.fn_based_views import *
from my_app.views.class_based_views import *  # optional
```

---

### ✍️ Step 2: Create Function-Based Views

**`my_app/views/fn_based_views.py`**

```python
from django.http import JsonResponse

# GET: Retrieve blogs
def get_blogs(request):
    res = {
        'success': True,
        'message': 'Function based view: api to get blogs'
    }
    return JsonResponse(res)

# POST: Create a new blog
def create_blog(request):
    if request.method == 'POST':
        res = {
            'success': True,
            'message': 'Function based view: api to create a blog'
        }
    else: 
        res = {
            'success': False,
            'message': 'Function based view: Invalid request'
        }
    return JsonResponse(res)

# PUT: Update an existing blog
def update_blog(request):
    if request.method == 'PUT':
        res = {
            'success': True,
            'message': 'Function based view: api to update a blog'
        }
    else: 
        res = {
            'success': False,
            'message': 'Function based view: Invalid request'
        }
    return JsonResponse(res)
```

> ✅ **Note:** By default, Django does not handle PUT requests unless you explicitly configure middleware or check `request.body`.

---

### 🌐 Step 3: Register Views in `urls.py`

**`project/urls.py`**

```python
from django.contrib import admin
from django.urls import path
from my_app.views.fn_based_views import get_blogs, create_blog, update_blog

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blogs', get_blogs),               # GET
    path('blogs/create', create_blog),      # POST
    path('blogs/update', update_blog),      # PUT
]
```
**`project/urls.py` with CSRF Exemption**
```python
from django.contrib import admin
from django.urls import path
from django.views.decorators.csrf import csrf_exempt  # Import the decorator
from my_app.views.fn_based_views import get_blogs, create_blog, update_blog

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blogs/', get_blogs),  # GET doesn't typically need CSRF exemption
    path('blogs/create/', csrf_exempt(create_blog)),  # Exempt POST
    path('blogs/update/', csrf_exempt(update_blog)),  # Exempt PUT
]
```

---

## 🧪 Step 4: Test API in Postman

Open [Postman](https://www.postman.com/) and test:

| Endpoint        | Method | Description        |
| --------------- | ------ | ------------------ |
| `/blogs`        | GET    | Retrieve blog list |
| `/blogs/create` | POST   | Create a blog      |
| `/blogs/update` | PUT    | Update a blog      |

---

## ⚠️ Important Rules and Tips

1. **Use proper HTTP methods** (`GET`, `POST`, `PUT`) for correct RESTful behavior.
2. **Always return `JsonResponse`** for APIs, not regular `HttpResponse`.
3. **Django doesn’t support PUT/DELETE directly in forms**, use tools like Postman or JavaScript frontend clients.
4. Make sure to add CSRF exemptions or use API-friendly middleware (for production).
---

### Best Practices for FBVs:
1. Always validate request method
2. Return appropriate HTTP status codes
3. Keep business logic separate (use services layer)
4. Use decorators for common functionality:
   - `@require_http_methods(["GET", "POST"])`
   - `@csrf_exempt` (for APIs not using CSRF tokens)
  
---
### Best Practice Structure (CSRF):
# For API-only apps, consider exempting all API paths:
```python
# For API-only apps, consider exempting all API paths:
API_PATHS = [
    path('create/', csrf_exempt(create_blog)),
    path('update/<int:id>/', csrf_exempt(update_blog)),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(API_PATHS)),  # All API paths prefixed with /api/
]
```
---
