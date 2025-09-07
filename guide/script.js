let data = null;
const logoContainer = document.getElementById("logo");
const content = document.getElementById("content");

async function loadData() {
  try {
    const res = await fetch("data.json");
    data = await res.json();

    // 로고 표시
    if (data.logo) {
      logoContainer.innerHTML = `<img src="${data.logo}" alt="Logo">`;
    }

    renderQuestion(1);
  } catch (e) {
    content.innerHTML = "<p>데이터를 불러올 수 없습니다 ❌</p>";
    console.error(e);
  }
}

function renderQuestion(id) {
  const q = data.questions.find((q) => q.id === id);
  content.innerHTML = `
    <div class="card">
      <h2>${q.text}</h2>
      ${q.answers
        .map(
          (ans) => `
        <button onclick="handleAnswer('${ans.nextId}')">${ans.text}</button>
      `
        )
        .join("")}
    </div>
  `;
}

function renderResult(id) {
  const result = data.results.find((r) => r.id === id);
  content.innerHTML = `
    <div class="card">
      <h2>${result.text}</h2>
      <button onclick="restart()">다시하기</button>
    </div>
  `;
}

function handleAnswer(nextId) {
  if (isNaN(nextId)) {
    renderResult(nextId);
  } else {
    renderQuestion(Number(nextId));
  }
}

function restart() {
  renderQuestion(1);
}

// 앱 시작
loadData();
