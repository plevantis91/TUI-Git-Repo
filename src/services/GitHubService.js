import axios from 'axios';

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'TUI-Git/1.0.0'
      }
    });
  }

  async getRepositoryData(repoPath) {
    try {
      const [owner, repo] = this.parseRepositoryPath(repoPath);
      
      const [repoInfo, issues, commits] = await Promise.all([
        this.getRepositoryInfo(owner, repo),
        this.getRepositoryIssues(owner, repo),
        this.getRepositoryCommits(owner, repo)
      ]);

      return {
        repository: repoInfo,
        issues: issues.slice(0, 10), // Limit to 10 most recent issues
        commits: commits.slice(0, 10), // Limit to 10 most recent commits
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error(`Repository not found: ${repoPath}`);
      } else if (error.response?.status === 403) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Failed to fetch repository data: ${error.message}`);
      }
    }
  }

  parseRepositoryPath(repoPath) {
    const cleanPath = repoPath.replace(/^https?:\/\/github\.com\//, '').replace(/\.git$/, '');
    const parts = cleanPath.split('/');
    
    if (parts.length !== 2) {
      throw new Error('Invalid repository format. Use: owner/repo or https://github.com/owner/repo');
    }
    
    return parts;
  }

  async getRepositoryInfo(owner, repo) {
    const response = await this.client.get(`/repos/${owner}/${repo}`);
    return response.data;
  }

  async getRepositoryIssues(owner, repo) {
    const response = await this.client.get(`/repos/${owner}/${repo}/issues`, {
      params: {
        state: 'all',
        sort: 'updated',
        per_page: 10
      }
    });
    return response.data;
  }

  async getRepositoryCommits(owner, repo) {
    const response = await this.client.get(`/repos/${owner}/${repo}/commits`, {
      params: {
        per_page: 10
      }
    });
    return response.data;
  }

  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m ago`;
    } else if (diffInSeconds < 86400) {
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    } else {
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    }
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }
}

export default new GitHubService();
