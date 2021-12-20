# CIS 557 Term Project: PennLobby
## Links:
1. [PennLobby App Deployment](https://pennlobby.herokuapp.com/)
2. [Figma UI Design & Prototype](https://www.figma.com/file/OwPdD7ktVVHmrePxbeeZmr/Wireframe)
3. [SwaggerHub APIs](https://app.swaggerhub.com/organizations/cis557-penn-lobby)
4. [MUI Component Library](https://mui.com)
5. [MUI Templates](https://mui.com/getting-started/templates/)
6. [DB Schema Design](https://docs.google.com/document/d/e/2PACX-1vT2osuKE9V8LGh9TzX6qkJAsVPpPvGKPkk7NOG0wbeyTRxq2XeLGg2FKLGx7k8tHtiAWDlZ7yqztzI4/pub)
7. [DB ER Model](https://dbdiagram.io/d/61a696dc8c901501c0da3224)
8. [Postman Test Collection](https://www.getpostman.com/collections/01972e50040b6314e5b4)

## Github Branches

|   branch name   |                          description                          |
| :-------------: | :-----------------------------------------------------------: |
|     master      |       main branch to accept production-ready codes only       |
|   development   | dev branch to merge incoming changes from 4 personal branches |
| deploy-backend  |                deployment branch for back-end                 |
| deploy-pennlobby|                deployment branch for front-end                |
| deploy-websocket|                deployment branch for websocket                |
|      yang       |                 Yang Zhang's personal branch                  |
|     miaoyan     |                Miaoyan Zhang's personal branch                |
|     ruichen     |                Ruichen Zhang's personal branch                |
|      wang       |                 Ruifan Wang's personal branch                 |
|    unit-test    |                       unit test branch                        |
| end-to-end-test |                      cypress test branch                      |

## Frontend File Structure

```
client
├── public                 # store static files (logos, pictures, etc.)
├── src
|   ├── components         # js files 
|   |   |── Lobby.js
|   |   |── ...
|   ├── styles             # css files 
|   |   |── Lobby.css
|   |   |── ...
|   ├── tests              # test files 
|   |   |── Lobby.test.js
|   |   |── ...
|   |── fetch.js           # HTTP request methods to fetch data from backend
|   ├── App.js
|   └── App.css
|   ├── index.js
|   ├── index.css
|   ├── setupTests.js
|   └── reportWebVitals.js
├── .eslintrc.js
├── .gitignore
├── package.json
├── package-lock.json
├── yarn.lock
└── README.md
```

## Backend File Structure

```
api
├── app.js                 # main server file (connect to MongoDB, configure Express app, set root backend routes, e.g. '/api/user')
├── models                 # DB schemas
|   ├── Comment.js
|   ├── ...
├── DBOperations           # CRUD functions
|   ├── comments.js
|   ├── ...
├── routes                 # set relative backend routes, e.g. '/:id'
|   ├── comment.js
|   ├── ...
├── utils                  # util functions
|   ├── catchAsync.js
|   ├── ExpressError.js
|── passport.js            # user authorization & authentication
|── eslintrc.js
|── s3.js                  # configure Amazon S3 to store images & videos
|── wsserver.js            # configure web socket to enable chat
├── .env                   # environment variables (often we want them to remain private)
├── .gitignore
├── package.json
├── package-lock.json
```

## 4. Development Guideline

1. When you are working on a JS component: put your component into `components` directory;
2. When you are working on the CSS file of a JS component: put your CSS file into `styles` directory, and navigate to `index.css` to import it. DO NOT import CSS in the corresponding JS component file;
3. When you are working on the unit test of a JS component: put your unit test into `tests` directory;
4. Remote `development` branch -> Remote `ruichen` branch: make a pull request on GitHub manually;
5. Remote `ruichen` branch -> Local `ruichen` branch: pull using Git command `git pull origin ruichen` or use IDE/GUI shortcut;
6. Remember to frequently pull latest changes from remote branch first, then start working on your own branch locally, otherwise you would encounter git conflict problems;
7. DO NOT push `node_modules`, `.DS_Store` files to GitHub, and unstash the changes or manually delete them on GitHub if you've already done so;
8. After cloning the project from the GitHub repo, run `npm install` in both `client` and `api` directories; 
9. Run `npm start` in the `client` directory, then open `localhost:3000` in browser to see frontend;
10. Run `npm start` in the `api` directory, then open `localhost:8080` in browser to see backend;
11. Test the APIs using `curl` commands or Postman; make sense of the data format by checking out the Mongo Atlas console;
12. Resolve ESLint errors during development (both frontend and backend); make sure to pass TravisCI check when committing changes to repo and merging into branches.

## Figma UI Design

1. Homepage Design
___
![alt text](https://github.com/cis557/fall-2021-project-group-centric-social-network-team-31/blob/93b835fb53b4d0081d9e3fa5577aba5db3710b37/doc/Figma.png)
___
2. MyPosts Page Design
___
![alt text](https://github.com/cis557/fall-2021-project-group-centric-social-network-team-31/blob/93b835fb53b4d0081d9e3fa5577aba5db3710b37/doc/Figma2.png)
___
3. Message Page Design
___
![alt text](https://github.com/cis557/fall-2021-project-group-centric-social-network-team-31/blob/93b835fb53b4d0081d9e3fa5577aba5db3710b37/doc/Figma3.png)
___

## React component description
### App.js
* This is the root page that dispatches different sub-components.
### Menu.js
* This is the header component that sticks to the top of the page, leading to Home (all the public groups), My Groups (all the group the user is in), My Posts (all the posts sent by the user), Messages, Notification, and Profile Page.
### Group.js
* This is the layout component for My Group page, containing the Menu (as a header), group filters, all public GroupCards, and Group Suggestions. Users could browse all the basic information of public groups (view details, send join requests (if not inside group), quit (if already inside group), view group members). 
### GroupCard.js
* This is the core component for group information entry. It display the group name, group description, and group size. On the right locate three buttons: view details (to enter group details), join group / quit group, or group members (view all group members).
### GroupDetail.js
* This is the layout component for group details, containing the Menu (as a header), group name, group description, "invite someone" button, "leave group" button, "new post" button, and all the PostCards inside this group. 
### GroupMembers.js
* This is the component that specifically displays the group member and their admin status in a group. The username of each group member inside the group an
### Login.js
* This component is the page for login, it sends a request to the backend to authenticate the user and will redirect to the lobby page if successful, otherwise the error message will pop up. From this page, you can also go to the sign-up page if you don't have an account yet.
### Signup.js
* This is the page for sign up, where you input your information and if the inputs are valid, you will be able to register your account, otherwise the error message will show up and explicitly show you where the error is.
### Messages.js
* This is the page for real-time chat page. The user could see a list of users (with their usernames and profile) on the left, and leave a message (or upload a video, audio, or image).
### Notification.js
* This is the entry for viewing all the friends requests.
### Post.js
* This is the layout component for My Posts, containing the Menu (as a header), and all the PostCards (authored by the user logged in).
### PostCard.js
* This is the core component for post and comment entry. It displays the post's author's username, post content, a "delete post" button, a "flag" button, a "hide" button, a "post analytics" button (which displays the post time and comment size). Also, a toggle down button is added on the right which allows the user to view all the comments attached to this post. For each comment section, a "edit comment" button and a "delete comment" are added on the right.
### Profile.js
* This is the profile page for the current user, it includes elements such as username, the user account created date and time, etc.
### TrendingTopics.js
* A list of trending topics, which is judged based on the number of groups with that certain topic.
### UserAvatar.js
The profile picture and the place holder for the user profile picture that is used in many situations such as message and post.


## NoSQL Schema (accompanying ER diagram)
_For details, please refer to root/api/models/_

### Comment.js
```javascript
const **commentSchema** = new mongoose.Schema({
  content: { type: String, required: true },
  post_id: { type: Schema.Types.ObjectId, ref: 'Post' },
  author_id: { type: Schema.Types.ObjectId, ref: 'User' }
});
### Group.js
```javascript
const **groupSchema** = new mongoose.Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  topic_ids: [{ type: Schema.Types.ObjectId, ref: "Topic" }],
  member_ids: [{ type: Schema.Types.ObjectId, ref: "User" }],
  post_ids: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  last_active: { type: Date, default: Date.now(), required: true },
  created_at: { type: Date, default: Date.now(), required: true },
  description: { type: String, required: true },
});
```
### Post.js
```javascript
const **postSchema** = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author_id: { type: Schema.Types.ObjectId, ref: "User" },
  group_id: { type: Schema.Types.ObjectId, ref: "Group" },
  comment_ids: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  created_at: { type: Date, default: Date.now(), required: true },
  flag_for_deletion: { type: Boolean, default: false, required: true },
});
```
### Topic.js
```javascript
const **topicSchema** = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  group_ids: [{ type: Schema.Types.ObjectId, ref: "Group" }]
});
```
### User.js
```javascript
const **userSchema** = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: { type: String, required: true },
  group_ids: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  post_ids: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  comment_ids: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  blocking: [{ type: Schema.Types.ObjectId, ref: "User" }],
  blocked_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
  group_admins: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  created_at: { type: Date, default: Date.now(), required: true },
  avatar_url: { type: String, default: "" },
  notification_ids: [ { type: Schema.Types.ObjectId, ref: "Notification" } ],
});

userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          user.password = hash;
          next();
      });
  });
});

userSchema.methods.verifyPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};
```

## Security Checks:
### Access Control:
* Frontend: Users who are not logged in only have access to the home page where suggested public groups are shown. Accessing any other pages will cause redirecting to the login page. 
* Backend: We designed the API in the way that it will only accept requests made from users with a valid session, the session will automatically get created when user successfully login.
### Input Validation:
* We utilized the JSON schema validator Ajv, where we define the schema and required properties before hand and use the built-in functions from the Ajv library to validate the input data from the body of the request.
### Account Lockout Policy:
* We allow up to 5 attemps for users to log in, if the attempts exceed this number, we will lock the account associated with the username for 15 minutes. The user will only be able input their username and password after 15 minutes. During the lockout time, the webapp will not send any request to the backend with the same username.
### HTTP Status Codes:
* 201 - New item is successfully created in the database 
* 200 - OK, response for successful HTTP requests
* 404 - The corresponding item is not found in the database
* 400 - Bad Request, an exception has occurred
* 401 - Unauthorized HTTP requests
### Use of .env File:
* We stored MONGODB URL that contains our account's password in the .env file. The environment variable is manually added to the Heroku deployment.

## Final Webpage Implementation:
After 4 months of hard work, PennLobby was successfully deployed on Heroku. We are extremely glad to see that the final implementation perfectly lives up to what was expected during the initial UI/UX design. 

## Final Webpage Implementation:
1. Home

***

![](https://github.com/cis557/fall-2021-project-group-centric-social-network-team-31/blob/87253d6b17799b3bad029d16c0dbe6f07e56d3c8/doc/final_Home.png)

***

2. My Groups

***

![](https://github.com/cis557/fall-2021-project-group-centric-social-network-team-31/blob/87253d6b17799b3bad029d16c0dbe6f07e56d3c8/doc/final_MyGroups.png)

***

3. My Posts

***

![](https://github.com/cis557/fall-2021-project-group-centric-social-network-team-31/blob/87253d6b17799b3bad029d16c0dbe6f07e56d3c8/doc/final_MyPosts.png)

***

4. Messages

***

![](https://github.com/cis557/fall-2021-project-group-centric-social-network-team-31/blob/87253d6b17799b3bad029d16c0dbe6f07e56d3c8/doc/final_Messages.png)

***
