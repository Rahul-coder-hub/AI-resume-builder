export const convertToPlainText = (data) => {
    if (!data) return '';

    const { personalInfo, summary, education, experience, projects, skills, links } = data;

    let text = '';

    // Header
    text += `${personalInfo.name || 'YOUR NAME'}\n`;
    text += `${personalInfo.email ? `Email: ${personalInfo.email}` : ''}`;
    text += `${personalInfo.phone ? ` | Phone: ${personalInfo.phone}` : ''}`;
    text += `${personalInfo.location ? ` | Location: ${personalInfo.location}` : ''}\n`;

    if (links.github || links.linkedin) {
        text += (links.github ? `GitHub: ${links.github} ` : '') + (links.linkedin ? `| LinkedIn: ${links.linkedin}` : '') + '\n';
    }

    text += '\n' + '='.repeat(40) + '\n\n';

    // Summary
    if (summary) {
        text += `SUMMARY\n${summary}\n\n`;
    }

    // Experience
    if (experience && experience.length > 0) {
        text += `EXPERIENCE\n`;
        experience.forEach(exp => {
            text += `${exp.role} | ${exp.company} | ${exp.duration}\n`;
            if (exp.description) {
                text += `${exp.description}\n`;
            }
            text += '\n';
        });
    }

    // Projects
    if (projects && projects.length > 0) {
        text += `PROJECTS\n`;
        projects.forEach(proj => {
            text += `${proj.title}\n`;
            if (proj.description) {
                text += `${proj.description}\n`;
            }
            text += '\n';
        });
    }

    // Education
    if (education && education.length > 0) {
        text += `EDUCATION\n`;
        education.forEach(edu => {
            text += `${edu.degree} | ${edu.school} | ${edu.year}\n`;
        });
        text += '\n';
    }

    // Skills
    if (skills) {
        text += `TECHNICAL SKILLS\n`;
        if (skills.technical?.length > 0) text += `Technical: ${skills.technical.join(', ')}\n`;
        if (skills.soft?.length > 0) text += `Soft Skills: ${skills.soft.join(', ')}\n`;
        if (skills.tools?.length > 0) text += `Tools: ${skills.tools.join(', ')}\n`;
    }

    return text.trim();
};
