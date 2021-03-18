class App extends React.Component {
  state = {
    counter: 1,
    active: false,
    random: 0,
    mode: '',
    describe: false
  }

  componentDidMount(){
    const questionPicture = Math.ceil(Math.random()*120);
    this.setState({
      question: questionPicture
    })
  }

  handleOnClickArrows =(event) => {
  
    if (!event.target.value){
    if (event.target.className.slice(13,18) === 'left' && this.state.counter > 1)
    this.setState({
      counter: this.state.counter - 1
    });
    else if (event.target.className.slice(13,18) === 'right' && this.state.counter < 120)
    this.setState({
      counter: this.state.counter + 1
    });
    } else 
        this.setState({
          counter: parseInt(event.target.value,10)
        })
  }

  handleButton = () => {
    this.setState({
      active: !this.state.active
    })
  }

drawQuestion = () => {
  const questionPicture = Math.ceil(Math.random()*120);
  this.setState({
    question: questionPicture,
    describe: false
  })
}

aplicationMode = (event) => {
  if (event.target.name === 'learningMode') {
    this.setState({
      mode: false
    })
  }
  if (event.target.name === 'testMode') {
    this.setState({
      mode: true
    })
  }
}

handleDescribe =() => {
  this.setState({
    describe: !this.state.describe
  })
}

handleChangeMode = () => {
 
    this.setState({mode: !this.state.mode})
}
  render() {
   
    return (
      <React.Fragment>
        <header className='titel'>
          <header className='central'>światła i znaki statków</header>
          {this.state.mode === false && <div className="mode">tryb prezentacji</div>}
          {this.state.mode === true && <div className="mode">tryb nauki</div>}
        </header>
        {this.state.mode === '' && <Dashboard aplicationMode = {this.aplicationMode}/>}
        {this.state.mode === false && <LearningMode counter={this.state.counter} changeMode = {this.handleChangeMode} mode={this.state.mode} active={this.state.active} click={this.handleOnClickArrows} button={this.handleButton}/>}
        {this.state.mode === true && <TestMode numbers = {this.state.numbers} changeMode = {this.handleChangeMode} active={this.state.active} handleOnClickAnswer = {this.handleOnClickAnswer} questionPicture={this.drawQuestion} picture={this.state.question} class={this.state.class} button={this.handleButton} describe={this.handleDescribe} switch = {this.state.describe}/>}
        <footer>
          {this.state.mode === false ? <header className='right'><ChooseAnyPicture click={this.handleOnClickArrows}/></header> : <NewTask drawQuestion = {this.drawQuestion}/>}
        </footer>
      </React.Fragment>
    );
  }
}

//------------------------------------------------------wybór dowolnego obrazka---------------------
const ChooseAnyPicture = (props) => {
  const numbers =[];
  for (let i=0; i<120; i++)
    numbers[i]=<option key={i} value={i+1}>{i+1}</option>
    const Numbers=
    <div className="wybor">
      <label htmlFor='select'>wybierz dowolny numer: &nbsp;&nbsp;</label>
      <select name="select" id="select" onClick={props.click}>{numbers}</select>
    </div>
  return Numbers;
}
//-------------------------------------------tryb nauki-----------------------------------------------
const LearningMode = (props) => {
  
  const tabPictures=[];
  const tabDescribes=[];
    for (let i=0; i<120; i++){
      tabPictures[i]=`./images/obrazy-500px-unnumbered/${i+1}.jpg`;
      tabDescribes[i]=`./images/opisy-500px-unnumbered/${i+1}.jpg`;
    }
  return(
  <div className="wrapper">
  <div>
    <h1 className='mode-title'></h1>

    <div className="picture-wraper">      
     
      <div className={!props.active ? 'picture' : 'picture-hidden'}>{props.counter !==0 && <img src={tabPictures[props.counter-1]} alt="aa"/>}</div>
      <div className={!props.active ? 'picture' : 'picture'}>{props.counter !==0 && <img src={tabDescribes[props.counter-1]} alt="aa"/>}</div>
    </div>

    <div className='arrows'>
      <div className={props.counter === 1 ? 'left-arrow-min' : 'left-arrow'} onClick={props.click}><i className ="fas fa-caret-left"></i></div>
      <button className='button' onClick={props.changeMode}>przełącz tryb</button>
      
      <div className={props.counter === 120 ? 'right-arrow-max' : 'right-arrow'} onClick={props.click}><i className ="fas fa-caret-right"></i></div>
    </div>
  </div>
  </div>
  )
}

//-------------------------------------------tryb testowy-----------------------------------------------
const TestMode = (props) => {
  
  const tabPictures=[];
  const tabDescribes=[];
    for (let i=0; i<120; i++){
      tabPictures[i]=`./images/obrazy-500px-unnumbered/${i+1}.jpg`;
      tabDescribes[i]=`./images/opisy-500px-unnumbered/${i+1}.jpg`;
    }
  return(
    
  <div className="wrapper">
   
  <div>
    <h1 className='mode-title'></h1>

    <div className="picture-wraper">      
    
      <div className='picture'><img src={tabPictures[props.picture]} alt="aa"/></div>
      {!props.switch ? <button className='picture-mask' name='mask' onClick={props.describe}>wyświetl opis</button> : <div className='picture'><img src={tabDescribes[props.picture]} alt="aa"/></div>}
    
    </div>

    <div className='arrows'>
      <button className='button' onClick={props.changeMode}>przełącz tryb</button>
    </div>
  </div>
  </div>
  )
}

const NewTask = (props) => {
  return (
    <div className = 'new-task' onClick = {props.drawQuestion}>nowe pytanie</div>
    )
}

  const Dashboard = (props) => {
    return (
    <div className='dashboard '>
        <button name='learningMode' onClick = {props.aplicationMode}>tryb prezentacji</button><button name='testMode' onClick = {props.aplicationMode}>tryb nauki</button>
    </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))
