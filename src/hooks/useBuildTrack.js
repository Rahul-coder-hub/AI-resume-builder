import { useState, useEffect } from 'react';

const STEPS = [
  'problem',
  'market',
  'architecture',
  'hld',
  'lld',
  'build',
  'test',
  'ship',
];

export const useBuildTrack = () => {
  const [artifacts, setArtifacts] = useState(() => {
    const saved = localStorage.getItem('rb_artifacts');
    return saved ? JSON.parse(saved) : {};
  });

  const [links, setLinks] = useState(() => {
    const saved = localStorage.getItem('rb_links');
    return saved ? JSON.parse(saved) : { lovable: '', github: '', deploy: '' };
  });

  useEffect(() => {
    localStorage.setItem('rb_artifacts', JSON.stringify(artifacts));
  }, [artifacts]);

  useEffect(() => {
    localStorage.setItem('rb_links', JSON.stringify(links));
  }, [links]);

  const saveArtifact = (stepIndex, content) => {
    const stepKey = `rb_step_${stepIndex + 1}_artifact`;
    setArtifacts(prev => ({ ...prev, [stepKey]: content }));
    // Also save individually for direct access as requested
    localStorage.setItem(stepKey, content);
  };

  const getArtifact = (stepIndex) => {
    return artifacts[`rb_step_${stepIndex + 1}_artifact`] || '';
  };

  const isStepComplete = (stepIndex) => {
    return !!artifacts[`rb_step_${stepIndex + 1}_artifact`];
  };

  const canAccessStep = (stepIndex) => {
    if (stepIndex === 0) return true;
    return isStepComplete(stepIndex - 1);
  };

  const updateLinks = (newLinks) => {
    setLinks(prev => ({ ...prev, ...newLinks }));
  };

  return {
    artifacts,
    links,
    saveArtifact,
    getArtifact,
    isStepComplete,
    canAccessStep,
    updateLinks,
    STEPS,
  };
};
