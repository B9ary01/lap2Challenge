
// SETUP
const btn = document.querySelector('#msg-btn');
const form = document.querySelector('#new-post-form');
const postsList = document.querySelector('table');

// Bind event listeners
form.addEventListener('submit', submitPost);

// Fetch all cats as soon as app is loaded
getAllPosts();

// ********************************************

// DOGS FLOW
// index
function getAllPosts(){
    fetch('http://localhost:3000/posts')
        .then(r => r.json() )
        .then(appendPosts )
        .catch(console.warn)

};

// create
function submitPost(e){
    e.preventDefault();

    const postData = {
        title: e.target.title.value,
        name: e.target.name.value,
        post: e.target.post.value,
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(postData),
        headers: { "Content-Type": "application/json" }
    };

    fetch('http://localhost:3000/posts', options)
        .then(r => r.json())
        .then(appendPost)
        .then(() => e.target.reset())
        .catch(console.warn)
        
};

function updatePost(id, tr){
    const options = { 
        method: 'PATCH',
    };
    fetch(`http://localhost:3000/posts/${id}`, options)
        .then(r => r.json())
        .then(data => {
            const { dog } = data
            tr.querySelectorAll('td')[1].textContent = post.age
        })
        .catch(console.warn)
}

function deletePost(id, li){
    console.log('deleting', id)
    const options = { 
        method: 'DELETE',
    };
    fetch(`http://localhost:3000/posts/${id}`, options)
        .then(li.remove())
        .catch(console.warn)
}

// helpers

function appendPosts(data){
    data.forEach(appendPost);
};

function appendPost(postData){
    const newRow = document.createElement('tr');
    const postLi = formatPostTr(postData, newRow);
    postsList.append(newRow);
};


function formatPostTr(post, tr){
    const titleTd = document.createElement('td');
    const nameTd = document.createElement('td');
    const postTd = document.createElement('td');

    const delTd = document.createElement('td');
    const uptTd = document.createElement('td');

    const delBtn = document.createElement('button');
    const uptBtn = document.createElement('button');
    delBtn.setAttribute('class', 'delete')
    uptBtn.setAttribute('class', 'update')
    delBtn.textContent = 'X';
    uptBtn.textContent = '+';

    delBtn.onclick = () => deletePost(post.id, tr);
    uptBtn.onclick = () => updatePost(post.id, tr);

    delTd.append(delBtn);
    uptTd.append(uptBtn);

    titleTd.textContent = post.title
    nameTd.textContent = post.name
    postTd.textContent = post.post

    tr.append(titleTd)
    tr.append(nameTd)
    tr.append(postTd)

    tr.append(delTd)
    tr.append(uptTd)

    return tr
}
