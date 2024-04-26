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

<!-- USAGE EXAMPLES -->
## Usage




<!-- CONTRIBUTING -->
## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue.

1. Fork the Project
2. Create your Feature Branch
3. Commit your Changes
4. Push to the Branch
5. Open a Pull Request

<!-- LICENSE -->
## License

Ahmad Basyouni 2024

