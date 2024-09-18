###### API_URL = `http://localhost:3001/api/user`

### Users

POST: `/user-register`

```js
`userName, fullName, email, phone, password` from body
```

POST: `/user-login`

```js
`userName or email, password` from body
```

GET: `/user-details`

```js
`id or UserName or Email` from Current User from Token
```

DELETE: `/user-delete`

```js
`id or UserName or Email ` from Current User from Token
`Password` from body
```

PUT: `/user-update-profile`

```js
`id or UserName or Email ` from Current User from Token
`userName, fullName, phone, photo, city, description` from body
```

PUT: `/user-update-password`

```js
`id or UserName or Email ` from Current User from Token
`oldPassword, newPassword` from body
```

---

### Posts

GET: `/all-posts`

```js
Fetch All Posts
```

GET: `/postById/:id`

```js
`postId` from body
```

GET: `/postsByUserName/:userName`

```js
`userName` from body
also get all posts of Current User
```

GET: `/postByTag/:tag`

```js
`tag` from body
```

GET: `/search-post/:search`

```js
`search` from body
```

GET: `/popular-post`

```js
fetch all posts sort by views
```

POST: `/create-post`

```js
`title, content, tags, postImage` from body
`author, authorImage` from Current User
```

PUT: `/update-post/:id`

```js
fetch post `id` from body
`title, content, tags, postImage` from body
`author, authorImage` from Current User
```

DELETE: `/delete-post/:id`

```js
`id` from body
```

---

### Comments

GET: `/commentsByPostId/:postId`

```js
`postId` from body
```

---

### Follow

GET: `/followingByUserId`

```js
get all users list that I followed
```

GET: `/followersByUserId`

```js
get all users list that follows me
```
