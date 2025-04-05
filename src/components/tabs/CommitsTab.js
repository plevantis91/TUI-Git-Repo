import React from 'react';
import { Box, Text } from 'ink';

const CommitsTab = ({ commits }) => {
  const formatDate = (dateString) => {
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
  };

  const formatCommitMessage = (message) => {
    const lines = message.split('\n');
    return lines[0]; // Return only the first line (commit title)
  };

  if (!commits || commits.length === 0) {
    return (
      <Box flexDirection="column" padding={1} alignItems="center" justifyContent="center">
        <Text color="gray">No commits found</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan" bold marginBottom={1}>
        📝 Recent Commits ({commits.length})
      </Text>
      
      {commits.map((commit, index) => (
        <Box key={commit.sha} flexDirection="column" marginBottom={1} borderStyle="round" borderColor="gray">
          <Box flexDirection="row" alignItems="center" paddingX={1} paddingY={0}>
            <Text color="yellow">
              🔗 {commit.sha.substring(0, 7)}
            </Text>
            <Text color="white" bold marginLeft={1}>
              {formatCommitMessage(commit.commit.message)}
            </Text>
          </Box>
          
          <Box flexDirection="row" paddingX={1} paddingY={0}>
            <Text color="gray">
              By {commit.commit.author.name} • {formatDate(commit.commit.author.date)}
            </Text>
          </Box>
          
          {commit.commit.message.includes('\n') && (
            <Box paddingX={1} paddingY={0}>
              <Text color="gray">
                {commit.commit.message.split('\n').slice(1).join(' ').substring(0, 100)}...
              </Text>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default CommitsTab;
