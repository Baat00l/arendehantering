const API_URL = 'http://localhost:3000/tickets';

const form = document.getElementById('ticket-form');
const ticketsContainer = document.getElementById('tickets-container');
const resetBtn = document.getElementById('reset-btn');

const idInput = document.getElementById('ticket-id');
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const statusSelect = document.getElementById('status');

async function fetchTickets() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    renderTickets(data);
  } catch (err) {
    console.log('Error fetching tickets', err);
  }
}

function renderTickets(tickets) {
  ticketsContainer.innerHTML = '';

  if (!tickets.length) {
    ticketsContainer.innerHTML = '<p>Inga ärenden ännu.</p>';
    return;
  }

  tickets.forEach(ticket => {
    const card = document.createElement('div');
    card.className = 'ticket-card';

    const header = document.createElement('div');
    header.className = 'ticket-header';

    const titleEl = document.createElement('h3');
    titleEl.textContent = `#${ticket.id} – ${ticket.title}`;

    const statusEl = document.createElement('span');
    statusEl.className = `ticket-status status-${ticket.status}`;
    statusEl.textContent = ticket.status;

    header.appendChild(titleEl);
    header.appendChild(statusEl);

    const descEl = document.createElement('p');
    descEl.textContent = ticket.description;

    const metaEl = document.createElement('p');
    metaEl.style.fontSize = '0.8rem';
    metaEl.textContent = `Skapad: ${new Date(ticket.created_at).toLocaleString()}`;

    const actions = document.createElement('div');
    actions.className = 'ticket-actions';

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Redigera';
    editBtn.addEventListener('click', () => fillFormForEdit(ticket));

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Ta bort';
    deleteBtn.style.background = '#ef4444';
    deleteBtn.style.color = '#fff';
    deleteBtn.addEventListener('click', () => deleteTicket(ticket.id));

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    card.appendChild(header);
    card.appendChild(descEl);
    card.appendChild(metaEl);
    card.appendChild(actions);

    ticketsContainer.appendChild(card);
  });
}

function fillFormForEdit(ticket) {
  idInput.value = ticket.id;
  titleInput.value = ticket.title;
  descriptionInput.value = ticket.description;
  statusSelect.value = ticket.status;
}

function resetForm() {
  idInput.value = '';
  titleInput.value = '';
  descriptionInput.value = '';
  statusSelect.value = 'Öppen';
}

async function createTicket(ticket) {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket)
  });
}

async function updateTicket(id, ticket) {
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(ticket)
  });
}

async function deleteTicket(id) {
  const ok = confirm('Vill du ta bort detta ärende?');
  if (!ok) return;

  await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });

  fetchTickets();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const ticket = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    status: statusSelect.value
  };

  if (!ticket.title || !ticket.description) {
    alert('Titel och beskrivning krävs.');
    return;
  }

  const id = idInput.value;

  if (id) {
    await updateTicket(id, ticket);
  } else {
    await createTicket(ticket);
  }

  resetForm();
  fetchTickets();
});

resetBtn.addEventListener('click', resetForm);

fetchTickets();