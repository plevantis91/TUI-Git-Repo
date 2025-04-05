import React from 'react';
import { Box, Text } from 'ink';

const IssuesTab = ({ issues }) => {
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

  const getStateColor = (state) => {
    return state === 'open' ? 'green' : 'red';
  };

  const getStateIcon = (state) => {
    return state === 'open' ? '🟢' : '🔴';
  };

  if (!issues || issues.length === 0) {
    return (
      <Box flexDirection="column" padding={1} alignItems="center" justifyContent="center">
        <Text color="gray">No issues found</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text color="cyan" bold marginBottom={1}>
        🐛 Recent Issues ({issues.length})
      </Text>
      
      {issues.map((issue, index) => (
        <Box key={issue.id} flexDirection="column" marginBottom={1} borderStyle="round" borderColor="gray">
          <Box flexDirection="row" alignItems="center" paddingX={1} paddingY={0}>
            <Text color={getStateColor(issue.state)}>
              {getStateIcon(issue.state)} #{issue.number}
            </Text>
            <Text color="white" bold marginLeft={1}>
              {issue.title}
            </Text>
          </Box>
          
          <Box flexDirection="row" paddingX={1} paddingY={0}>
            <Text color="gray">
              By {issue.user.login} • {formatDate(issue.updated_at)}
            </Text>
          </Box>
          
          {issue.labels && issue.labels.length > 0 && (
            <Box flexDirection="row" paddingX={1} paddingY={0}>
              {issue.labels.map((label, labelIndex) => (
                <Text key={labelIndex} color="yellow" marginRight={1}>
                  #{label.name}
                </Text>
              ))}
            </Box>
          )}
          
          {issue.body && (
            <Box paddingX={1} paddingY={0}>
              <Text color="gray">
                {issue.body.length > 100 ? issue.body.substring(0, 100) + '...' : issue.body}
              </Text>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default IssuesTab;
