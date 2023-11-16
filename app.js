'use strict';

// 文字列をオブジェクトに変換してローカルストレージに保存している
const savedItem = JSON.parse(localStorage.getItem('items')) || [];

// アイテムを表示させて保存
function displayItems() {
  const itemList = document.querySelector('#itemList');
  itemList.textContent = '';

  savedItem.forEach((item, index) => {
    const li = document.createElement('li');

    if (item.strikethrough) {
      li.style.textDecoration = 'line-through';
    } else {
      li.style.textDecoration = 'none';
    }

    li.innerHTML = `
    <input type="checkbox" id="strike${index}" ${item.strikethrough ? 'checked' : ''}> ${item.text}
    <button onclick="removeItem(${index})">削除</button>`;

    itemList.appendChild(li);

    const checkbox = li.querySelector(`#strike${index}`);

    checkbox.addEventListener('change', () => {
      item.strikethrough = checkbox.checked;
      saveItem(); // 修正: saveItem 関数を呼ぶ
      if (item.strikethrough) {
        li.style.textDecoration = 'line-through';
      } else {
        li.style.textDecoration = 'none';
      }
    });
  });
}

// アイテムを追加して保存
function addItem() {
  const itemInput = document.querySelector('#item');
  const itemText = itemInput.value.trim();

  if (itemText !== '') {
    savedItem.push({
      text: itemText,
      strikethrough: false,
    });
    saveItem(); // 修正: saveItem 関数を呼ぶ
    itemInput.value = '';
    displayItems();
  }
}

// リストの削除をポップアップで表示して削除する
function removeItem(index) {
  if (confirm('このリストを削除しても大丈夫？')) {
    savedItem.splice(index, 1);
    saveItem(); // 修正: saveItem 関数を呼ぶ
    displayItems();
  }
}

// オブジェクトを文字列に変換してローカルストレージに保存する
function saveItem() {
  localStorage.setItem('items', JSON.stringify(savedItem));
}

// 取消線をリセットする
function removeStrikethrough() {
  savedItem.forEach(item => {
    item.strikethrough = false;
  });
  saveItem(); // 修正: saveItem 関数を呼ぶ
  displayItems();
}

displayItems();