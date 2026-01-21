# SHS Admission Management Pro 🎓☁️

A high-performance, cloud-integrated admission management system for Senior High Schools. This platform streamlines the complex enrollment process into a 6-stage digital workflow, featuring role-based modules and **AI-driven Admissions Intelligence** powered by Google Gemini.

## 🚀 Key Features

- **6-Stage Digital Pipeline**: Tracks every step from Cheat Issue to Rector Approval.
- **Role-Based Workstations**:
  - **Headmaster**: Admission slip issuance.
  - **Secretary**: Form inventory management.
  - **Accountant**: Fee collection and revenue tracking.
  - **Registrar (Data Entry)**: Dual-stream entry for Bio-data and Transcripts.
  - **Rector**: Executive review and final authorization.
- **Gemini AI Intelligence**: Real-time analysis of enrollment trends and bottleneck identification via Google GenAI.
- **Cloud-Synchronized UI**: Modern, responsive dashboard with real-time sync indicators.
- **Offline-First Resilience**: Local persistence ensures zero data loss during connectivity drops.

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS
- **Icons**: Lucide React
- **Charts**: Recharts (D3-based)
- **AI**: Google Gemini 3 Flash (@google/genai)
- **State**: Persistent LocalStorage with Cloud Simulation

## 📦 Getting Started

### Prerequisites
- A modern web browser.
- A [Google AI Studio API Key](https://aistudio.google.com/) (for Cloud Intelligence features).

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/shs-admission-pro.git
   ```
2. Set up your environment:
   Create a `.env` file in the root directory and add your key:
   ```env
   API_KEY=your_gemini_api_key_here
   ```
3. Open `index.html` in your browser or serve via a local development server.

## 📁 Project Structure
The project follows a flat root structure for maximum portability:
- `App.tsx`: Main application shell and routing.
- `types.ts`: Central TypeScript definitions.
- `components/`: Modular workstations for each administrative role.
- `services/`: AI logic and data persistence layers.

## ⚖️ License
Distributed under the MIT License. See `LICENSE` for more information.

---
*Built with ❤️ for modern education management.*
