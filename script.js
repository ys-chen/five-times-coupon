const FIVE_TIMES_NUM = [
  {
    name: '國旅券',
    numbers: [
      {
        count: 'W1',
        number: ['21', '32', '67', '97', '98', '410'],
      },
      {
        count: 'W2',
        number: ['87', '04', '40', '29', '71'],
      }
    ],
    
  },
  {
    name: 'i原券',
    numbers: [
      {
        count: 'W1',
        number: ['64', '85'],
      },
      {
        count: 'W2',
        number: ['12', '59'],
      }
    ],
  },
  {
    name: '農遊券',
    numbers: [
      {
        count: 'W1',
        number: ['32', '54', '89', '152', '453', '597'],
      },
      {
        count: 'W2',
        number: ['50', '13'],
      }
    ],
  },
  {
    name: '藝Fun券\n數位',
    numbers: [
      {
        count: 'W1',
        number: ['96', '15', '07', '30', '73', '98', '19', '11'],
      },
      {
        count: 'W2',
        number: ['00', '15', '22', '23', '39', '61', '78'],
      }
    ],
  },
  {
    name: '藝Fun券\n紙本',
    numbers: [
      {
        count: 'W1',
        number: ['39', '37', '23', '36', '79', '08', '14', '75'],
      },
      {
        count: 'W2',
        number: ['06', '31', '37', '51', '65', '76', '81'],
      }
    ],
  },
  {
    name: '動滋券',
    numbers: [
      {
        count: 'W1',
        number: ['97', '13', '19', '55', '71', '93', '381', '734', '644', '453', '985'],
      }
    ],
  },
  {
    name: '客庄券',
    numbers: [
      {
        count: 'W1',
        number: ['81', '900'],
      }
    ],
  },
  {
    name: '地方創生券',
    numbers: [
      {
        count: 'W1',
        number: ['081', '105', '594', '188', '089', '396', '521', '467', '912', '798', '358', '441', '367', '941', '335'],
      }
    ],
  },
];

const $tbody = $('tbody');
const $id = $('#id-num');

function renderNumber(numberList, highlight) {
  return `
    <div class="border rounded p-1 m-1">
      ${numberList
        .sort((a, b) => a - b)
        .map((num) => highlight.length > 0 ? num.replaceAll(highlight, `<span class="text-danger">${highlight}</span>`) : num)
        .join('</div><div class="border rounded p-1 m-1">')}
    </div>`;
}

function showTable(data, highlight = '') {
  $tbody.empty();

  if (data.length > 0) {
    data.forEach(({ name, numbers }) => {
      numbers.forEach(({ count, number }, i) => {
        const numberString = renderNumber(number, highlight);
        $tbody.append(`
          <tr>
            ${i === 0 ? `<td rowspan="${numbers.length}" style="padding-top: 1rem; min-width: 3.5rem;"><strong>${name}</strong></td>` : ''}
            <td class="align-middle">${count}</td>
            <td><div class="d-flex flex-wrap">${numberString}</div></td>
          </tr>`);
      });
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
    FIVE_TIMES_NUM.forEach(({ name, numbers }) => {
      const numList =  numbers
        .map(({ count, number }) => ({ count, number: number.filter((num) => num.includes(text)).flat() }))
        .filter(({ number }) => number.length > 0);
      if (numList.length > 0) data.push({ name, numbers: numList });
    });
  }

  showTable(data, text);
});