

# Project Name

## Overview

A brief description of your project, its purpose, and what it does.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Running the Application](#running-the-application)
- [Updating the Prisma Schema](#updating-the-prisma-schema)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (v14 or later)
- npm installed (comes with Node.js)
- Prisma installed globally (optional, can also use npx)

## Getting Started

To get a copy of this repository up and running on your local machine, follow these steps:

1. **Clone the repository**:

   Open your terminal and run the following command:

   ```bash
   git clone git@github.com:Ridvan-bot/api.git

2. **Navigate to the project directory**:
    ```bash
    cd api

3. **Install the required packages**:

    ```bash
    npm install

4. **Running The App**: 
    ```bash
    npm run


## Updating the Prisma Schema

To update the Prisma schema, follow these steps:

Modify the schema.prisma file:

Update the schema.prisma file located in the prisma directory to reflect your changes (add or modify models, fields, etc.).

Create a new migration:

1. **Use the following command to create a migration based on your changes**:

    ```bash
    npm run prisma:migrate dev --name <migration-name>

Replace <migration-name> with a descriptive name for your migration, such as add-username-to-user.


After creating the migration, run the following command to regenerate the Prisma Client:
2. **Generate the Prisma Client**:

    ```bash
    npm run prisma:generate


Deploy your migrations (optional):

3. **If you're ready to deploy your migrations, run**:

    ```bash
    npm run prisma:deploy




