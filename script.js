const FIVE_TIMES_NUM = [
  {
    name: '國旅券',
    number: ['21', '32', '67', '97', '98', '410'],
  },
  {
    name: 'i原券',
    number: ['64', '85'],
  },
  {
    name: '農遊券',
    number: ['32', '54', '89', '152', '453', '597'],
  },
  {
    name: '藝Fun券 - 數位',
    number: ['96', '15', '07', '30', '73', '98', '19', '11'],
  },
  {
    name: '藝Fun券 - 紙本',
    number: ['39', '37', '23', '36', '79', '08', '14', '75'],
  },
  {
    name: '動滋券',
    number: ['97', '13', '19', '55', '71', '93', '381', '734', '644', '453', '985'],
  },
  {
    name: '客庄券',
    number: ['81', '900'],
  },
];

const $tbody = $('tbody');
const $id = $('#id-num');

function showTable(data, highlight = '') {
  $tbody.empty();

  if (data.length > 0) {
    data.forEach(({ name, number }) => {
      const numberString = `
      <div class="border rounded p-1 m-1">
        ${number
          .sort((a, b) => a - b)
          .map((num) => highlight.length > 0 ? num.replaceAll(highlight, `<span class="text-danger">${highlight}</span>`) : num)
          .join('</div><div class="border rounded p-1 m-1">')}
      </div>`;
      $tbody.append(`<tr><td class="text-nowrap"><strong>${name}</strong></td><td><div class="d-flex flex-wrap">${numberString}</div></td></tr>`);
    });
  } else {
    $tbody.append('<div class="text-danger">沒有中籤，過幾天再來吧😭!</div>');
  }
}

showTable(FIVE_TIMES_NUM);

$id.on('input', (e) => {
  let data = FIVE_TIMES_NUM;
  const text = e?.target?.value;

  if (text.length > 0) {
    data = [];
    FIVE_TIMES_NUM.forEach(({ name, number }) => {
      const numList = number.filter((num) => num.includes(text));
      if (numList.length > 0) data.push({ name, number: numList });
    });
  }

  showTable(data, text);
});