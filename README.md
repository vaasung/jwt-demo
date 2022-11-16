# Sample JWT Auth token
This app is a sample CRUD operation, click this [jwt-demo], and start playing here


## Features
- User need to register with app
- - username, email, password required
- - password hashed by using bcrypt.js
- - user can give any valid or invalid email ( _`email verification not included in this version`_ )
- Login required after the registration
- Authorized users can add, edit, delete their movie user our app
- We provided `2 mins` valid token for user, if token expired user need to re-login
 

## Features what not included in this version
- Email verification
- Image upload (only text version)


## Tech
- node.js, express.js - (backend)
- postgres - (database)
- ejs, javascript - (frontend)
- jwt - (backend token verification)
- bcryptjs - (password hashing)
- [bootstrapmade] - (free bootstrap template)
## Resource URL


| Domain | URL |
| ------ | ------ |
| Production | https://jwt-demo-rose.vercel.app |
| GitHub | https://github.com/vaasung/jwt-demo |
| Postman Collection | https://www.postman.com/orange-crater-749148/workspace/jwt-demo/collection/2008143-3f0cb25c-d734-485a-a6e5-850d55e883f5?action=share&creator=2008143 |
| Deployment | https://vercel.com |

## Screenshot
![Register](https://raw.githubusercontent.com/vaasung/jwt-demo/main/screenshot/01Register.png)
![Login](https://raw.githubusercontent.com/vaasung/jwt-demo/main/screenshot/02Login.png)
![Home](https://raw.githubusercontent.com/vaasung/jwt-demo/main/screenshot/03Home.png)
![Add Movie](https://raw.githubusercontent.com/vaasung/jwt-demo/main/screenshot/05Add%20Movie.png)
![Edit Movie](https://raw.githubusercontent.com/vaasung/jwt-demo/main/screenshot/04Edit%20Movie.png)


[bootstrapmade]: <https://bootstrapmade.com>
[jwt-demo]: <https://jwt-demo-rose.vercel.app>