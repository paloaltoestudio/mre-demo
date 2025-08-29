import React from 'react';
import { useHashAuth } from '../contexts/HashAuthContext';
import { useActiveUser } from '../hooks/useActiveUser';
import { useSearchParams } from 'react-router-dom';

export const HashStatusDebug: React.FC = () => {
  const { hasHash, isProcessing, isAuthenticated, error } = useHashAuth();
  const { hasActiveUser, activeUser } = useActiveUser();
  const [searchParams] = useSearchParams();

  const hash = searchParams.get("hash");

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-sm z-50">
      <h3 className="font-semibold text-sm text-gray-800 mb-2">Hash Status Debug</h3>
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Hash en URL:</span>
          <span className={hash ? "text-green-600" : "text-gray-500"}>
            {hash ? "Sí" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>hasHash:</span>
          <span className={hasHash ? "text-green-600" : "text-gray-500"}>
            {hasHash ? "Sí" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>isProcessing:</span>
          <span className={isProcessing ? "text-yellow-600" : "text-gray-500"}>
            {isProcessing ? "Sí" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>isAuthenticated:</span>
          <span className={isAuthenticated ? "text-green-600" : "text-gray-500"}>
            {isAuthenticated ? "Sí" : "No"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>hasActiveUser:</span>
          <span className={hasActiveUser ? "text-green-600" : "text-gray-500"}>
            {hasActiveUser ? "Sí" : "No"}
          </span>
        </div>
        {error && (
          <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded">
            <span className="text-red-600 text-xs">Error: {error}</span>
          </div>
        )}
        {activeUser && (
          <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded">
            <span className="text-green-600 text-xs">
              Usuario: {activeUser.firstName} {activeUser.lastName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
