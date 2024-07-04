## API Reference

#### 1. Authentication

```http
  POST /auth/login
```

| Parameter          | Type     | Description                 |
| :----------------- | :------- | :-------------------------- |
| `account_username` | `string` | กรอกชื่อของผู้ใช้ในระบบ     |
| `account_password` | `string` | กรอกรหัสผ่านของผู้ใช้ในระบบ |

#### 2. Get All Category

```http
  GET /category/get
```

#### 3. Get Category

```http
  GET /category/get/{id}
```

#### 4. Create Category

```http
  POST /category/create
```

| Parameter               | Type     | Description             |
| :---------------------- | :------- | :---------------------- |
| `category_name_thai`    | `string` | หมวดหมู่อาหารภาษาไทย    |
| `category_name_english` | `string` | หมวดหมู่อาหารภาษาอังกฤษ |

- **Required**. ต้องใช้ Authentication ด้วย Bearer Token ที่ได้มาจากการ Login เข้่าสู่ระบบ

#### 5. Update Category

```http
  PUT /category/update/{id}
```

| Parameter               | Type     | Description             |
| :---------------------- | :------- | :---------------------- |
| `category_name_thai`    | `string` | หมวดหมู่อาหารภาษาไทย    |
| `category_name_english` | `string` | หมวดหมู่อาหารภาษาอังกฤษ |

- **Required**. ต้องใช้ Authentication ด้วย Bearer Token ที่ได้มาจากการ Login เข้่าสู่ระบบ

#### 6. Delete Category

```http
  DELETE /category/delete/{category_id}
```

- **Required**. ต้องใช้ Authentication ด้วย Bearer Token ที่ได้มาจากการ Login เข้่าสู่ระบบ

#### 7. Get All Menu

```http
  GET /menu/get
```

#### 8. Get Menu

```http
  GET /menu/get/{id}
```

#### 9. Create Menu

```http
  POST /menu/create
```

| Parameter               | Type     | Description |
| :---------------------- | :------- | :---------- |
| `menu_name_thai`        | `string` |             |
| `menu_name_english`     | `string` |             |
| `menu_describe_thai`    | `string` |             |
| `menu_describe_english` | `string` |             |
| `menu_price`            | `string` |             |
| `menu_category_id`      | `string` |             |
| `menu_option_id`        | `string` |             |
| `menu_image`            | `string` |             |

- **Required**. ต้องใช้ Authentication ด้วย Bearer Token ที่ได้มาจากการ Login เข้่าสู่ระบบ

#### 10. Update Menu

```http
  PUT /menu/update/{id}
```

| Parameter               | Type     | Description |
| :---------------------- | :------- | :---------- |
| `menu_name_thai`        | `string` |             |
| `menu_name_english`     | `string` |             |
| `menu_describe_thai`    | `string` |             |
| `menu_describe_english` | `string` |             |
| `menu_price`            | `string` |             |
| `menu_category_id`      | `string` |             |
| `menu_option_id`        | `string` |             |

- **Required**. ต้องใช้ Authentication ด้วย Bearer Token ที่ได้มาจากการ Login เข้่าสู่ระบบ

#### 11. Delete Category

```http
  DELETE /menu/delete/{category_id}
```

- **Required**. ต้องใช้ Authentication ด้วย Bearer Token ที่ได้มาจากการ Login เข้่าสู่ระบบ
