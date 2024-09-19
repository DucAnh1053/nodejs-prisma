## Cloning the Repository:

```bash
git clone https://github.com/DucAnh1053/nodejs-prisma
cd nodejs-prisma
```

## Backend setup

1. Navigate to the `Backend` folder:

    ```bash
    cd Backend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Prisma setup

    1. Set up your environment variables:

        Create a `.env` file in the Backend directory with the following content
        ```bash
        PORT=somePort
        DATABASE_URL=someDatabaseUrl
        JWT_SECRET=someJWTSecret
        ```

    2. Deploy Prisma migrations to set up the database:

        ```bash
        npx prisma migrate deploy
        ```

        Create Prisma Client:

        ```bash
        npx prisma generate
        ```

4. Start the backend server

    ```bash
    npm start
    ```

    The server will run on the port specified in the `.env` file.

    **Useful Commands**

    - `npx prisma studio`: Open Prisma Studio for visual data management.
    - `npx prisma migrate reset`: Drop and recreate the entire database (this will delete all data).
    - `npx prisma db push`: Sync the schema model with the database without creating a migration.

## Frontend Setup

1. Navigate to the `Frontend` folder:

    ```bash
    cd ../Frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the frontend development server:

    ```bash
    npm start
    ```