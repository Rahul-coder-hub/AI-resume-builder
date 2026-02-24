import { useState, useCallback } from 'react';

const INITIAL_DATA = {
    personalInfo: {
        name: '',
        email: '',
        phone: '',
        location: '',
    },
    summary: '',
    education: [],
    experience: [],
    projects: [],
    skills: '',
    links: {
        github: '',
        linkedin: '',
    },
};

const SAMPLE_DATA = {
    personalInfo: {
        name: 'Rahul Coder',
        email: 'rahul@example.com',
        phone: '+91 98765 43210',
        location: 'Bangalore, India',
    },
    summary: 'Passionate software developer with 3+ years of experience in building scalable web applications using React and Node.js. Expertise in full-stack development and UI/UX design.',
    education: [
        { school: 'KodNest University', degree: 'B.Tech in Computer Science', year: '2019-2023' },
    ],
    experience: [
        { company: 'Tech Solutions', role: 'Frontend Developer', duration: '2023 - Present', description: 'Developing premium web interfaces and optimizing performance.' },
        { company: 'Code Crafters', role: 'Junior Intern', duration: '2022-2023', description: 'Assisted in building responsive dashboards.' },
    ],
    projects: [
        { title: 'AI Portfolio Builder', description: 'An automated platform for generating developer portfolios.' },
        { title: 'Task Manager Pro', description: 'A collaborative tool for team project management.' },
    ],
    skills: 'React, Javascript, Node.js, Tailwind CSS, PostgreSQL, Git',
    links: {
        github: 'https://github.com/rahul-coder',
        linkedin: 'https://linkedin.com/in/rahul-coder',
    },
};

export const useResumeData = () => {
    const [resumeData, setResumeData] = useState(() => {
        const saved = localStorage.getItem('ai_resume_data');
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });

    const updatePersonalInfo = useCallback((info) => {
        setResumeData(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, ...info } }));
    }, []);

    const updateSummary = useCallback((summary) => {
        setResumeData(prev => ({ ...prev, summary }));
    }, []);

    const addEducation = useCallback(() => {
        setResumeData(prev => ({ ...prev, education: [...prev.education, { school: '', degree: '', year: '' }] }));
    }, []);

    const updateEducation = useCallback((index, field, value) => {
        setResumeData(prev => {
            const newEdu = [...prev.education];
            newEdu[index] = { ...newEdu[index], [field]: value };
            return { ...prev, education: newEdu };
        });
    }, []);

    const addExperience = useCallback(() => {
        setResumeData(prev => ({ ...prev, experience: [...prev.experience, { company: '', role: '', duration: '', description: '' }] }));
    }, []);

    const updateExperience = useCallback((index, field, value) => {
        setResumeData(prev => {
            const newExp = [...prev.experience];
            newExp[index] = { ...newExp[index], [field]: value };
            return { ...prev, experience: newExp };
        });
    }, []);

    const addProject = useCallback(() => {
        setResumeData(prev => ({ ...prev, projects: [...prev.projects, { title: '', description: '' }] }));
    }, []);

    const updateProject = useCallback((index, field, value) => {
        setResumeData(prev => {
            const newProjects = [...prev.projects];
            newProjects[index] = { ...newProjects[index], [field]: value };
            return { ...prev, projects: newProjects };
        });
    }, []);

    const updateSkills = useCallback((skills) => {
        setResumeData(prev => ({ ...prev, skills }));
    }, []);

    const updateLinks = useCallback((links) => {
        setResumeData(prev => ({ ...prev, links: { ...prev.links, ...links } }));
    }, []);

    const loadSampleData = useCallback(() => {
        setResumeData(SAMPLE_DATA);
    }, []);

    const saveToLocalStorage = useCallback(() => {
        localStorage.setItem('ai_resume_data', JSON.stringify(resumeData));
    }, [resumeData]);

    return {
        resumeData,
        updatePersonalInfo,
        updateSummary,
        addEducation,
        updateEducation,
        addExperience,
        updateExperience,
        addProject,
        updateProject,
        updateSkills,
        updateLinks,
        loadSampleData,
        saveToLocalStorage,
    };
};
