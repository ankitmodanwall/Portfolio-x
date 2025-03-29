// Theme colors
export const themes = {
    blue: { primary: '#3498db', secondary: '#2980b9', accent: '#1abc9c' },
    green: { primary: '#2ecc71', secondary: '#27ae60', accent: '#16a085' },
    purple: { primary: '#9b59b6', secondary: '#8e44ad', accent: '#3498db' },
    red: { primary: '#e74c3c', secondary: '#c0392b', accent: '#d35400' },
    teal: { primary: '#1abc9c', secondary: '#16a085', accent: '#3498db' }
};

let currentTheme = 'blue';

// Initialize the application
export function initializeApp() {
    // Add event listeners
    document.getElementById('add-experience').addEventListener('click', addExperience);
    document.getElementById('add-education').addEventListener('click', addEducation);
    document.getElementById('generate-btn').addEventListener('click', generatePortfolio);
    
    // Theme selector
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', selectTheme);
    });
    
    // Initialize with one empty experience and education
    addExperience();
    addEducation();
}

// Add experience item
function addExperience() {
    const container = document.getElementById('experience-container');
    const div = document.createElement('div');
    div.className = 'experience-item';
    div.innerHTML = `
        <input type="text" placeholder="Job Title" class="exp-title">
        <input type="text" placeholder="Company" class="exp-company">
        <input type="text" placeholder="Duration (e.g., 2020-2023)" class="exp-duration">
        <textarea placeholder="Description of responsibilities and achievements" class="exp-desc"></textarea>
        <button type="button" class="remove-btn">Remove</button>
    `;
    container.appendChild(div);
    
    // Add remove functionality
    div.querySelector('.remove-btn').addEventListener('click', () => div.remove());
}

// Add education item
function addEducation() {
    const container = document.getElementById('education-container');
    const div = document.createElement('div');
    div.className = 'education-item';
    div.innerHTML = `
        <input type="text" placeholder="Degree" class="edu-degree">
        <input type="text" placeholder="Institution" class="edu-institution">
        <input type="text" placeholder="Duration (e.g., 2016-2020)" class="edu-duration">
        <button type="button" class="remove-btn">Remove</button>
    `;
    container.appendChild(div);
    
    // Add remove functionality
    div.querySelector('.remove-btn').addEventListener('click', () => div.remove());
}

// Select theme
function selectTheme(event) {
    currentTheme = event.target.dataset.theme;
    document.querySelectorAll('.theme-option').forEach(el => el.classList.remove('selected'));
    event.target.classList.add('selected');
    
    // Regenerate if portfolio exists
    if (document.getElementById('portfolio-preview').innerHTML.includes('portfolio-header')) {
        generatePortfolio();
    }
}

// Generate portfolio preview
export function generatePortfolio() {
    const name = document.getElementById('name').value || 'Your Name';
    const title = document.getElementById('title').value || 'Professional Title';
    const summary = document.getElementById('summary').value || 'A brief summary of your professional background and skills.';
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim()).filter(skill => skill);
    
    // Get experience
    const experienceItems = [];
    document.querySelectorAll('.experience-item').forEach(item => {
        experienceItems.push({
            title: item.querySelector('.exp-title').value || 'Job Title',
            company: item.querySelector('.exp-company').value || 'Company',
            duration: item.querySelector('.exp-duration').value || 'Duration',
            description: item.querySelector('.exp-desc').value || 'Description of responsibilities and achievements'
        });
    });
    
    // Get education
    const educationItems = [];
    document.querySelectorAll('.education-item').forEach(item => {
        educationItems.push({
            degree: item.querySelector('.edu-degree').value || 'Degree',
            institution: item.querySelector('.edu-institution').value || 'Institution',
            duration: item.querySelector('.edu-duration').value || 'Duration'
        });
    });
    
    // Generate HTML
    const portfolioHTML = `
        <div class="portfolio">
            <div class="portfolio-header" style="background-color: ${themes[currentTheme].primary}">
                <h1>${name}</h1>
                <p>${title}</p>
            </div>
            
            <div class="section">
                <h2>Professional Summary</h2>
                <p>${summary}</p>
            </div>
            
            ${experienceItems.length ? `
            <div class="section">
                <h2>Professional Experience</h2>
                ${experienceItems.map(exp => `
                    <div class="experience-item">
                        <h3>${exp.title} at ${exp.company}</h3>
                        <p class="date">${exp.duration}</p>
                        <p>${exp.description}</p>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${educationItems.length ? `
            <div class="section">
                <h2>Education</h2>
                ${educationItems.map(edu => `
                    <div class="education-item">
                        <h3>${edu.degree}</h3>
                        <p class="institution">${edu.institution}</p>
                        <p class="date">${edu.duration}</p>
                    </div>
                `).join('')}
            </div>
            ` : ''}
            
            ${skills.length ? `
            <div class="section">
                <h2>Skills</h2>
                <div class="skills">
                    ${skills.map(skill => `
                        <div class="skill" style="background-color: ${themes[currentTheme].accent}">${skill}</div>
                    `).join('')}
                </div>
            </div>
            ` : ''}
        </div>
    `;
    
    document.getElementById('portfolio-preview').innerHTML = portfolioHTML;
    document.getElementById('download-btn').disabled = false;
}

// Export the generatePortfolio function for download.js
export { generatePortfolio as getPortfolioHTML };