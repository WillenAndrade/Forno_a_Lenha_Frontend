window.onload = function() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth' 
    });
};

    document.getElementById('feedbackForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const name = document.getElementById('name').value;
    const suggestion = document.querySelector('.suggestion-text').value;

    try {
        const response = await axios.post('http://localhost:3000/feedback', {
            name: name,
            suggestion: suggestion
        });

        alert(response.data.message); // Exibe uma mensagem de sucesso
        document.getElementById('feedbackForm').reset(); // Limpa o formulário

    } catch (error) {
        alert('Erro ao enviar o feedback.');
        console.error(error);
    }
});
