## CIS 557 Term Project: PennLobby

### 1. Branches

| branch name | description |
| :----: | :----: |
| master | main branch to accept production-ready codes only |
| development | dev branch to merge incoming changes from 4 personal branches |
| miaoyan | Miaoyan Zhang's personal branch |
| ruichen | Ruichen Zhang's personal branch |
| wang | Ruifan Wang's personal branch |
| yang | Yang Zhang's personal branch |
| unit-test | unit test branch |
| end-to-end-test | cypress test branch |

### 2. File Structure

```
pennlobby
├── public                 # store static files (logos, pictures, etc.)
├── src            
|   ├── components         # js files (e.g. Home.js)          
|   ├── styles             # css files (e.g. Home.css) 
|   ├── tests              # test files (e.g. Home.test.js)
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

### 3. Development Guideline

1. When you are working on a JS component: put your component into `components` directory;
2. When you are working on the CSS file of a JS component: put your CSS file into `styles` directory, and navigate to `index.css` to import it. DO NOT import CSS in the corresponding JS component file;
3. When you are working on the unit test of a JS component: put your unit test into `tests` directory;
4. Remote `development` branch -> Remote `ruichen` branch: make a pull request on GitHub manually;
5. Remote `ruichen` branch -> Local `ruichen` branch: pull using Git command `git pull origin ruichen` or use IDE/GUI shortcut;
6. Remember to frequently pull latest changes from remote branch first, then start working on your own branch locally, otherwise you would encounter git conflict problems.
7. DO NOT push `node_modules`, `.DS_Store` files to GitHub, and unstash the changes or manually delete them on GitHub if you've already done so.

### 4. Links

1. [Figma UI Design Prototype](https://www.figma.com/file/OwPdD7ktVVHmrePxbeeZmr/Wireframe)
2. [SwaggerHub APIs](https://app.swaggerhub.com/organizations/cis557-penn-lobby)
3. [MUI Component Library](https://mui.com)
4. [MUI Templates](https://mui.com/getting-started/templates/)
