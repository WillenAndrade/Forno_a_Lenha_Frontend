const feedbackList = document.getElementById('feedbackList');
const spanName = document.getElementById('spanName');
const feedContainer = document.getElementById('feedContainer');
const passMessage = document.getElementById('passMessage');
const authenticator = document.getElementById('authenticator');

let isLogged = localStorage.getItem('isLogged') === 'true';
console.log('Estado inicial de isLogged:', isLogged);

const login = async (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  
  try {
      const response = await axios.post('http://localhost:3000/login', {
          username,
          pass
      });

      alert(response.data.status); 
      
      if (response.data.status) { 
        localStorage.setItem('isLogged', 'true'); 
        isLogged = true; 
        console.log('Login bem-sucedido. isLogged:', isLogged);
        renderPassForm(); 
        renderFeedbacks(); 
    }

  } catch (error) {
      if (error.response) {
          
          alert(error.response.data); 
      } else {
          
          console.error('Error:', error.message);
          alert('Erro ao tentar fazer login. Tente novamente.');
      }
  }
};

document.getElementById('btnAcess').onclick = login;

const renderPassForm = () => {
  authenticator.style.display = isLogged ? 'none' : 'block';
};

const renderFeedbacks = () => {
  feedContainer.style.display = isLogged ? 'block' : 'none';
};

/*const renderPassMessage = () => {
  passMessage.style.display = 'none'
}
renderPassMessage*/

const fetchFeedbacks = async () => {
  try {
    const response = await axios.get('http://localhost:3000/feedback');
  
   const message = JSON.stringify(response.data.message)
  

    
    if (response.data.status && Array.isArray(response.data.message)) {
      feedbackList.innerHTML = '';
      const feedbackSize = response.data.message.length;
      spanName.innerHTML = feedbackSize
      console.log(`Número de feedbacks: ${feedbackSize}`);


      response.data.message.forEach(msg => {

        const feedbackDiv = document.createElement('div');
        feedbackDiv.className = 'feedback-item';

        const nameElement = document.createElement('h3');
        nameElement.textContent = msg.name; 

        const suggestionElement = document.createElement('p');
        suggestionElement.textContent = msg.suggestion; 

        const deleteButton = document.createElement('button');

        deleteButton.className = 'deleteButton'
        deleteButton.textContent = 'X';
        deleteButton.onclick = async () => {
          const confirmed = confirm('Tem certeza que deseja excluir este feedback?');
          if (confirmed) {
            try {
              const response = await fetch(`http://localhost:3000/feedback/${msg.id}`, {
                method: 'DELETE',
              });

              const result = await response.json();

              location.reload();
            
              if (result.status) {
                alert(result.message);
                feedbackList.removeChild(feedbackDiv); 
              } else {
                alert('Erro ao excluir feedback: ' + result.message);
              }
            } catch (error) {
              console.error('Erro ao excluir feedback:', error);
              alert('Erro ao excluir feedback.');
            }
          }
        };

        feedbackDiv.appendChild(nameElement);
        feedbackDiv.appendChild(suggestionElement);
        feedbackDiv.appendChild(deleteButton);
        feedbackList.appendChild(feedbackDiv);
      });
    } else {
      alert('Mensagem não encontrada.');
    }
    document.getElementById('feedbackForm').reset();
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
  }
};

renderPassForm();
renderFeedbacks();
fetchFeedbacks();
