import React from 'react';
import { Box, Text, useInput } from 'ink';
import figlet from 'figlet';
import chalk from 'chalk';

const InputView = ({ repository, setRepository, onSubmit }) => {
  useInput((input, key) => {
    if (key.return) {
      onSubmit();
    } else if (key.backspace || key.delete) {
      setRepository(prev => prev ? prev.slice(0, -1) : '');
    } else if (input && !key.ctrl && !key.meta) {
      setRepository(prev => (prev || '') + input);
    }
  });

  return (
    <Box flexDirection="column" alignItems="center" justifyContent="center" height="100%">
      <Box marginBottom={2}>
        <Text>
          {chalk.cyan(figlet.textSync('TUI Git', { font: 'Small' }))}
        </Text>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="green">Enter GitHub repository:</Text>
      </Box>
      
      <Box marginBottom={1}>
        <Text color="yellow">
          {repository || '_'}
        </Text>
      </Box>
      
      <Box marginTop={2}>
        <Text color="gray">
          Examples: facebook/react, microsoft/vscode, or https://github.com/owner/repo
        </Text>
      </Box>
      
      <Box marginTop={1}>
        <Text color="gray">
          Press <Text color="white" bold>Enter</Text> to fetch data, <Text color="white" bold>Ctrl+C</Text> to exit
        </Text>
      </Box>
    </Box>
  );
};

export default InputView;
