const APIURL = 'https://api.github.com/users/';

// get the user info from the API
async function getUser(userName) {

    try {
        let userNameURL = APIURL + userName;
        const response = await axios.get(userNameURL);
        // Axios automatically handles JSON conversion
        const USER = response.data;
        const USER_REPOS = await getRepos(userName);
        displayUser(USER, USER_REPOS); // calls the function to show data in the DOM
    } catch (error) {
        if (error.response) {
            console.error('Error en la respuesta:', error.response.status);
            alert('Usuario no encontrado. Verifica el nombre e inténtalo de nuevo.');
        } else if (error.request) {
            console.error('Error en la solicitud:', error.request);
            alert('No se pudo conectar con la API. Inténtalo más tarde.');
        } else {
            console.error('Error desconocido:', error.message);
            alert('Ocurrió un error. Inténtalo de nuevo.');
        }
    }
}

// get the users repos from the API
async function getRepos(userName) {
    try {
        let reposURL = APIURL + userName + '/repos';
        const response = await axios.get(reposURL);
        const USER_REPOS = response.data;
        return USER_REPOS;
    } catch (error) {
        if (error.response) {
            console.error('Error en la respuesta:', error.response.status);
            alert('Usuario no encontrado. Verifica el nombre e inténtalo de nuevo.');
        } else if (error.request) {
            console.error('Error en la solicitud:', error.request);
            alert('No se pudo conectar con la API. Inténtalo más tarde.');
        } else {
            console.error('Error desconocido:', error.message);
            alert('Ocurrió un error. Inténtalo de nuevo.');
        }
    }

}


function displayUser(user, userRepos){
    let card = document.querySelector('.card');
    card.style.display = "flex";
    let avatar = document.querySelector('.avatar');
    avatar.src = user.avatar_url;
    let userName = document.querySelector('.userName');
    userName.textContent = user.name;
    let description = document.querySelector('.description');
    if(user.bio !== null){
        description.textContent = user.bio;
    }else{
        description.style.display = "none";
    }
    let followers = document.querySelector('.followers');
    followers.textContent = `${user.followers} Followers`;
    let following = document.querySelector('.following');
    following.textContent = `${user.following} Following`;
    let reposList = document.querySelector('.resposList');
    reposList.textContent = `${user.public_repos} Repos`;

    if(userRepos.length > 0){
        userRepos.forEach(repo => {
            let repoA = document.createElement('a');
            repoA.href = repo.html_url; 
            repoA.target = "_blank";
            repoA.textContent = repo.name;
            document.querySelector('.repos').appendChild(repoA);
        })
    }
}

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents the default form submission behavior 
    let userName = document.getElementById('search').value;
    getUser(userName); 
});