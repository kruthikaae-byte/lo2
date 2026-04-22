document.addEventListener('DOMContentLoaded', () => {
    // Top 20 Common Currencies for Enterprise UI
    const currencies = [
        { code: 'USD', name: 'US Dollar', symbol: '$' },
        { code: 'EUR', name: 'Euro', symbol: '€' },
        { code: 'GBP', name: 'British Pound', symbol: '£' },
        { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
        { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
        { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
        { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
        { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
        { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
        { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' }
        // We'll keep it concise for the UI
    ];

    // Mock exchange rates relative to USD
    const mockRates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.79,
        JPY: 151.45,
        AUD: 1.52,
        CAD: 1.36,
        CHF: 0.90,
        CNY: 7.23,
        INR: 83.33,
        SGD: 1.35
    };

    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const form = document.getElementById('converter-form');
    const swapBtn = document.getElementById('swap-currencies');
    const resultDiv = document.getElementById('conversion-result');
    const rateText = document.getElementById('rate-text');
    const resultAmount = document.getElementById('result-amount');

    // Populate dropdowns
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        option1.value = currency.code;
        option1.textContent = `${currency.code} - ${currency.name}`;
        
        const option2 = document.createElement('option');
        option2.value = currency.code;
        option2.textContent = `${currency.code} - ${currency.name}`;

        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
    });

    // Set defaults
    fromSelect.value = 'USD';
    toSelect.value = 'EUR';

    // Swap functionality
    swapBtn.addEventListener('click', () => {
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        
        // Trigger conversion if already showing
        if (resultDiv.style.display === 'block') {
            convert();
        }
    });

    // Convert function
    function convert() {
        const amount = parseFloat(amountInput.value);
        const from = fromSelect.value;
        const to = toSelect.value;

        if (isNaN(amount) || amount <= 0) return;

        // Calculate rate (mock)
        const rate = mockRates[to] / mockRates[from];
        const converted = amount * rate;

        // Format numbers
        const formattedAmount = converted.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        const formattedRate = rate.toLocaleString('en-US', {
            minimumFractionDigits: 4,
            maximumFractionDigits: 4
        });

        // Update UI
        rateText.textContent = `1 ${from} = ${formattedRate} ${to}`;
        resultAmount.innerHTML = `${formattedAmount} <span class="result-currency">${to}</span>`;
        
        const now = new Date();
        document.getElementById('last-updated').textContent = `Updated ${now.toLocaleTimeString()}`;
        
        resultDiv.style.display = 'block';
    }

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        convert();
        
        // Add subtle animation reset
        resultDiv.style.animation = 'none';
        resultDiv.offsetHeight; /* trigger reflow */
        resultDiv.style.animation = null; 
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked if it wasn't open
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
