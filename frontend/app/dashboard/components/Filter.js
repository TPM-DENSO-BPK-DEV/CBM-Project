import React from 'react';

const Filter = ({ nodeId, onNodeIdChange, currentType, onCurrentTypeChange, timeRange, onTimeRangeChange, customDateRange, onCustomDateRangeChange }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center">
          <label htmlFor="node-id" className="mr-2">Node ID:</label>
          <select
            id="node-id"
            value={nodeId}
            onChange={onNodeIdChange}
            className="border rounded p-2"
          >
            <option value="all">All Nodes</option>
            <option value="0002">0002</option>
            <option value="0003">0003</option>
            <option value="0004">0004</option>
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="current-type" className="mr-2">Current Type:</label>
          <select
            id="current-type"
            value={currentType}
            onChange={onCurrentTypeChange}
            className="border rounded p-2"
          >
            <option value="peak">Peak Current</option>
            <option value="average">Average Current</option>
          </select>
        </div>
        <div className="flex items-center">
          <label htmlFor="time-range" className="mr-2">Time Range:</label>
          <select
            id="time-range"
            value={timeRange}
            onChange={onTimeRangeChange}
            className="border rounded p-2"
          >
            <option value="15m">Last 15 minutes</option>
            <option value="30m">Last 30 minutes</option>
            <option value="1h">Last 1 hour</option>
            <option value="2h">Last 2 hours</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        {timeRange === 'custom' && (
          <>
            <div className="flex items-center">
              <label htmlFor="start-date" className="mr-2">Start:</label>
              <input
                type="datetime-local"
                id="start-date"
                value={customDateRange.start}
                onChange={(e) => onCustomDateRangeChange('start', e.target.value)}
                className="border rounded p-2"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="end-date" className="mr-2">End:</label>
              <input
                type="datetime-local"
                id="end-date"
                value={customDateRange.end}
                onChange={(e) => onCustomDateRangeChange('end', e.target.value)}
                className="border rounded p-2"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Filter;