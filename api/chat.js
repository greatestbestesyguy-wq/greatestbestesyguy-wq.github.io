async function fetchAI(promptText, isEdit = false, savePrompt = "") {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => btn.disabled = true);
    startTimers();

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // This line sends the text to your chat.js 'prompt' variable
            body: JSON.stringify({ prompt: promptText }) 
        });

        const data = await response.json();
        
        // If the server sends an error (like 'Prompt is required'), show it
        if (data.error) throw new Error(data.error.message || data.error);

        // Dig into the Gemini data structure to find the code
        let generatedHtml = data.candidates[0].content.parts[0].text;
        
        // Clean up the code and show the preview
        generatedHtml = generatedHtml.replace(/```html\n?/gi, '').replace(/```\n?/gi, '').trim();
        currentHtmlCode = generatedHtml;
        document.getElementById('preview').srcdoc = currentHtmlCode;
        
        document.getElementById('output-card').style.display = 'block';
        document.getElementById('edit-section').style.display = 'block';
        document.getElementById('edit-prompt').value = '';

        saveToHistory(savePrompt || promptText, currentHtmlCode);

    } catch (error) {
        alert("API Error: " + error.message);
        console.error(error);
    } finally {
        buttons.forEach(btn => btn.disabled = false);
        stopTimers();
    }
}
