# Web Development Final Project - FutHub

This web app: Allows football users to socialize and interact with one another

## Demo

![demoo](https://github.com/ahmadbasyouni10/FutHub/assets/120362910/558ae38f-a26e-4860-9add-0d1e7a578de3)

### Documentation
1. NextJS updated docs - https://nextjs.org/docs 
2. Supabase upgraded v2 docs - https://supabase.com/docs/reference/javascript/installing
4. Tailwind docs - https://v2.tailwindcss.com/docs/utility-first

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* yarn
  ```sh
  npm install --global yarn
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/ahmadbasyouni10/FutHub
   ```
2. Create Next App
   ```sh
   yarn create next-app .
   ```
3. Setup Tailwind
   ```sh
   yarn add tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
4. Add supabase
   ```sh
   yarn add @supabase/supabase-js
   ```
  
5. Add your own supabase key and url `.env`
   ```js
   NEXT_PUBLIC_API_KEY = "YOUR API KEY";
   NEXT_PUBLIC_supabaseURL = "YOUR API URL
   ```

6. Create tables in supabase with following foreign relations and create insert, update, and delete row policies

<img width="587" alt="Screenshot 2024-04-26 at 10 11 21 AM" src="https://github.com/ahmadbasyouni10/FutHub/assets/120362910/9c43ec45-301a-4889-8215-8c778530a621">
<img width="587" alt="Screenshot 2024-04-26 at 10 12 36 AM" src="https://github.com/ahmadbasyouni10/FutHub/assets/120362910/0dfd8499-5e28-472a-a094-c057aa720fdc">
<img width="587" alt="Screenshot 2024-04-26 at 10 13 02 AM" src="https://github.com/ahmadbasyouni10/FutHub/assets/120362910/d44a9036-d5ab-43c2-a891-b7f6c473ff91">

<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

## Features

- [x] **A create form that allows the user to create posts**
- [x] **Posts have a title and optionally additional textual content and/or an image added as an external image URL**
- [x] **A home feed displaying previously created posts**
- [x] **By default, the time created, title, and number of upvotes for each post is shown on the feed**
- [x] **Clicking on a post shall direct the user to a new page for the selected post**
- [x] **Users can sort posts by either their created time or upvotes count**
- [x] **Users can search for posts by title**
- [x] **A separate post page for each created post, where any additional information is shown is linked whenever a user clicks a post**
- [x] **Users can leave comments underneath a post on the post's separate page**
- [x] **Each post should have an upvote button on the post's page. Each click increases its upvotes count by one and users can upvote any number of times**
- [x] **A previously created post can be edited or deleted from its post page**
- [x] Users can only edit and deleted posts or delete comments by entering the secret key, which is set by the user during post creation
- [x] Upon launching the web app, the user is assigned a random user ID. It will be associated with all posts and comments that they make and displayed on them.
- [x] Users can customize the interface of the web app
- [x] Users can set flags while creating a post. Then users can filter posts by flags on the home feed.
- [x] Users can upload images directly from their local machine as an image file
- [x] Display a loading animation whenever data is being fetched
* [x] Login page using google and supabase auth
* [x] Profile Page lets user edit their banners and pfps
* [x] Commenting on posts
* [x] Favoriting posts
      
<!-- LICENSE -->
## License

Ahmad Basyouni 2024
