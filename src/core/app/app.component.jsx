import FilterScene from 'src/component/filter/filter.scene';

import logo from 'src/core/app/logo.svg';
import 'src/core/app/app.scss';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="container app__header-container">
          <img src={logo} className="app__logo" alt="Logo"/>

          <div>
            Edit <code>src/core/app/app.component.jsx</code> and save to reload.
          </div>
          <a
            className="app__link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </div>
      </header>
      <main role="main" className="container">
        <div className="row">
          <div className="col-4">
            <FilterScene />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
