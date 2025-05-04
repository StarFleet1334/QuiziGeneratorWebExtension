export class CategoryManager {
    static displayCategories(categories) {
        const categoriesContainer = document.getElementById('categories-container');
        categoriesContainer.innerHTML = '';

        if (Array.isArray(categories) && categories.length > 0) {
            const ul = this.createCategoryList(categories);
            categoriesContainer.appendChild(ul);
        } else {
            this.showNoCategories(categoriesContainer);
        }
    }

    static createCategoryList(categories) {
        const ul = document.createElement('ul');
        ul.className = 'categories-list';

        categories.forEach(category => {
            const li = this.createCategoryItem(category);
            ul.appendChild(li);
        });

        return ul;
    }

    static createCategoryItem(category) {
        const li = document.createElement('li');
        li.className = 'category-item';

        const button = document.createElement('button');
        button.className = 'category-button';
        button.textContent = category;
        button.addEventListener('click', () => this.handleCategorySelect(category));

        li.appendChild(button);
        return li;
    }

    static handleCategorySelect(category) {
        console.log(`Selected category: ${category}`);
    }

    static showNoCategories(container) {
        const message = document.createElement('p');
        message.className = 'no-categories';
        message.textContent = 'No categories available';
        container.appendChild(message);
    }
}