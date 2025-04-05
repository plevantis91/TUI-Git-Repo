import React from 'react';
import { Box, Text } from 'ink';

const ErrorView = ({ error, onRetry }) => {
  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <Box marginBottom={2}>
        <Text color="red">❌ Error</Text>
      </Box>
      
      <Box marginBottom={2} paddingX={2}>
        <Text color="red">{error}</Text>
      </Box>
      
      <Box marginTop={2}>
        <Text color="gray">
          Press <Text color="white" bold>Enter</Text> to try again, <Text color="white" bold>Ctrl+C</Text> to exit
        </Text>
      </Box>
    </Box>
  );
};

export default ErrorView;
