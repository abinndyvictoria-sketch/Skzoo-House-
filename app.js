const rooms = {
  bedroom: { title: "Quarto", desc: "Um cantinho só seu, cheio de estrelas.", caption: "✦ MEU REFÚGIO ✦", number: "01", toast: "Você entrou no quarto" },
  games: { title: "Sala de jogos", desc: "Diversão, desafios e momentos Stay.", caption: "✦ GAME ON ✦", number: "02", toast: "Bora jogar!" },
  kitchen: { title: "Cozinha", desc: "Onde as receitas mais malucas começam.", caption: "✦ STAY CAFÉ ✦", number: "03", toast: "Bem-vindo à cozinha" },
  bathroom: { title: "Banheiro", desc: "Hora de relaxar e renovar as energias.", caption: "✦ SPLASH ZONE ✦", number: "04", toast: "Hora dos cuidados" },
  yard: { title: "Quintal", desc: "Um espacinho ao ar livre para curtir.", caption: "✦ LITTLE GARDEN ✦", number: "05", toast: "Ar fresco no quintal!" }
};
const scene = document.getElementById("scene");
const toast = document.getElementById("toast");
let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
}
function setRoom(key) {
  const room = rooms[key];
  if (!room) return;
  scene.className = "scene " + key;
  document.getElementById("roomTitle").textContent = room.title;
  document.getElementById("roomDesc").textContent = room.desc;
  document.getElementById("sceneCaption").textContent = room.caption;
  document.querySelectorAll("[data-room]").forEach(button => {
    const active = button.dataset.room === key;
    if (button.classList.contains("room")) button.classList.toggle("active", active);
    if (button.closest(".bottom")) button.classList.toggle("nav-active", active);
    if (button.closest(".map-grid")) button.classList.toggle("chosen", active);
  });
  document.querySelector(".explore-title>span").innerHTML = room.number + ' <i>/ 05</i>';
  showToast(room.toast);
}
document.querySelectorAll("[data-room]").forEach(button => {
  button.addEventListener("click", () => {
    setRoom(button.dataset.room);
    const map = document.getElementById("map");
    if (map.open) map.close();
  });
});
document.getElementById("mapBtn").addEventListener("click", () => document.getElementById("map").showModal());
document.getElementById("closeMap").addEventListener("click", () => document.getElementById("map").close());
setRoom("bedroom");
