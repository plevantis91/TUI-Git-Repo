import React from 'react';
import { Box, Text } from 'ink';
import ora from 'ora';

const LoadingView = () => {
  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <Box marginBottom={2}>
        <Text color="cyan">🔄 Fetching repository data...</Text>
      </Box>
      <Box>
        <Text color="gray">This may take a moment...</Text>
      </Box>
    </Box>
  );
};

export default LoadingView;
