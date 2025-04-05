import React, { useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import GitHubService from './services/GitHubService.js';
import RepositoryView from './components/RepositoryView.js';
import InputView from './components/InputView.js';
import LoadingView from './components/LoadingView.js';
import ErrorView from './components/ErrorView.js';

const App = () => {
  const [currentView, setCurrentView] = useState('input');
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);
  const [repoData, setRepoData] = useState(null);

  const tabs = ['Overview', 'Issues', 'Commits'];

  useInput((input, key) => {
    if (currentView === 'input') {
      if (key.return) {
        handleRepositorySubmit();
      }
    } else if (currentView === 'repository') {
      if (key.leftArrow) {
        setSelectedTab(Math.max(0, selectedTab - 1));
      } else if (key.rightArrow) {
        setSelectedTab(Math.min(tabs.length - 1, selectedTab + 1));
      } else if (key.escape || input === 'q') {
        setCurrentView('input');
        setRepository(null);
        setRepoData(null);
        setError(null);
      }
    }
  });

  const handleRepositorySubmit = async () => {
    if (!repository) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await GitHubService.getRepositoryData(repository);
      setRepoData(data);
      setCurrentView('repository');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-refresh data every 30 seconds when viewing repository
  useEffect(() => {
    if (currentView === 'repository' && repository) {
      const interval = setInterval(async () => {
        try {
          const data = await GitHubService.getRepositoryData(repository);
          setRepoData(data);
        } catch (err) {
          console.error('Auto-refresh failed:', err.message);
        }
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [currentView, repository]);

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView error={error} onRetry={() => setCurrentView('input')} />;
  }

  if (currentView === 'input') {
    return (
      <InputView
        repository={repository}
        setRepository={setRepository}
        onSubmit={handleRepositorySubmit}
      />
    );
  }

  if (currentView === 'repository' && repoData) {
    return (
      <RepositoryView
        data={repoData}
        selectedTab={selectedTab}
        tabs={tabs}
        onTabChange={setSelectedTab}
        onBack={() => setCurrentView('input')}
      />
    );
  }

  return null;
};

export default App;
