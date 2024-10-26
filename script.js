const successMessage = document.getElementById('successMessage');
const nameInput = document.querySelector('.name-input');
const suggestionText = document.querySelector('.suggestion-text');
const btnSubmit = document.querySelector('.btn-submit');

window.onload = function() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' 
    });
};

    document.getElementById('feedbackForm').addEventListener('submit', async (event) => {
        event.preventDefault();
    const name = document.getElementById('name').value;
    const suggestion = document.querySelector('.suggestion-text').value;
    
    try {
        const response = await axios.post('http://localhost:3000/feedback', {
            name: name,
            suggestion: suggestion
        }, {
                    headers: {
                        'Content-Type': 'application/json' 
                    }
                })
                
                const data = response.data 
                console.log(response.data)

                successMessage.textContent = 'Sugestão enviada com sucesso!';
                successMessage.classList.remove('hidden');
                nameInput.style.display = 'none';
                suggestionText.style.display = 'none';
                btnSubmit.style.display = 'none';

    } catch (error) {
        alert('Erro ao enviar o feedback.');
        console.error(error);
    }
});
