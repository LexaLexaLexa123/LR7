const postList = document.querySelector('.posts_list');
const showBtn = document.querySelector('.show_all_btn');
const creator = document.querySelector('.creator');
const avtorBtn = document.querySelector('.post-avtor');

const state = {
    posts: []
};

// Создание записи
const createPost = (post) => `
  <div class="post">
    <div class="post__wrapper">
      <h1 class="wrapper__user">${post.userId}</h1>
      <h2 class="wrapper__title">${post.title}</h2>
      <div class="wrapper__body">${post.body}</div>
    </div>
  </div>
`;

// Событие для кнопки, которая выводи все записи
showBtn.addEventListener('click', async() => {
    postList.innerHTML = "";
    await getPostRequest();
    await fillPostsList(state.posts);
});

// Событие для кнопки, которая выводит записи 1 автора
avtorBtn.addEventListener('click', async() => {
    const userId = creator.value;
    if (userId) {
        postList.innerHTML = "";

        const filteredPosts = await getFilterPostRequest(userId);
        if (filteredPosts && filteredPosts.length > 0) {
            filteredPosts.forEach((post) => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = createPost(post);
                postList.appendChild(postElement);
            });
        } else {
            postList.innerHTML = '<div class="post">Данный автор не найден. Пожалуйста, укажите другого автора</div>';
        }
    }
    }
);

// Запрос на получение всех записей
function getPostRequest() {
    return fetch('https://jsonplaceholder.typicode.com/posts?_limit=100', {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => res.json())
        .then((posts) => {
            state.posts = posts;
        });
}

// Запрос с фильтрацией по автору
function getFilterPostRequest(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return null;
            }
        });
}

// Заполнение списка записей
const fillPostsList = (posts) => {
    postList.innerHTML = "";

    if (posts.length) {
        posts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');
            postElement.innerHTML = createPost(post);
            postList.appendChild(postElement);
        });
    } else {
        postList.innerHTML = '<div class="post">Посты не найдены</div>';
    }
};