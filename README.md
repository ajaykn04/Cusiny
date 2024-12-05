# **Cusiny**

**Cusiny** is a dynamic platform for food enthusiasts to discover, share, and manage recipes. Users can easily create, edit, and remove their own recipes, while also engaging with a community of other food lovers by rating and commenting on shared recipes.

## **Table of Contents**

- Introduction
- Features
- Technologies Used
- Setup and Installation
- Usage
- Project Structure
- Contributors

## **Introduction**

**Cusiny** is an innovative website designed to empower users in their culinary journey. Whether you're looking to create new recipes, browse through a variety of dishes, or interact with a community of food lovers, **Cusiny** offers a comprehensive set of tools and features to make your experience enjoyable.

## **Features**

- **Recipe Management**: Users can create, edit, and delete their own recipes.
- **Community Interaction**: Browse, rate, and comment on recipes shared by other users.
- **Admin Controls**: Admins can manage user profiles and have the ability to remove users or recipes as needed.
- **Responsive Design**: The website features a responsive and user-friendly interface.
- **Secure Authentication**: User data is securely managed with authentication and encrypted passwords.

## **Technologies Used**

- **Front-End**: ReactJS, HTML, CSS, MUI (Material-UI)
- **Back-End**: Node.js, Express.js
- **Database**: MongoDB
- **Tools**: Visual Studio Code, Postman

## **Setup and Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ajaykn04/Cusiny.git
   cd Cusiny
   ```

2. **Build and Run the Frontend**:
   ```bash
   cd Cusiny/frontend
   npm install
   npm run dev
   ```

3. **Build and Run the Backend**:
   ```bash
   cd Cusiny/backend
   npm install
   node index.js
   ```

4. **Access the application**:
   - Frontend: Visit `http://localhost:5173` in your browser. (may vary if you are running any other programs in your localhost, check terminal)
   - Backend: The backend runs on `http://localhost:3000`.

## **Usage**

- **Login and Registration**:
  - Users can register and log in to manage their recipes.
  - Admins have pre-defined credentials to access admin functionalities.

- **Recipe Management**:
  - After logging in, users can create new recipes, edit existing ones, or delete them from the "My Recipes" page.
  - Users can also browse recipes shared by others, rate them, and leave comments.

- **Admin Tools**:
  - Admins can view and manage all user profiles and have the ability to delete any recipe or user account if necessary.

## **Project Structure**

```
Cusiny/
│
├── backend/             
│   ├── images/recipes/   # Recipe images
│   ├── model/            # Database models and connection
│   ├── index.js          # Main backend file
│   ├── package.json      # Backend dependencies
│   └── package-lock.json # Backend lockfile
│
├── frontend/            
│   ├── RESOURCES/        # Resource files
│   ├── public/           # Public assets
│   ├── src/              # Source files
│   │   ├── components/   # React components
│   │   ├── App.jsx       # Main App component
│   │   ├── main.jsx      # Entry point
│   ├── package.json      # Frontend dependencies
│   └── package-lock.json # Frontend lockfile
│
└── Cusiny report.pdf     # Project report

```

## **Contributors**

- **Ajay Das**
- **Adithya Vinod**
