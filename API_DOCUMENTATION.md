# E-Commerce REST API Documentation

- **Base URL**: `http://localhost:3000/api/v1`
- **Default Port**: `3000`
- **Authentication**: JWT Bearer Token (`Authorization: Bearer <token>`)

---

## Standard Response Format

### Success Response (`200 OK` / `201 Created`)
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {},
  "error": {}
}
```

### Error Response (`400`, `401`, `403`, `404`, `500`)
```json
{
  "success": false,
  "message": "Detailed error message",
  "data": {},
  "error": {}
}
```

---

## 1. Authentication APIs

### 1.1 Register User
- **Method**: `POST`
- **Endpoint**: `/auth/register`
- **Auth Required**: No

**Request Body**:
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

**Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "error": {}
}
```

---

### 1.2 User Login
- **Method**: `POST`
- **Endpoint**: `/auth/login`
- **Auth Required**: No

**Request Body**:
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "Jane Doe",
      "email": "jane@example.com",
      "role": "customer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "error": {}
}
```

---

### 1.3 Get Current User Profile
- **Method**: `GET`
- **Endpoint**: `/auth/me`
- **Auth Required**: Yes (`Bearer <token>`)

**Headers**:
```
Authorization: Bearer <token>
```

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "jane@example.com",
    "role": "customer"
  },
  "error": {}
}
```

---

## 2. Category APIs

### 2.1 Create Category
- **Method**: `POST`
- **Endpoint**: `/categories`
- **Auth Required**: No

**Request Body**:
```json
{
  "name": "Electronics",
  "description": "Gadgets, smartphones, and accessories"
}
```

**Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Category created successfully",
  "data": {
    "id": 1,
    "name": "Electronics",
    "description": "Gadgets, smartphones, and accessories",
    "createdAt": "2026-10-25T11:00:00.000Z",
    "updatedAt": "2026-10-25T11:00:00.000Z"
  },
  "error": {}
}
```

---

### 2.2 List All Categories
- **Method**: `GET`
- **Endpoint**: `/categories`
- **Auth Required**: No

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Categories fetched successfully",
  "data": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Gadgets, smartphones, and accessories"
    }
  ],
  "error": {}
}
```

---

## 3. Product APIs

### 3.1 Create Product
- **Method**: `POST`
- **Endpoint**: `/products`
- **Auth Required**: No

**Request Body**:
```json
{
  "name": "Noise Cancelling Headphones",
  "description": "Over-ear wireless headphones with ANC",
  "price": 149.99,
  "stock": 25,
  "categoryId": 1,
  "imageUrl": "https://example.com/images/headphones.jpg"
}
```

**Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Noise Cancelling Headphones",
    "description": "Over-ear wireless headphones with ANC",
    "price": 149.99,
    "stock": 25,
    "categoryId": 1,
    "imageUrl": "https://example.com/images/headphones.jpg"
  },
  "error": {}
}
```

---

### 3.2 List Products (Pagination, Search, Category Filter)
- **Method**: `GET`
- **Endpoint**: `/products`
- **Auth Required**: No

**Query Parameters**:
| Parameter | Type | Default | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| `page` | Integer | `1` | Page number | `?page=1` |
| `limit` | Integer | `10` | Products per page | `?limit=10` |
| `search` | String | *None* | Search in name or description | `?search=headphones` |
| `categoryId`| Integer | *None* | Filter by category ID | `?categoryId=1` |
| `sortBy` | String | `createdAt`| Column to sort (`price`, `name`, `createdAt`) | `?sortBy=price` |
| `order` | String | `DESC` | Sort direction (`ASC` or `DESC`) | `?order=ASC` |

**Example URL**:
```
GET /api/v1/products?page=1&limit=10&search=headphones&categoryId=1&sortBy=price&order=ASC
```

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": {
    "totalProducts": 1,
    "totalPages": 1,
    "currentPage": 1,
    "products": [
      {
        "id": 1,
        "name": "Noise Cancelling Headphones",
        "description": "Over-ear wireless headphones with ANC",
        "price": "149.99",
        "stock": 25,
        "imageUrl": "https://example.com/images/headphones.jpg",
        "categoryId": 1,
        "category": {
          "id": 1,
          "name": "Electronics"
        }
      }
    ]
  },
  "error": {}
}
```

---

### 3.3 Get Single Product Details
- **Method**: `GET`
- **Endpoint**: `/products/:id`
- **Auth Required**: No

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Product details fetched successfully",
  "data": {
    "id": 1,
    "name": "Noise Cancelling Headphones",
    "description": "Over-ear wireless headphones with ANC",
    "price": "149.99",
    "stock": 25,
    "imageUrl": "https://example.com/images/headphones.jpg",
    "categoryId": 1,
    "category": {
      "id": 1,
      "name": "Electronics",
      "description": "Gadgets, smartphones, and accessories"
    },
    "reviews": [
      {
        "id": 1,
        "rating": 5,
        "comment": "Amazing sound and battery life!",
        "createdAt": "2026-10-25T11:15:00.000Z",
        "user": {
          "id": 1,
          "name": "Jane Doe"
        }
      }
    ]
  },
  "error": {}
}
```

---

## 4. Shopping Cart APIs

*(All Cart endpoints require `Authorization: Bearer <token>`)*

### 4.1 View Cart & Total Price
- **Method**: `GET`
- **Endpoint**: `/cart`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Cart fetched successfully",
  "data": {
    "items": [
      {
        "id": 1,
        "productId": 1,
        "productName": "Noise Cancelling Headphones",
        "price": 149.99,
        "imageUrl": "https://example.com/images/headphones.jpg",
        "stock": 25,
        "quantity": 2,
        "itemTotal": 299.98
      }
    ],
    "totalItems": 2,
    "totalPrice": 299.98
  },
  "error": {}
}
```

---

### 4.2 Add Product to Cart
- **Method**: `POST`
- **Endpoint**: `/cart`

**Request Body**:
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Item added to cart successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "quantity": 2
  },
  "error": {}
}
```

---

### 4.3 Update Cart Item Quantity
- **Method**: `PUT`
- **Endpoint**: `/cart/:id`

**Request Body**:
```json
{
  "quantity": 3
}
```

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Cart item updated successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "quantity": 3
  },
  "error": {}
}
```

---

### 4.4 Remove Item from Cart
- **Method**: `DELETE`
- **Endpoint**: `/cart/:id`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Item removed from cart successfully",
  "data": {},
  "error": {}
}
```

---

### 4.5 Clear Entire Cart
- **Method**: `DELETE`
- **Endpoint**: `/cart`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Cart cleared successfully",
  "data": {},
  "error": {}
}
```

---

## 5. Checkout & Order APIs

*(All Order endpoints require `Authorization: Bearer <token>`)*

### 5.1 Checkout (Process Cart to Order)
- **Method**: `POST`
- **Endpoint**: `/orders/checkout`
- **Features**: Checks stock, snapshots prices, creates Order and OrderItems, decrements product stock, and clears the cart inside an atomic MySQL transaction.

**Request Body**:
```json
{
  "shippingAddress": "456 Broadway, New York, NY 10013",
  "paymentMethod": "stripe",
  "paymentId": "pi_3MtwxPEgAwZy5i4L0Txyz"
}
```
*(Note: If `paymentId` is omitted, a mock ID like `MOCK_STRIPE_<timestamp>` is auto-generated).*

**Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "totalAmount": "299.98",
    "paymentStatus": "paid",
    "paymentId": "pi_3MtwxPEgAwZy5i4L0Txyz",
    "shippingAddress": "456 Broadway, New York, NY 10013",
    "createdAt": "2026-10-25T11:20:00.000Z",
    "items": [
      {
        "id": 1,
        "orderId": 1,
        "productId": 1,
        "quantity": 2,
        "price": "149.99",
        "product": {
          "id": 1,
          "name": "Noise Cancelling Headphones",
          "imageUrl": "https://example.com/images/headphones.jpg"
        }
      }
    ]
  },
  "error": {}
}
```

---

### 5.2 Get User Order History
- **Method**: `GET`
- **Endpoint**: `/orders`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Orders fetched successfully",
  "data": [
    {
      "id": 1,
      "totalAmount": "299.98",
      "paymentStatus": "paid",
      "paymentId": "pi_3MtwxPEgAwZy5i4L0Txyz",
      "shippingAddress": "456 Broadway, New York, NY 10013",
      "createdAt": "2026-10-25T11:20:00.000Z",
      "items": [
        {
          "id": 1,
          "productId": 1,
          "quantity": 2,
          "price": "149.99"
        }
      ]
    }
  ],
  "error": {}
}
```

---

### 5.3 Get Order Details by ID
- **Method**: `GET`
- **Endpoint**: `/orders/:id`

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Order details fetched successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "totalAmount": "299.98",
    "paymentStatus": "paid",
    "paymentId": "pi_3MtwxPEgAwZy5i4L0Txyz",
    "shippingAddress": "456 Broadway, New York, NY 10013",
    "createdAt": "2026-10-25T11:20:00.000Z",
    "items": [
      {
        "id": 1,
        "orderId": 1,
        "productId": 1,
        "quantity": 2,
        "price": "149.99",
        "product": {
          "id": 1,
          "name": "Noise Cancelling Headphones",
          "imageUrl": "https://example.com/images/headphones.jpg"
        }
      }
    ]
  },
  "error": {}
}
```

---

## 6. Review & Rating APIs

### 6.1 Add or Update Review for Product
- **Method**: `POST`
- **Endpoint**: `/products/:productId/reviews`
- **Auth Required**: Yes (`Bearer <token>`)

**Request Body**:
```json
{
  "rating": 5,
  "comment": "Exceptional sound isolation and comfortable ear cushions!"
}
```

**Response (`201 Created`)**:
```json
{
  "success": true,
  "message": "Review added successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "productId": 1,
    "rating": 5,
    "comment": "Exceptional sound isolation and comfortable ear cushions!",
    "createdAt": "2026-10-25T11:25:00.000Z"
  },
  "error": {}
}
```

---

### 6.2 Get All Reviews for a Product
- **Method**: `GET`
- **Endpoint**: `/products/:productId/reviews`
- **Auth Required**: No

**Response (`200 OK`)**:
```json
{
  "success": true,
  "message": "Reviews fetched successfully",
  "data": [
    {
      "id": 1,
      "rating": 5,
      "comment": "Exceptional sound isolation and comfortable ear cushions!",
      "createdAt": "2026-10-25T11:25:00.000Z",
      "user": {
        "id": 1,
        "name": "Jane Doe"
      }
    }
  ],
  "error": {}
}
```

---

## 7. Common HTTP Status Codes

| Code | Status | Meaning |
| :--- | :--- | :--- |
| `200` | OK | Request was successful |
| `201` | Created | Resource created successfully (user registered, item added, order placed) |
| `400` | Bad Request | Validation error, out of stock, empty cart, or missing required fields |
| `401` | Unauthorized | Missing, invalid, or expired JWT token |
| `403` | Forbidden | Trying to modify someone else's cart or order |
| `404` | Not Found | Product, Category, or Order ID does not exist |
| `409` | Conflict | Email already registered or category name already exists |
| `500` | Internal Server Error | Unhandled server or database error |
