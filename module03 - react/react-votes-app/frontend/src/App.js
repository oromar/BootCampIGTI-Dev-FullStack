import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CardContainer from "./components/CardContainer/CardContainer";
import Header from "./components/Header/Header";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      candidates: [],
    };
    this.interval = null;
  }

  componentDidMount() {
    this.interval = setInterval(async () => {
      const resp = await fetch("http://localhost:8080/votes");
      const json = await resp.json();
      this.setState({
        candidates: json.candidates,
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { candidates } = this.state;

    if (candidates.length === 0) return <span>Carregando...</span>;

    return (
      <>
      <Header />
      <div className="App">
        {candidates.map((candidate, index) => (
          <CardContainer position={index+1} key={candidate.id} candidate={candidate} />
        ))}
      </div>
      </>
    );
  }
}
