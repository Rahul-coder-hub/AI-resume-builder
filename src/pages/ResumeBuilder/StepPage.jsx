import React, { useState } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useBuildTrack } from '../../hooks/useBuildTrack';
import BuildTrackLayout from '../../components/layout/BuildTrackLayout';

const StepPage = () => {
    const { stepId } = useParams();
    const navigate = useNavigate();
    const { STEPS, canAccessStep, saveArtifact, getArtifact } = useBuildTrack();

    const stepIndex = STEPS.findIndex(s => s === stepId.split('-')[1] || s === stepId.replace(/^\d+-/, ''));
    // Handle routes like 01-problem
    const actualStepIndex = STEPS.findIndex(s => stepId.includes(s));

    if (actualStepIndex === -1) return <Navigate to="/rb/01-problem" replace />;
    if (!canAccessStep(actualStepIndex)) return <Navigate to="/rb/01-problem" replace />;

    const [artifactContent, setArtifactContent] = useState(getArtifact(actualStepIndex));

    const handleSave = () => {
        saveArtifact(actualStepIndex, artifactContent);
        // Enable next button logic is handled by hook's state update which will re-render
    };

    const handleNext = () => {
        if (actualStepIndex < STEPS.length - 1) {
            const nextStep = STEPS[actualStepIndex + 1];
            const nextStepId = `0${actualStepIndex + 2}-${nextStep}`.replace('09', '09').replace('010', '10'); // Basic padding
            navigate(`/rb/${nextStepId.padStart(11, '0').slice(-11)}`); // Quick fix for 01-08

            // More robust navigate:
            const formattedNextIndex = String(actualStepIndex + 2).padStart(2, '0');
            navigate(`/rb/${formattedNextIndex}-${nextStep}`);
        } else {
            navigate('/rb/proof');
        }
    };

    const stepTitles = [
        "Identify the Problem",
        "Market Research",
        "System Architecture",
        "High-Level Design",
        "Low-Level Design",
        "The Build Phase",
        "Test & Quality",
        "Ship & Deploy"
    ];

    const stepDescriptions = [
        "Define the core pain point your AI Resume Builder solves.",
        "Analyze the competition and define your unique value proposition.",
        "Map out the technical architecture of your application.",
        "Design the major components and data flow.",
        "Define specific classes, functions, and database schemas.",
        "Implement the core features and the design system.",
        "Verify functionality and ensure a bug-free experience.",
        "Push to production and share your creation with the world."
    ];

    return (
        <BuildTrackLayout
            title={stepTitles[actualStepIndex]}
            description={stepDescriptions[actualStepIndex]}
            stepNumber={actualStepIndex + 1}
            totalSteps={STEPS.length}
            artifactContent={artifactContent}
            onArtifactChange={setArtifactContent}
            onSave={handleSave}
            onNext={handleNext}
            isNextDisabled={!artifactContent.trim()}
        >
            <div className="prose prose-indigo max-w-none">
                <h2>{stepTitles[actualStepIndex]}</h2>
                <p className="text-gray-600 text-lg">
                    {stepDescriptions[actualStepIndex]}
                </p>
                <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-100">
                    <h4 className="text-indigo-900 font-bold mb-2">Step Objective</h4>
                    <p className="text-indigo-800">
                        Complete the artifact in the right panel to proceed to the next step.
                        Ensure your documentation is thorough and matches the project requirements.
                    </p>
                </div>
            </div>
        </BuildTrackLayout>
    );
};

export default StepPage;
