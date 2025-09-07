
    let data = [];
    let index = 0;
    let currentCategory = '';
    let isReversed = false;
    let belumTauList = [];
    let currentVisibleIndex = null;
    let isShowingContinue = false;

    function getNamaKategori(kategori) {
  switch(kategori) {
    case 'SatuEpstopik2024': return "Kategori: Part 1";
    case 'DuaEpstopik2024': return "Kategori: Part 2";
    case 'TigaEpstopik2024': return "Kategori: Part 3";
    case 'EmpatEpstopik2024': return "Kategori: Part 4";
    case 'LimaEpstopik2024': return "Kategori: Part 5";
    case 'semua': return "Kategori: Acak Semua";
    default: return "";
  }
}

function getShuffledDataByCategory(category) {
  if (category === 'semua') {
    return shuffleArray([
      ...database.SatuEpstopik2024,
      ...database.DuaEpstopik2024,
      
    ]);
  } else {
    return shuffleArray([...database[category]]);
  }
}
    
    function startGame(category) {
  currentCategory = category;
  data = [];
data = getShuffledDataByCategory(category);
  
  document.getElementById("judulKategori").textContent = getNamaKategori(category);
  index = 0;
  showElement("game");
  showQuestion();
}

    
    
    function showQuestion() {
    const q = data[index];
    const soal = isReversed ? q.answer : q.question;
    const jawaban = isReversed ? q.question : q.answer;

    document.getElementById("question").innerHTML = `
      <div id="nomorSoal">Soal ${index + 1} dari ${data.length}:</div>
      <div id="isiSoal">${soal}</div>
    `;
    document.getElementById("answer").style.opacity = "0";
    document.getElementById("answer").style.visibility = "hidden";
    document.getElementById("answer").textContent = `${jawaban}`;
    document.getElementById("idJawaban").style.display = "block";
    document.getElementById("idSelanjutnya").style.display = "none";
    document.getElementById("judulWeb").style.display = "none";
    document.getElementById("judulKategori").style.display = "block";
    document.getElementById("belumTauBtn").style.display = "none";
    document.getElementById("belumTauBtn").style.backgroundColor = "#ff4d4d";
    document.getElementById("belumTauBtn").style.color = "#000000";

    
    document.getElementById("belumTauBtn").disabled = false;
    document.getElementById("belumTauBtn").textContent = "Belum Tau";
  }

    function showAnswer() {
      document.getElementById("belumTauBtn").style.display = "block";
      document.getElementById("answer").style.opacity = "1";
      document.getElementById("answer").style.visibility = "visible";
      document.getElementById("idJawaban").style.display = "none";
      document.getElementById("idSelanjutnya").style.display = "block";
    }

    function nextQuestion() {
    index++;
    if (index < data.length) {
      showQuestion();
    } else {
      showEndScreen();
    }
  }
  
  function showEndScreen() {
    showElement("end-screen");
    if (belumTauList.length > 0) {
      document.getElementById("belumTauTableWrapper").style.display = "block";
      document.getElementById("allHafalText").style.display = "none";

      const tbody = document.getElementById("belumTauTableBody");
      tbody.innerHTML = "";
      belumTauList.forEach((item, i) => {
  tbody.innerHTML += `
    <tr>
      <td>${i + 1}</td>
      <td>${item.soal}</td>
      <td><span class="blurred" id="jawaban-${i}">${item.jawaban}</span></td>
      <td><button id="btn-${i}" onclick="toggleJawaban(${i})">Tampilkan Jawaban</button></td>
    </tr>`;
});
    } else {
      document.getElementById("belumTauTableWrapper").style.display = "none";
      document.getElementById("allHafalText").style.display = "block";
    }
  }
  
  
function toggleJawaban(index) {
  const spans = document.querySelectorAll('[id^="jawaban-"]');
  const buttons = document.querySelectorAll('[id^="btn-"]');

  // Jika klik yang sama
  if (currentVisibleIndex === index) {
    // Blur lagi
    document.getElementById(`jawaban-${index}`).classList.add('blurred');
    document.getElementById(`btn-${index}`).textContent = "Tampilkan Jawaban";
    currentVisibleIndex = null;
  } else {
    // Blur semua jawaban & reset semua tombol
    spans.forEach(span => span.classList.add('blurred'));
    buttons.forEach(btn => btn.textContent = "Tampilkan Jawaban");

    // Tampilkan jawaban yg diklik
    document.getElementById(`jawaban-${index}`).classList.remove('blurred');
    document.getElementById(`btn-${index}`).textContent = "Samarkan";
    currentVisibleIndex = index;
  }
}
  
  function latihLagi() {
  data = shuffleArray(belumTauList.map(item => ({
    question: isReversed ? item.jawaban : item.soal,
    answer: isReversed ? item.soal : item.jawaban
  })));
  index = 0;
  belumTauList = [];
  showElement("game");
  showQuestion();
}

    function restartGame() {
  data = []; // ← Reset manual (opsional)
  data = getShuffledDataByCategory(currentCategory);
  index = 0;
  belumTauList = [];
  showElement("game");
  showQuestion();
}

    function goToMenu() {
    showElement("menu");
    document.getElementById("judulWeb").style.display = "block";
    document.getElementById("judulKategori").style.display = "none";
    belumTauList = [];
    showSavedProgress();
    setEqualHeight(); // ← tambahan ini
}
  
    function updateToggleState() {
  isReversed = document.getElementById("reverseToggle").checked;
}

    function showElement(idToShow) {
      ["menu", "game", "end-screen"].forEach(id => {
        document.getElementById(id).style.display = id === idToShow ? "block" : "none";
      });
    }

    function shuffleArray(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    
    function tandaiBelumTau() {
    const q = data[index];
    const soal = isReversed ? q.answer : q.question;
    const jawaban = isReversed ? q.question : q.answer;
    belumTauList.push({ soal, jawaban });
    document.getElementById("belumTauBtn").disabled = true;
    document.getElementById("belumTauBtn").textContent = "Ditandai";
    document.getElementById("belumTauBtn").style.backgroundColor = "#5e5e5e";
    document.getElementById("belumTauBtn").style.color = "#ffffff";
    
  }
  
  function saveProgress() {
  const saveData = {
    category: currentCategory,
    index: index,
    timestamp: new Date().toISOString(),
    data: data,
    belumTauList: belumTauList,
  };

  let allSaves = JSON.parse(localStorage.getItem("quizSaves")) || [];
  allSaves.push(saveData);
  localStorage.setItem("quizSaves", JSON.stringify(allSaves));

  alert("Progress berhasil disimpan!");
  goToMenu();
}

function showSavedProgress() {
  const container = document.getElementById("continueList");
  container.innerHTML = "";
  const saves = JSON.parse(localStorage.getItem("quizSaves")) || [];

  if (saves.length === 0) {
    container.innerHTML = "<p>Tidak ada progress tersimpan.</p>";
    return;
  }

  saves.forEach((save, i) => {
    const date = new Date(save.timestamp).toLocaleString("id-ID");
    const namaKategori = getNamaKategori(save.category);
    const soalNow = `Soal ${save.index + 1} dari ${save.data.length}`;
    
    const div = document.createElement("div");
    div.innerHTML = `
      <p>${namaKategori} | ${soalNow} | ${date}</p>
      <button onclick="loadSavedProgress(${i})">➤ Mulai</button>
      <hr/>
    `;
    container.appendChild(div);
  });
}

function loadSavedProgress(indexSave) {
  const saves = JSON.parse(localStorage.getItem("quizSaves")) || [];
  const save = saves[indexSave];

  currentCategory = save.category;
  data = save.data;
  index = save.index;
  belumTauList = save.belumTauList || [];

  showElement("game");
  showQuestion();
}

function loadSavedProgress(indexSave) {
  let saves = JSON.parse(localStorage.getItem("quizSaves")) || [];
  const save = saves[indexSave];

  // hapus dari array
  saves.splice(indexSave, 1);
  localStorage.setItem("quizSaves", JSON.stringify(saves));

  currentCategory = save.category;
  data = save.data;
  index = save.index;
  belumTauList = save.belumTauList || [];

  showElement("game");
  showQuestion();
}



function toggleContinue() {
  const continueList = document.getElementById("continueList");
  const buttons = document.querySelectorAll("#menu button");

  isShowingContinue = !isShowingContinue;
  continueList.style.display = isShowingContinue ? "block" : "none";

  buttons.forEach(button => {
    if (!button.textContent.includes("Continue")) {
      document.getElementById("tabelMenu").style.display = isShowingContinue ? "none" : "grid";
    }
  });

  if (isShowingContinue) {
    showSavedProgress();

    // Tambahkan tombol Clear Storage
    const clearBtn = document.createElement("button");
    clearBtn.textContent = "🗑 Clear Storage";
    clearBtn.onclick = function () {
      if (confirm("Yakin mau hapus semua progress?")) {
        localStorage.clear();
        showSavedProgress(); // refresh daftar
      }
    };
    continueList.appendChild(clearBtn);
} else {
    setEqualHeight(); // ← ini jalan ketika balik ke menu tombol
}
}

function setEqualHeight() {
  const buttons = document.querySelectorAll('#tabelMenu button');
  let maxHeight = 0;

  // reset tinggi dulu biar pengukuran akurat
  buttons.forEach(btn => btn.style.height = 'auto');

  // cari tinggi terbesar
  buttons.forEach(btn => {
    if (btn.offsetHeight > maxHeight) {
      maxHeight = btn.offsetHeight;
    }
  });

  // set semua tombol jadi sama tinggi
  buttons.forEach(btn => btn.style.height = maxHeight + 'px');
}

// jalanin saat halaman selesai dimuat
window.addEventListener('load', setEqualHeight);
// jalanin saat ukuran layar berubah
window.addEventListener('resize', setEqualHeight);

document.addEventListener("DOMContentLoaded", function () {
  
  const kode = [114, 117, 108, 100, 97, 102, 110, 32, 106, 105, 97, 105, 104];

  
  const urut = [10, 8, 9, 7, 6, 1, 0, 5, 4, 3, 11, 2, 10, 12];

  
  let nama = urut.map(i => String.fromCharCode(kode[i])).join("");

  
  const f = document.createElement("footer");
  f.innerHTML = "" + nama;
  f.style.textAlign = "center";
  f.style.marginTop = "20px";
  document.body.appendChild(f);

  
  setInterval(() => {
    if (!document.body.contains(f)) {
      document.body.appendChild(f);
    }
  }, 2000);
});

function downloadBelumTau() {
  if (belumTauList.length === 0) {
    alert("Tidak ada data 'Belum Tau' untuk diunduh.");
    return;
  }

  // Format JSON per baris
  let content = belumTauList
    .map(item => `{ "question": "${item.soal}", "answer": "${item.jawaban}" },`)
    .join("\n");

  // Buat blob file
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  // Buat link download
  const a = document.createElement("a");
  a.href = url;
  a.download = "belum_tau.txt"; // nama file
  document.body.appendChild(a);
  a.click();

  // Bersihkan
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

    // Start at menu
    showElement("menu");