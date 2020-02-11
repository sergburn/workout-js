import React, { useContext } from 'react';
import './App.css';
import { initAppState, updateAppState, timeString } from './State';

const StateContext = React.createContext(null);

function ScheduleItem(props) {
  const startTime = timeString(props.item.start);
  const dispatch = useContext(StateContext);

  let style = 'schedule-item';
  if (props.selected) {
    style += ' schedule-item-selected';
  }

  return (
    <button
      className={style}
      type="button"
      onClick={() => {
        dispatch({ type: 'SELECT_TRAINING', selected: props.item });
      }}
    >
      <p>{startTime}</p>
      <p>{props.item.template.title}</p>
    </button>
  );
}

function Schedule(props) {
  return (
    <nav className="schedule-pane">
      <ul className="schedule-list">
        {props.schedule.map((item) => (
          <li key={item.start}>
            <ScheduleItem item={item} selected={item === props.current} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TrainingStep(props) {
  return (
    <tr>
      <td className="step-action">{props.step.action}</td>
      <td className="step-value">{props.step.count}</td>
    </tr>
  );
}

function TrainingEvent(props) {
  // const dispatch = React.useContext(StateContext);
  if (!props.training) {
    return (
      <div className="training-pane training-pane-empty">
        <div className="training-placeholder">
          <p>Выберите тренировку из списка</p>
        </div>
      </div>
    );
  }

  const startTime = timeString(props.training.start);

  return (
    <div className="training-pane">
      <p className="training-time">{startTime}</p>
      <p className="training-title">{props.training.template.title}</p>

      <div>
        <hr />
        <h3 className="training-steps">Программа тренировки</h3>
        {/* <ul className="step-list"> */}
        <table>
          <thead>
            <tr>
              <td>Движение</td>
              <td>Повторов</td>
            </tr>
          </thead>
          <tbody>
            {props.training.template.steps.map((step) => (
              <TrainingStep step={step} key={step.order} />
            ))}
          </tbody>
        </table>
        {/* </ul> */}
      </div>
      <div className="training-commands">
        {/* <button type="button">Add training</button> */}
        {/* <button type="button">Edit training</button> */}
        <button type="button">Start now</button>
      </div>
    </div>
  );
}


function App() {
  const [appState, dispatch] = React.useReducer(updateAppState, {}, initAppState);

  return (
    <StateContext.Provider value={dispatch}>
      <section className="App">
        <Schedule schedule={appState.schedule} current={appState.current} />
        <TrainingEvent training={appState.current} />
      </section>
    </StateContext.Provider>
  );
}


export default App;
