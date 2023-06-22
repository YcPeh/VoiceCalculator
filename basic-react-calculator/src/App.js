import "./App.css";

import "./styles.css"; // css version of styling



function App() {
    return (
        <div className="container d-flex align-items-center justify-content-center text-center" style={{ height: "100vh" }}>

            <div className="container d-grid">

                <div className="row border border-2 border-bottom-0 border-danger">
                    <div className="col p-0">Up space</div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col p-0">Down space</div>
                </div>
                <div className="row border border-2 border-bottom-0 border-danger">
                    <div className="col-6 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">AC</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">DEL</button>
                    </div>
                    <div className="col-3 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">÷</button>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">1</button>
                    </div>
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">2</button>
                    </div>
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">3</button>
                    </div>
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">*</button>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">4</button>
                    </div>
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">5</button>
                    </div>
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">6</button>
                    </div>
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">+</button>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-bottom-0 border-danger">
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">7</button>
                    </div>
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">8</button>
                    </div>
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">9</button>
                    </div>
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">-</button>
                    </div>
                </div>
                <div className="row border border-2 border-top-0 border-danger">
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">.</button>
                    </div>
                    <div className="col p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">0</button>
                    </div>
                    <div className="col-6 p-0">
                        <button type="button" className="btn btn-primary w-100 border-1 border-dark">=</button>
                    </div>
                </div>

            </div>

        </div>

    );
}


export default App;