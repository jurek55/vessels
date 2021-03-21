class App extends React.Component {
  state = {
    counter: 1,
    active: false,
    random: 0,
    mode: '0',
    describe: false,
    question: ''
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

aplicationMode1 = () => {
  this.setState({
    mode: '1'
  })
}

aplicationMode2 = () => {
  this.setState({
    mode: '2'
  })
}

handleDescribe =() => {
  this.setState({
    describe: !this.state.describe
  })
}

handleChangeMode = () => {
  let mode = '';
    if (this.state.mode === '1')
       mode = '2';
    if (this.state.mode === '2')
       mode = '1';
    this.setState({mode})
}

  render() {
   console.log(this.state.mode);
    return (
      <React.Fragment>
        <header className='titel'>
          <header className='central'>światła i znaki statków na morzu</header>
          {this.state.mode === '1' && <div className="mode">tryb prezentacji</div>}
          {this.state.mode === '2' && <div className="mode">tryb nauki</div>}
        </header>
        {this.state.mode === '0' && <Dashboard mode1 = {this.aplicationMode1} mode2 = {this.aplicationMode2}/>}
        {this.state.mode === '1' && <LearningMode counter={this.state.counter} changeMode = {this.handleChangeMode} mode={this.state.mode} active={this.state.active} click={this.handleOnClickArrows} button={this.handleButton}/>}
        {this.state.mode === '2' && <TestMode numbers = {this.state.numbers} changeMode = {this.handleChangeMode} active={this.state.active} handleOnClickAnswer = {this.handleOnClickAnswer} picture={this.state.question} button={this.handleButton} describe={this.handleDescribe} switch = {this.state.describe}/>}
        <footer>
         
          {this.state.mode === '1' && <header className='right'><ChooseAnyPicture click={this.handleOnClickArrows}/></header>}
          {this.state.mode === '2' && <NewTask drawQuestion = {this.drawQuestion}/>}
          <p>&#169; 2021<a href='https://wp.jkunicki.pl' target='_blank'> Jerzy Kunicki</a></p> 
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
    <div className = 'new-task' onClick = {props.drawQuestion}>Nowe pytanie</div>
    )
}

  const Dashboard = (props) => {
    return (
      <div className="wrapper">
      
        <div className="picture-wraper">
          <div className="cover"><img src='images/obrazy-500px-unnumbered/cover.jpg' alt='aa'/></div>
      </div>
      <div className='dashboard'>
        <button name='1' onClick={props.mode1}><p>tryb prezentacji</p></button><button name='2' onClick = {props.mode2}><p>tryb nauki</p></button>
        </div>
      </div>
    
    )}

  

ReactDOM.render(<App />, document.getElementById('root'))
