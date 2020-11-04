
class App extends React.Component {
  state = {
    counter: 1,
    active: false,
    random: 0
  }

  handleOnClick =(props) => {
    console.log(props)
    console.log(props.target.className.slice(13,18))
    if (props.target.className.slice(13,18) === 'left' && this.state.counter > 1)
    this.setState({
      counter: this.state.counter - 1
    });
    else if (props.target.className.slice(13,18) === 'right' && this.state.counter < 119)
    this.setState({
      counter: this.state.counter + 1
    });
    
  }
   /*  const counter = Math.floor(Math.random()*120)+1; */
   
  handleButton = () => {
    this.setState({
      active: !this.state.active
    })
  }
  render() {
    console.log(this.state.counter);
    return (
      <React.Fragment>
        <LearningMode counter={this.state.counter} active={this.state.active} click={this.handleOnClick} button={this.handleButton}/>
      </React.Fragment>
    );
  }
}

const LearningMode = (props) => {
  
  const tabPictures=[];
  const tabDescribes=[];
    for (let i=0; i<120; i++){
      tabPictures[i]=`./images/obrazy-500px-unnumbered/${i+1}.jpg`;
      tabDescribes[i]=`./images/opisy-500px-unnumbered/${i+1}.jpg`;
    }
  return(
  <div>
    <h1>tryb nauki</h1>

    <div className="picture-wraper">      
      <div className={!props.active ? 'picture' : 'picture'}>{props.counter !==0 && <img src={tabDescribes[props.counter-1]} alt="aa"/>}</div>
      <div className={!props.active ? 'picture' : 'picture-hidden'}>{props.counter !==0 && <img src={tabPictures[props.counter-1]} alt="aa"/>}</div>
    </div>

    <div className='arrows'>
      <div className={props.counter === 1 ? 'left-arrow-min' : 'left-arrow'} onClick={props.click}><i className ="fas fa-caret-left"></i></div>
      <button className='button' onClick={props.button}>{!props.active ? 'pokaż opis' : 'pokaż rysunek'}</button>
      <div className='right-arrow' name='right' onClick={props.click}><i className ="fas fa-caret-right"></i></div>
    </div>

  </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))