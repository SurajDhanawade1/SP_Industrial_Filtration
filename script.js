const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  const opened = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(opened));
  menuToggle.setAttribute('aria-label', opened ? 'Close menu' : 'Open menu');
  menuToggle.textContent = opened ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
  menuToggle.textContent = '☰';
}));

const cards = [...document.querySelectorAll('.product')];
const search = document.getElementById('search');
const filterButtons = [...document.querySelectorAll('.filters button')];
let currentFilter = 'all';
function updateProducts() {
  const query = search.value.trim().toLowerCase();
  cards.forEach(card => {
    const categoryMatch = currentFilter === 'all' || card.dataset.cat === currentFilter;
    const textMatch = (card.dataset.name + ' ' + card.textContent).toLowerCase().includes(query);
    card.classList.toggle('hidden', !(categoryMatch && textMatch));
  });
}
filterButtons.forEach(button => button.addEventListener('click', () => {
  currentFilter = button.dataset.filter;
  filterButtons.forEach(b => b.classList.toggle('active', b === button));
  updateProducts();
}));
search.addEventListener('input', updateProducts);

document.querySelectorAll('[data-product]').forEach(link => link.addEventListener('click', () => {
  document.getElementById('productSelect').value = link.dataset.product;
}));
document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('enquiryForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Product Enquiry - ${data.get('product')} | SP Industrial Filtration`;
  const body = [
    `Name: ${data.get('name')}`,
    `Company: ${data.get('company') || 'Not provided'}`,
    `Work email: ${data.get('email')}`,
    `Phone: ${data.get('phone') || 'Not provided'}`,
    `Product: ${data.get('product')}`,
    '',
    'Requirement:',
    data.get('message')
  ].join('\\n');

  // Replace with the real company enquiry email before publishing.
  const businessEmail = 'YOUR-EMAIL@example.com';
  if (businessEmail === 'YOUR-EMAIL@example.com') {
    const note = document.getElementById('formNote');
    note.textContent = 'Demo only: add your real business email in script.js before publishing. The email application will then open with the enquiry prepared.';
    note.style.color = '#a14d22';
    return;
  }
  window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});
