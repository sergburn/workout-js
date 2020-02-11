
function dayTime(hours, minutes) {
  if (Number.isNaN(minutes) || minutes < 0 || minutes > 59) {
    throw RangeError(`Minutes ${minutes} out of range`);
  }
  if (Number.isNaN(hours) || hours < 0 || hours > 23) {
    throw RangeError(`Hours ${hours} out of range`);
  }
  return hours * 60 + minutes;
}

const easyStretching = {
  title: 'Разминка',
  steps: [
    {
      order: 1,
      action: 'Подъём левой ноги',
      count: 1,
    },
    {
      order: 2,
      action: 'Подъём правой руки',
      count: 2,
    },
    {
      order: 3,
      action: 'Подъём правой ноги',
      count: 1,
    },
    {
      order: 4,
      action: 'Подъём левой руки',
      count: 2,
    },
  ],
};

const basicStretching = {
  title: 'Основное упражнение',
  steps: [
    {
      order: 1,
      action: 'Подъём левой ноги',
      count: 2,
    },
    {
      order: 2,
      action: 'Подъём правой руки',
      count: 4,
    },
    {
      order: 3,
      action: 'Подъём правой ноги',
      count: 2,
    },
    {
      order: 4,
      action: 'Подъём левой руки',
      count: 4,
    },
  ],
};

export function initAppState() {
  // const schedule = [];
  // let now = 9 * 60;
  // const step = 15;
  // for (let i = 0; i < 20; i++) {
  //   const hours = String(Math.floor(now / 60)).padStart(2, 0);
  //   const minutes = String(Number(now % 60).toFixed()).padStart(2, 0);
  //   schedule.push({ key: i, time: `${hours}:${minutes}`, action: 'Zym' });
  //   now += step;
  // }

  return {
    schedule: [
      {
        start: dayTime(9, 15),
        template: easyStretching,
      },
      {
        start: dayTime(11, 0),
        template: easyStretching,
      },
      {
        start: dayTime(13, 45),
        template: basicStretching,
      },
      {
        start: dayTime(15, 15),
        template: easyStretching,
      },
      {
        start: dayTime(17, 30),
        template: basicStretching,
      },
      {
        start: dayTime(19, 45),
        template: easyStretching,
      },
    ],
    current: null,
  };
}

export function updateAppState(state, action/* : Action */) {
  console.log(action);
  let newState = state;
  switch (action.type) {
    case 'SELECT_TRAINING': {
      if (action.selected) {
        newState = {
          ...state,
          current: action.selected,
        };
      }
      break;
    }
    case 'ADD_TRAINING':
      break;
    case 'EDIT_TRAINING':
      break;
    case 'DELETE_TRAINING':
      break;
    case 'START_TRAINING':
      break;
    case 'CANCEL_TRAINING':
      break;
    case 'FINISH_TRAINING':
      break;
    case 'RESET_ALL':
      newState = initAppState();
      break;
    default:
      break;
  }
  // console.log(newState);
  return newState;
}

export function timeString(minutes) {
  const hours = String(Math.floor(minutes / 60)).padStart(2, 0);
  const mins = String(Number(minutes % 60).toFixed()).padStart(2, 0);

  return `${hours}:${mins}`;
}
