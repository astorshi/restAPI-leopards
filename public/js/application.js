const $row = document.querySelector('.row');

const printItem = ({ name, price, quantity, _id }) => `
  <div class="card col-4 m-2" 
  data-id="${_id}"
   data-price="${price}" 
   data-name="${name}"
   data-quantity="${quantity}"
   >
    <div class="card-header">
      Featured
    </div>
    <div class="card-body">
      <h5 class="card-title">name: ${name}</h5>
      <p class="card-text">price: ${price}</p>
      <p class="card-text" >quantity : ${quantity}</p>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-danger">delete</button>
        <button type="button" class="btn btn-secondary">edit</button>
        <button type="button" class="btn btn-warning">discount</button>
      </div>
    </div>
  </div>`;

const printForm = ({
  name,
  id,
  price,
  quantity,
}) => `   <form action="/goods"  method="POST">
  <div class="mb-3">
    <label for="name" class="form-label"
      >Name</label
    >
    <input
      type="text"
      class="form-control"
      id="name"
      name="name"
      value="${name}"
    />
  </div>
  <div class="mb-3">
    <label for="price" class="form-label">Price</label>
    <input
      type="number"
      class="form-control"
      id="price"
      name="price"
      value="${price}"
    />
  </div>
  <div class="mb-3">
    <label for="quantity" class="form-label">Quantity</label>
    <input
      type="number"
      class="form-control"
      id="quantity"
      name="quantity"
      value="${quantity}"
    />
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
  <button type="reset" class="btn btn-primary">Reset</button>
</form>
`;

const fetchToAPI = async (method, body) =>
  fetch('/goods', {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

const main = async () => {
  console.log('Helloo!!!');
  const requiest = await fetch('/goods');
  const goods = await requiest.json();
  $row.innerHTML = goods.map((el) => printItem(el)).join('');
};
main();

const $mainForm = document.querySelector('form');
$mainForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  console.log('SUBMIT MAIN FORM==>');
  const newBody = Object.fromEntries(new FormData($mainForm));
  const request = await fetchToAPI('POST', newBody);
  if (request.ok) {
    const newItem = await request.json();
    console.log(newItem);
    $row.insertAdjacentHTML('beforeend', printItem(newItem));
  }
});

$row.addEventListener('click', async (event) => {
  const buttonText = event.target.innerText;
  console.log(buttonText);

  const $card = event.target.closest('[data-id]');
  const { id, price, name, quantity } = $card.dataset;
  console.log('ID =>', id);

  switch (buttonText) {
    case 'delete':
      const result = await fetchToAPI('DELETE', { id });
      if (result.ok) {
        $card.remove();
      }
      break;

    case 'discount':
      const patchRes = await fetchToAPI('PATCH', { id });
      if (patchRes.ok) {
        const newPrice = ($card.dataset.price -= 10);
        $card.querySelector('p').innerText = `price: ${newPrice}`;
      }
      break;

    case 'edit':
      $card.innerHTML = printForm($card.dataset);
      const $form = $card.querySelector('form');
      $form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('SUBMITTT!!!');
        const newBody = { ...Object.fromEntries(new FormData($form)), id };
        const result = await fetchToAPI('PUT', newBody);
        if (result.ok) {
          // const newItemHtml = printItem({ ...newBody, _id: id });
          $card.insertAdjacentHTML(
            'beforebegin',
            printItem({ ...newBody, _id: id })
          );
          $card.remove();
        }
      });
      break;

    default:
      break;
  }
});
