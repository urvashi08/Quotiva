const quoteElement = document.getElementById("quote");
const generateButton = document.getElementById("generate-button");
const copyButton = document.getElementById("copy-button");

generateButton.addEventListener("click", generateQuote);
copyButton.addEventListener("click", copyQuote);

async function generateQuote() {
    try {
        const response = await fetch("https://api.quotable.io/quotes?limit=400");
        const data = await response.json();
        
        const randomIndex = Math.floor(Math.random() * data.results.length);
        const randomQuote = data.results[randomIndex].content + " - " + data.results[randomIndex].author;
        
        quoteElement.textContent = randomQuote;
    } catch (error) {
        console.error("Error fetching quotes:", error);
        quoteElement.textContent = "Failed to fetch quotes.";
    }
}

function copyQuote() {
    const textToCopy = quoteElement.textContent;
    
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            console.log("Quote copied to clipboard:", textToCopy);
        })
        .catch((error) => {
            console.error("Error copying quote:", error);
        });
}