document.addEventListener("DOMContentLoaded", () => {
    const updateDateTime = () => {
      const now = new Date();
      const dateTimeString = now.toLocaleString();
      document.getElementById("current-date-time").textContent = dateTimeString;
    };
  
    // Update every second
    setInterval(updateDateTime, 1000);
    updateDateTime();
  });

const toggle = document.getElementById('darkToggleCheckbox');

toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }
});

