import React from 'react';
import { Repository } from '../RepositoryTracker';

interface ReleaseNotesPanelProps {
    repository: Repository | null;
}

export const ReleaseNotesPanel: React.FC<ReleaseNotesPanelProps> = ({ repository }) => {
    console.log(repository);
    if (!repository) {
        return (
            <div className="h-full flex items-center justify-center bg-white rounded-lg shadow p-6">
                <p className="text-gray-500">Select a repository to view release notes</p>
            </div>
        );
    }

    return (
        <div className="h-full bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Release Notes for {repository.name}</h2>
            <div className="space-y-4">
                <p>{repository.latestRelease?.notes}</p>
            </div>
        </div>
    );
};

export default ReleaseNotesPanel;