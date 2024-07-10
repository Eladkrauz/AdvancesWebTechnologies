import { articles } from '/scripts/articles.js';
import { rates } from '/scripts/exchange-rates.js';

document.addEventListener('DOMContentLoaded', () => {
    const newsContainer = document.getElementById('newsContainer');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const dropdownToggle = document.getElementById('dropdownToggle');
    const dropdown = document.getElementById('dropdown');
    let currentIndex = 0;

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                newsContainer.scrollTo({ left: newsContainer.clientWidth * currentIndex, behavior: 'smooth' });
            }
        });

        nextButton.addEventListener('click', () => {
            if (currentIndex < articles.length - 1) {
                currentIndex++;
                newsContainer.scrollTo({ left: newsContainer.clientWidth * currentIndex, behavior: 'smooth' });
            }
        });
    }

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        });

        // Close the dropdown if the user clicks outside of it
        window.addEventListener('click', () => {
            if (dropdown.style.display === 'block') {
                dropdown.style.display = 'none';
            }
        });
    }

    // Create articles
    if (articles && newsContainer) {
        articles.forEach(article => createArticle(article.title, article.date, article.summary));
    }
});

function createArticle(title, date, summary) {
    // Create article element
    const article = document.createElement('article');
    article.classList.add('min-w-full', 'bg-gray-100', 'p-4', 'rounded', 'shadow');

    // Create container div
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('flex', 'justify-between', 'items-center');

    // Create title element
    const h2 = document.createElement('h2');
    h2.classList.add('text-xl', 'font-bold');
    h2.textContent = title;

    // Create date element
    const h3 = document.createElement('h3');
    h3.classList.add('font-thin', 'mt-12');
    h3.textContent = date;

    // Append title and date to container div
    containerDiv.appendChild(h2);
    containerDiv.appendChild(h3);

    // Create summary paragraph
    const p = document.createElement('p');
    p.textContent = summary;

    // Append container div and summary to article
    article.appendChild(containerDiv);
    article.appendChild(p);

    // Append article to the news container
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.appendChild(article);
}

// Calculator script
document.getElementById('calculate').addEventListener('click', function () {
    const crypto = document.getElementById('crypto').value;
    const result = document.getElementById('result');
    const amount = document.getElementById('amountToExchange').value;

    const rateObj = rates.find(r => r.name === crypto);
    result.value = rateObj && amount != "" ? "The rate of one " + crypto + " coin is " + rateObj.rate + "$.\n" + amount + " coins of " + crypto + " value approximately " + rateObj.rate * amount + "$." : 'Unable to calculate rate';
});