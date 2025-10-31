const input = document.getElementById('text');
const saveBtn = document.getElementById('save');
const list = document.getElementById('list');

const savedItems = JSON.parse(localStorage.getItem('clipboardItems')) || [];
savedItems.forEach(addItemToList);

saveBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if (text === '') return;

  addItemToList(text);
  savedItems.push(text);
  localStorage.setItem('clipboardItems', JSON.stringify(savedItems));
  input.value = '';
});

function addItemToList(text) {
  const li = document.createElement('li');
  li.textContent = text;

  li.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(text);
      li.classList.add('copied');
      li.textContent = `✅ Copied: ${text}`;
      setTimeout(() => {
        li.classList.remove('copied');
        li.textContent = text;
      }, 1000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  });

  list.appendChild(li);
}
