import React from 'react';
import { Repository } from '../RepositoryTracker';
import { Paper } from '@mui/material';
import { marked } from 'marked';

interface ReleaseNotesPanelProps {
    repository: Repository | null;
}

export const ReleaseNotesPanel: React.FC<ReleaseNotesPanelProps> = ({ repository }) => {
    if (!repository) {
        return (
            <Paper elevation={3} sx={{ p: 3, height: '100%', overflow: 'auto' }}>
                Select a repository to view release notes
            </Paper>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(Number(dateString)).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const markdownContent = `
# ${repository.full_name}

${repository.description ? repository.description : ''}

${repository.latest_release ? `
## Latest Release: ${repository.latest_release.tag_name}

Published on ${formatDate(repository.latest_release.published_at)}

${repository.latest_release.body || 'No release notes available.'}
` : 'No releases available for this repository.'}
`;

    return (
        <Paper elevation={3} sx={{ p: 3, height: '100%', overflow: 'auto' }}>
            <div dangerouslySetInnerHTML={{ __html: marked(markdownContent) }} />
        </Paper>
    );
};

export default ReleaseNotesPanel;