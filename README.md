## CIS 557 Term Project: PennLobby

### 1. Branches

|   branch name   |                          description                          |
| :-------------: | :-----------------------------------------------------------: |
|     master      |       main branch to accept production-ready codes only       |
|   development   | dev branch to merge incoming changes from 4 personal branches |
|     miaoyan     |                Miaoyan Zhang's personal branch                |
|     ruichen     |                Ruichen Zhang's personal branch                |
|      wang       |                 Ruifan Wang's personal branch                 |
|      yang       |                 Yang Zhang's personal branch                  |
|    unit-test    |                       unit test branch                        |
| end-to-end-test |                      cypress test branch                      |

### 2. Frontend File Structure

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

### 3. Backend File Structure

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
|   |── passport.js        # user authorization & authentication
|   |── s3.js              # configure Amazon S3 to store images & videos
|   |── wsserver.js        # configure web socket to enable chat
├── .env                   # environment variables (often we want them to remain private)
├── .gitignore
├── package.json
├── package-lock.json
```

### 4. Development Guideline

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

### 5. Links

1. [Figma UI Design Prototype](https://www.figma.com/file/OwPdD7ktVVHmrePxbeeZmr/Wireframe)
2. [SwaggerHub APIs](https://app.swaggerhub.com/organizations/cis557-penn-lobby)
3. [MUI Component Library](https://mui.com)
4. [MUI Templates](https://mui.com/getting-started/templates/)
5. [DB Schema Design](https://docs.google.com/document/d/e/2PACX-1vT2osuKE9V8LGh9TzX6qkJAsVPpPvGKPkk7NOG0wbeyTRxq2XeLGg2FKLGx7k8tHtiAWDlZ7yqztzI4/pub)
6. [DB ER Model](https://dbdiagram.io/d/61a696dc8c901501c0da3224)
7. [Postman Test Collection](https://www.getpostman.com/collections/01972e50040b6314e5b4)
