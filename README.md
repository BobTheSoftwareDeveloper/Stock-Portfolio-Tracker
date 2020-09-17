# Stock Portfolio Tracker

### Front-End:
Here is a link to my deployed [React project](https://stockportfoliotracker.azurewebsites.net/).
#### Login details:
- Username: demo (case sensitive)
- Password: 1234 (case sensitive)
#### Technologies used:
MERN Stack
- MongoDB
- Express
- React
- NodeJS
#### Features:
- Uses React with Typescript
- Connects to my own [API](https://github.com/BobTheSoftwareDeveloper/Stock-Portfolio-Tracker-Backend) created with Node JS Express
- Utilises CRUD operations through the API
- Uses Material-UI, axios, canvasjs, and react-spinners
- Sign-in verification through the use of REST API
- Responsive UI component through the use of Material-UI
- Colourful and interactive chart through the use of canvasjs
- Promise based HTTP request through axios
- Loading spinner with react-spinners

#### Advanced Features:
- Two factor authentications (TOTP/Time-based One Time Password)
- Custom branding - custom logo and theme
- Web scrapping the NZX (New Zealand Exchange) website to get a list of company name, code, and current price.
- Real time syncing between the same account (using Socket.io)
- Social media intergration (share current portfolio)
  - Email
  - Facebook
  - Twitter
  - Reddit
  - Pinterest
  - Whatsapp
- Session based login (each API call requires a valid session)
- Relationship database with relationships between tables
- Responsive UI (Web and Mobile)

### DevOps:
[Deployed website](https://stockportfoliotracker.azurewebsites.net/)

[Azure pipelines](https://dev.azure.com/stock-portfolio-tracker/Stock%20Portfolio%20Tracker) (Private. Have invited the two users in the submission requirement)

#### Description:
- The build pipeline uses npm run build to create a production version of the React website. It triggers when commits are made to the master and develop branch. By committing to the develop branch, it allows me to check if there are any errors in the building process before making a pull request to the master branch. 
- The release pipeline deploys the built files to my Azure website. It triggers when commits are made to the master branch. When I confirm that a commit in the develop branch is working as intended without any errors, then I can make a pull request to the master branch which will trigger the build pipeline and then the release pipeline and deploy the new changes onto the Azure website. 
