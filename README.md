# Stock Portfolio Tracker

### Front-End:
Here is a link to my deployed [React project](https://stockportfoliotracker.azurewebsites.net/).
#### Login details:
- Username: bob (case sensitive)
- Password: MSA2020isCool! (case sensitive)
#### Features:
- Uses React with Typescript
- Connects to my own [API]([https://github.com/BobTheSoftwareDeveloper/StockPortfolioAPI/](https://github.com/BobTheSoftwareDeveloper/StockPortfolioAPI/)) created with ASP .NET Core
- Utilises CRUD operations through the API
- Uses Material-UI, axios, canvasjs, and react-spinners
- Sign-in verification through the use of REST API
- Responsive UI component through the use of Material-UI
- Colourful and interactive chart through the use of canvasjs
- Promise based HTTP request through axios
- Loading spinner with react-spinners

--
If any MSPs reading this has experience with setting up a login/sign-up environment (front-end and back-end), could you please give me some advice and point me in the right direction? 

### DevOps:
[Deployed website](https://stockportfoliotracker.azurewebsites.net/)

#### Description:
- The build pipeline uses npm run build to create a production version of the React website. It triggers when commits are made to the master and develop branch. By committing to the develop branch, it allows me to check if there are any errors in the building process before making a pull request to the master branch. 
- The release pipeline deploys the built files to my Azure website. It triggers when commits are made to the master branch. When I confirm that a commit in the develop branch is working as intended without any errors, then I can make a pull request to the master branch which will trigger the build pipeline and then the release pipeline and deploy the new changes onto the Azure website. 
