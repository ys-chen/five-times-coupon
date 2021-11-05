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
      },
      {
        count: 'W3',
        number: ['44', '34', '09', '55', '35', '041'],
      },
      {
        count: 'W4',
        number: ['32', '02', '87', '93', '82', '17'],
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
      },
      {
        count: 'W3',
        number: ['48', '49'],
      },
      {
        count: 'W4',
        number: ['29', '82', '71'],
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
      },
      {
        count: 'W3',
        number: ['60', '75'],
      },
      {
        count: 'W4',
        number: ['315', '740', '381', '264', '285', '765', '682', '763', '373', '015', '374'],
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
      },
      {
        count: 'W3',
        number: ['01', '92', '19', '23', '79', '95', '48', '46'],
      },
      {
        count: 'W4',
        number: ['70', '61', '37', '85', '67', '35', '44'],
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
      },
      {
        count: 'W3',
        number: ['31', '56', '02', '52', '44', '49', '00', '47', '59'],
      },
      {
        count: 'W4',
        number: ['75', '72', '71', '28', '67', '82', '93', '56', '34', '07'],
      }
    ],
  },
  {
    name: '動滋券',
    numbers: [
      {
        count: 'W1',
        number: ['97', '13', '19', '55', '71', '93', '381', '734', '644', '453', '985'],
      },
      {
        count: 'W2',
        number: ['91', '11', '04', '18', '57', '498', '756'],
      },
      {
        count: 'W3',
        number: ['82', '45', '57', '53', '00', '546', '855', '865', '012', '983'],
      },
      {
        count: 'W4',
        number: ['30', '03', '51', '88'],
      }
    ],
  },
  {
    name: '客庄券',
    numbers: [
      {
        count: 'W1',
        number: ['81', '900'],
      },
      {
        count: 'W2',
        number: ['11', '439', '841', '052', '206', '161', '457', '205', '012', '293', '446', '589'],
      },
      {
        count: 'W3',
        number: ['14', '269'],
      },
      {
        count: 'W4',
        number: ['69'],
      }
    ],
  },
  {
    name: '地方創生券',
    numbers: [
      {
        count: 'W1',
        number: ['081', '105', '594', '188', '089', '396', '521', '467', '912', '798', '358', '441', '367', '941', '335'],
      },
      {
        count: 'W2',
        number: ['598', '880', '886', '675', '684', '568', '645', '456'],
      },
      {
        count: 'W3',
        number: ['771', '706', '064', '168', '191', '459', '135', '314', '366'],
      },
      {
        count: 'W4',
        number: ['743', '201', '119', '828', '221', '750', '046'],
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
    $tbody.append('<div class="text-danger">沒有中籤，你是國家級邊緣人😭!</div>');
  }
}

showTable(FIVE_TIMES_NUM);

$id.on('input', (e) => {
  let data = FIVE_TIMES_NUM;
  const text = e.target.value;

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