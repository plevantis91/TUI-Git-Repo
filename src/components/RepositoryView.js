import React from 'react';
import { Box, Text } from 'ink';
import OverviewTab from './tabs/OverviewTab.js';
import IssuesTab from './tabs/IssuesTab.js';
import CommitsTab from './tabs/CommitsTab.js';

const RepositoryView = ({ data, selectedTab, tabs, onTabChange, onBack }) => {
  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return <OverviewTab data={data} />;
      case 1:
        return <IssuesTab issues={data.issues} />;
      case 2:
        return <CommitsTab commits={data.commits} />;
      default:
        return <OverviewTab data={data} />;
    }
  };

  return (
    <Box flexDirection="column" height="100%">
      {/* Header */}
      <Box flexDirection="column" marginBottom={1} borderStyle="round" borderColor="cyan">
        <Box paddingX={1} paddingY={0}>
          <Text color="cyan" bold>
            📁 {data.repository.full_name}
          </Text>
        </Box>
        <Box paddingX={1} paddingY={0}>
          <Text color="gray">{data.repository.description || 'No description'}</Text>
        </Box>
        <Box paddingX={1} paddingY={0}>
          <Text color="green">
            ⭐ {data.repository.stargazers_count} stars • 
            🍴 {data.repository.forks_count} forks • 
            👀 {data.repository.watchers_count} watchers
          </Text>
        </Box>
        <Box paddingX={1} paddingY={0}>
          <Text color="yellow">
            🔄 Last updated: {new Date(data.lastUpdated).toLocaleString()}
          </Text>
        </Box>
      </Box>

      {/* Tab Navigation */}
      <Box marginBottom={1}>
        {tabs.map((tab, index) => (
          <Box key={index} marginRight={2}>
            <Text 
              color={selectedTab === index ? 'cyan' : 'gray'}
              bold={selectedTab === index}
            >
              {selectedTab === index ? '▶ ' : '  '}{tab}
            </Text>
          </Box>
        ))}
      </Box>

      {/* Tab Content */}
      <Box flexGrow={1} borderStyle="round" borderColor="gray">
        {renderTabContent()}
      </Box>

      {/* Footer */}
      <Box marginTop={1}>
        <Text color="gray">
          <Text color="white" bold>← →</Text> Navigate tabs • 
          <Text color="white" bold> Q</Text> Back • 
          <Text color="white" bold> Ctrl+C</Text> Exit
        </Text>
      </Box>
    </Box>
  );
};

export default RepositoryView;
