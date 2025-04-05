# TUI Git - GitHub Repository Terminal UI

A beautiful terminal UI tool for exploring GitHub repositories with live updates, built with Node.js and Ink.

## Features

- 🔍 **Repository Search**: Enter any GitHub repository by owner/repo or full URL
- 📊 **Live Data**: Real-time repository statistics, issues, and commits
- 🎯 **Navigation**: Arrow key navigation between different data views
- 🔄 **Auto-refresh**: Automatic data updates every 30 seconds
- 🎨 **Beautiful UI**: Modern terminal interface with colors and icons
- ⚡ **Fast**: Efficient data fetching with GitHub API

## Installation

1. Clone this repository:
```bash
git clone <this-repo>
cd TUI-GIT
```

2. Install dependencies:
```bash
npm install
```

3. Run the application:
```bash
npm start
```

## Usage

1. **Start the app**: Run `npm start`
2. **Enter repository**: Type a GitHub repository (e.g., `facebook/react` or `https://github.com/microsoft/vscode`)
3. **Navigate**: Use arrow keys to switch between Overview, Issues, and Commits tabs
4. **Exit**: Press `Q` to go back to input, or `Ctrl+C` to exit

## Controls

- **Enter**: Submit repository input
- **← →**: Navigate between tabs
- **Q**: Go back to repository input
- **Ctrl+C**: Exit application

## Data Views

### Overview Tab
- Repository statistics (stars, forks, watchers, issues)
- Creation and update dates
- Language, license, and size information
- Clone URLs and homepage links

### Issues Tab
- Recent issues with status indicators
- Issue titles, authors, and timestamps
- Labels and descriptions
- Open/closed status with color coding

### Commits Tab
- Recent commits with SHA hashes
- Commit messages and authors
- Timestamps and commit details
- Full commit information

## API Rate Limits

This tool uses the public GitHub API, which has rate limits:
- 60 requests per hour for unauthenticated requests
- 5000 requests per hour for authenticated requests

For higher limits, you can set a GitHub token as an environment variable:
```bash
export GITHUB_TOKEN=your_token_here
```

## Requirements

- Node.js 18.0.0 or higher
- Internet connection for GitHub API access

## Development

To run in development mode with auto-restart:
```bash
npm run dev
```

## License

MIT License - feel free to use and modify as needed.
