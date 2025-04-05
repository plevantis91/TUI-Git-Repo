import React from 'react';
import { Box, Text } from 'ink';

const OverviewTab = ({ data }) => {
  const { repository } = data;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Box flexDirection="column" padding={1}>
      <Box flexDirection="column" marginBottom={2}>
        <Text color="cyan" bold>📊 Repository Statistics</Text>
        <Box flexDirection="row" marginTop={1}>
          <Box marginRight={4}>
            <Text color="yellow">⭐ Stars: {formatNumber(repository.stargazers_count)}</Text>
          </Box>
          <Box marginRight={4}>
            <Text color="green">🍴 Forks: {formatNumber(repository.forks_count)}</Text>
          </Box>
          <Box marginRight={4}>
            <Text color="blue">👀 Watchers: {formatNumber(repository.watchers_count)}</Text>
          </Box>
          <Box>
            <Text color="magenta">📝 Issues: {repository.open_issues_count}</Text>
          </Box>
        </Box>
      </Box>

      <Box flexDirection="column" marginBottom={2}>
        <Text color="cyan" bold>📅 Timeline</Text>
        <Box flexDirection="column" marginTop={1}>
          <Text color="gray">Created: {formatDate(repository.created_at)}</Text>
          <Text color="gray">Updated: {formatDate(repository.updated_at)}</Text>
          <Text color="gray">Pushed: {formatDate(repository.pushed_at)}</Text>
        </Box>
      </Box>

      <Box flexDirection="column" marginBottom={2}>
        <Text color="cyan" bold>🏷️ Repository Info</Text>
        <Box flexDirection="column" marginTop={1}>
          <Text color="gray">Language: {repository.language || 'Unknown'}</Text>
          <Text color="gray">License: {repository.license?.name || 'No license'}</Text>
          <Text color="gray">Size: {formatNumber(repository.size)} KB</Text>
          <Text color="gray">Default Branch: {repository.default_branch}</Text>
        </Box>
      </Box>

      <Box flexDirection="column">
        <Text color="cyan" bold>🔗 Links</Text>
        <Box flexDirection="column" marginTop={1}>
          <Text color="blue">🌐 Homepage: {repository.homepage || 'Not set'}</Text>
          <Text color="blue">📖 Clone URL: {repository.clone_url}</Text>
          <Text color="blue">🌍 SSH URL: {repository.ssh_url}</Text>
        </Box>
      </Box>
    </Box>
  );
};

export default OverviewTab;
