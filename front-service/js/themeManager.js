export class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.icon = this.themeToggle.querySelector('i');
        this.currentTheme = localStorage.getItem('theme') || 'light';

        this.init();
    }

    init() {
        if (this.currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            this.icon.classList.replace('fa-moon', 'fa-sun');
        }

        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    toggleTheme() {
        if (this.currentTheme === 'light') {
            document.body.classList.add('dark-theme');
            this.icon.classList.replace('fa-moon', 'fa-sun');
            this.currentTheme = 'dark';
        } else {
            document.body.classList.remove('dark-theme');
            this.icon.classList.replace('fa-sun', 'fa-moon');
            this.currentTheme = 'light';
        }

        localStorage.setItem('theme', this.currentTheme);
    }
}