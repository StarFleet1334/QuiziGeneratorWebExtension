# Quiz Generator Web Extension

A comprehensive quiz generation system built with multiple services architecture. The system generates quizzes from web content using AI and provides an interactive learning experience.

## Project Structure

The project consists of three main services:

### 1. Back Service
- **Technology**: Spring Boot (Java)
- **Port**: Default (8080)
- **Purpose**: Main backend service handling business logic and API endpoints
- **Features**:
  - RESTful API endpoints for quiz management
  - Question generation processing
  - User progress tracking
  - Quiz difficulty management

### 2. Life Service
- **Technology**: FastAPI (Python)
- **Port**: 8001
- **Purpose**: AI/ML service for content processing and question generation
- **Features**:
  - Text analysis and processing
  - Question generation algorithms
  - Category identification
  - Content summarization

### 3. Front Service
- **Technology**: JavaScript (Browser Extension)
- **Purpose**: User interface and interaction
- **Features**:
  - Browser extension interface
  - Real-time quiz interaction
  - Timer management
  - Theme switching
  - Settings management

## Prerequisites

- Node.js (v14 or higher)
- Java JDK 17
- Python 3.8+
- npm (Node Package Manager)
- Gradle

## Run Command
- npm run start:all

## Configuration

### Environment Variables
- Modify in the life-service folder in settings.py—API_KEY 
  ```
  OPENAI_API_KEY=your_api_key
  ```

## Future Enhancements

1. Dynamic difficulty adjustment based on user performance
2. Highlighting of a text and provide a description of it



