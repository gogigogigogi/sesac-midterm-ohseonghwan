/* 1. https://jsonplaceholder.typicode.com/todos 로부터 데이터를 불러와서 추가해주는 함수 getTodos() 선언 */
// getTodos()는 추후에 HTML DOM 내용이 완전히 로드되었을 때 실행되어야 합니다.
async function getTodos() {
  const result = await axios({
    url: 'https://jsonplaceholder.typicode.com/todos',
    method: 'get',
  });

  const todoList = result.data.slice(0, 10);
  const todoContainer = document.querySelector('.todoContainer');

  for (let i = 0; i < todoList.length; i++) {
    // 태그 생성
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    const title = document.createElement('div');
    const deleteBtn = document.createElement('button');

    // li 속성 추가
    li.setAttribute('data-id', `${result.data[i].id}`);

    // 체크박스 속성 추가
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('click', changeCheckBox);

    // 타이틀 속성 추가
    title.innerText = result.data[i].title;

    // 삭제버튼 속성 추가
    deleteBtn.innerText = 'X';
    deleteBtn.addEventListener('click', () => {
      deleteTodo(result.data[i].id);
    });

    // 태그 렌더링
    li.append(checkbox, title, deleteBtn);
    todoContainer.append(li);
  }
}

/* 
  2. 새로운 입력창의 Todo를 Todo 목록에 추가하고, 입력창을 초기화합니다.
  - 공백이나 빈 문자열의 경우 추가될 수 없습니다.
  - 작성 버튼 클릭 시 addTodo() 함수가 실행됩니다.
  - 입력 창에서 Enter 키 입력시에도 addTodo() 함수가 실행됩니다.
*/
function addTodo(event) {
  const todoContainer = document.querySelector('.todoContainer');
  const newTitle = document.querySelector('.input-title');

  // 공백, 빈 문자열 검증
  if (!newTitle.value.trim().length) {
    return alert('내용을 입력해주세요.');
  }

  // 태그 생성
  const li = document.createElement('li');
  const checkbox = document.createElement('input');
  const title = document.createElement('div');
  const deleteBtn = document.createElement('button');

  // li 속성 추가
  const childCount = todoContainer.childElementCount;
  li.setAttribute('data-id', `${childCount + 1}`);

  // 체크박스 속성 추가
  checkbox.setAttribute('type', 'checkbox');
  checkbox.addEventListener('click', changeCheckBox);

  // 타이틀 속성 추가
  title.innerText = newTitle.value;

  // 삭제버튼 속성 추가
  deleteBtn.innerText = 'X';
  deleteBtn.addEventListener('click', () => {
    deleteTodo(childCount + 1);
  });

  // 태그 렌더링
  li.append(checkbox, title, deleteBtn);
  todoContainer.append(li);

  // 입력창 초기화
  newTitle.value = '';
}

/*  3. x 버튼을 클릭하면 클릭한 버튼을 갖는 Todo 항목이 삭제됩니다. */
// 삭제 함수의 이름 및 모양 변경 가능
function deleteTodo(item) {
  const deleteTag = document.querySelector(`[data-id="${item}"]`);
  deleteTag.remove();
}

/* 
 4. Todo 목록 불러오기,  
 - GET https://jsonplaceholder.typicode.com/todos 요청의 응답 결과에서 맨 처음부터 10개의 원소만 잘라내어 
   투두 목록에 초기 Todo를 표시해야 합니다.
 - HTML 문서의 DOM 내용이 완전히 로드되었을 때 실행됩니다.
 - 따로 함수를 만들어도 좋고, 함수를 만들지 않아도 좋습니다.
*/

document.addEventListener('DOMContentLoaded', getTodos());

function changeCheckBox(event) {
  const title = event.target.nextSibling;
  if (event.target.checked == false) {
    title.classList.toggle('active');
    title.classList.toggle('inactive');
  } else {
    title.classList.toggle('active');
    title.classList.toggle('inactive');
  }
}
