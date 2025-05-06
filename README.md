# Active Reading Quiz Extension

A browser extension that helps users learn and retain information by generating interactive quizzes from web content in real-time.

## Features

- **Dynamic Quiz Generation**: Creates relevant questions from any web page content
- **Category-based Learning**: Organize and generate questions by specific categories
- **Interactive UI**: User-friendly interface with animated notifications and smooth transitions
- **Theme Support**: Customizable theme options for better user experience
- **Real-time Feedback**: Immediate feedback on quiz answers

## Installation

1. Clone this repository
2. Open your browser's extension management page
3. Enable Developer Mode
4. Click "Load unpacked extension"
5. Select the project directory

## Steps to Run on Windows
1. In terminal type: npm run start:all
2. Before running anything to run locally, you have to generate <API_KEY> from this site: https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com
to use AI. In my case I use "gemini-2.0-flash"
3. To install packages run -> npm install --save-dev concurrently


## Usage

1. Navigate to any web page you want to learn from
2. Click the extension icon to open the quiz interface
3. Choose between:
    - Generate Quiz: Creates questions from the current page content
    - Choose Category: Organizes content into learning categories

## Technical Stack

- JavaScript (ES6+)
- HTML5
- CSS3
- Browser Extension APIs
- Java
- Python
- Generative Language API

### Key Classes Documentation

# Frontend Classes

**UIManager**
- Manages all UI-related operations
- Handles view switching between initial, quiz, and category views
- Controls loading states and error messages
- Manages custom alert system with animations

**QuizManager**
- Controls quiz flow and question display
- Manages question state and counter
- Handles answer selection and validation
- Provides feedback on correct/incorrect answers
- Prevents skipping unanswered questions

**APIService**
- Handles communication with backend server
- Manages content extraction from web pages
- Processes API responses for quiz and category generation

**CategoryManager**
- Manages the category-based learning system
- Key functionalities:
    - Displays interactive category listings
    - Handles category selection and related content
    - Creates hierarchical category UI structure
    - Manages category-specific quiz generation
    - Handles empty category states with appropriate messaging
- Methods:
    - `displayCategories`: Renders category interface
    - `handleCategorySelect`: Processes category selection and quiz generation

**ThemeManager**
- Handles theme switching functionality
- Features:
    - Light/dark theme toggle
    - Persistent theme storage
    - Automatic theme restoration
    - Icon switching between sun/moon
- Uses localStorage for theme persistence
- Initializes theme based on user's last selection

**script.js (Main Application)**
- Entry point for the extension
- Core responsibilities:
    - Initializes all managers (UI, Theme, Quiz, Category)
    - Sets up event listeners for user interactions
    - Manages quiz generation workflow
    - Handles category generation process
    - Controls view transitions
- Key Functions:
    - `generateQuiz`: Handles quiz creation and validation
    - `generateCategories`: Manages category view generation
    - Event handlers for navigation and user actions



# Backend Services
## API Endpoints

1. Category Controller API's

```http
POST /api/category
```
| RequestBody | Type             | Description                |
|:------------|:-----------------|:---------------------------|
| `content`   | `ContentRequest` | **Required**. Content Data |



```http
POST /api/category/{category}
```
| PathVariable | Type     | Description                 |
|:-------------|:---------|:----------------------------|
| `category`   | `String` | **Required**. Category Name |


2. Data Controller API's

```http
POST /api/content
```
| RequestBody | Type             | Description                |
|:------------|:-----------------|:---------------------------|
| `content`   | `ContentRequest` | **Required**. Content Data |


```http
GET /api/content
```


3. Question Controller API's

```http
GET /api/questions
```



