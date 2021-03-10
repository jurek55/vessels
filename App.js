class App extends React.Component {
  state = {
    counter: 1,
    active: false,
    random: 0,
    goodAnswer: false,
    numbers: [],
    question: 0,
    mode: 0,
    class: {
        color1: 'lightgrey',
        color2: 'lightgrey',
        colopr3: 'lightgrey'
    }
    
  }

  componentDidMount(){
    let numbers =[];
    const questionPicture = Math.ceil(Math.random()*120);
    numbers[0] = questionPicture;
    while (!numbers[1] || numbers[1] === numbers[0]) {
      numbers[1] = Math.ceil(Math.random()*120);
    }
      numbers[2] = Math.ceil(Math.random()*120);
    while (numbers[2] === numbers[0] || numbers[2] === numbers[1]) {
      numbers[2] = Math.ceil(Math.random()*120);
    }
    numbers = this.tabMixing(numbers);
    
    this.setState({
      numbers,
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

  handleOnClickAnswer = (event) => {
    const decision = parseInt(event.target.alt);
    for (let i=1; i<4; i++){
      if (this.state.numbers[i-1] === decision){
        
          if (decision === this.state.question && i===1){
            this.setState({
             
              class: {color1: 'green'}
            });
          } else if (decision !== this.state.question && i===1){
            this.setState({
             
              class: {color1: 'red'}
            });
          }
      }
      if (this.state.numbers[i-1] === decision){
            
          if (decision === this.state.question && i===2){
              this.setState({
                class: {color2: 'green'}
              });
          } else if (decision !== this.state.question && i===2){
              this.setState({
                class: {color2: 'red'}
              });
            }
      }
    if (this.state.numbers[i-1] === decision){
          
      if (decision === this.state.question && i===3){
        this.setState({
          class: {color3: 'green'}
        });
      } else if (decision !== this.state.question && i===3){
        this.setState({
          class: {color3: 'red'}
        });
      }
    }
  }
}
  handleButton = () => {
    this.setState({
      active: !this.state.active
    })
  }
  
  tabMixing = (tab) => {
    for ( let i = 0; i<tab.length; i++){
        let j = Math.floor(Math.random()*tab.length);
        const tempElement = tab[i];
        tab[i] = tab[j];
        tab[j] = tempElement;
    }
  return tab;
}

drawQuestion = () => {
  let numbers =[];
  const questionPicture = Math.ceil(Math.random()*120);
  numbers[0] = questionPicture;
  while (!numbers[1] || numbers[1] === numbers[0]) {
    numbers[1] = Math.ceil(Math.random()*120);
  }
  while (!numbers[2] || numbers[2] === numbers[0] || numbers[2] === numbers[1]) {
    numbers[2] = Math.ceil(Math.random()*120);
  }
  numbers = this.tabMixing(numbers);
  
  this.setState({
    numbers,
    question: questionPicture,
    class: {color1: 'lightgrey', color2: 'lightgrey', color3: 'lightgrey'}
  })
}

aplicationMode = (event) => {
  if (event.target.name === 'learningMode') {
    this.setState({
      mode: 1
    })
  }
  if (event.target.name === 'testMode') {
    this.setState({
      mode: 2
    })
  }
}
  render() {
   
    return (
      <React.Fragment>
        <header>
          <header className='central'>światła i znaki statków</header>
         {/*  {this.state.mode === 1 && <header className='right'><ChooseAnyPicture click={this.handleOnClickArrows}/></header>} */}
        </header>
        {this.state.mode === 0 && <Dashboard aplicationMode = {this.aplicationMode}/>}
        {this.state.mode === 1 && <LearningMode counter={this.state.counter} active={this.state.active} click={this.handleOnClickArrows} button={this.handleButton}/>}
        {this.state.mode === 2 && <TestMode numbers = {this.state.numbers} handleOnClickAnswer = {this.handleOnClickAnswer} questionPicture={this.drawQuestion} picture={this.state.question} class={this.state.class}/>}
        <footer>
          {this.state.mode === 1 && <header className='right'><ChooseAnyPicture click={this.handleOnClickArrows}/></header>}
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
      <button className='button' onClick={props.button}>{!props.active ? 'tryb nauki' : 'tryb testowy'}</button>
      
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
     
      <div className={!props.active ? 'picture' : 'picture-hidden'}>{props.counter !==0 && <img src={tabPictures[props.counter-1]} alt="aa"/>}</div>
      <div className={!props.active ? 'picture' : 'picture'}>{props.counter !==0 && <img src={tabDescribes[props.counter-1]} alt="aa"/>}</div>
    </div>

    <div className='arrows'>
      <div className={props.counter === 1 ? 'left-arrow-min' : 'left-arrow'} onClick={props.click}><i className ="fas fa-caret-left"></i></div>
      <button className='button' onClick={props.button}>{!props.active ? 'tryb nauki' : 'tryb testowy'}</button>
      
      <div className={props.counter === 120 ? 'right-arrow-max' : 'right-arrow'} onClick={props.click}><i className ="fas fa-caret-right"></i></div>
    </div>
  </div>
  </div>
  )
}
//-----------------------------------------------------------tryb testowy_1--------------------------------
const TestMode1 = (props) => {
  const tabPictures=[];
  const tabDescribes=[];
    for (let i=0; i<120; i++){
      tabPictures[i]=`./images/obrazy-500px-unnumbered/${i+1}.jpg`;
      tabDescribes[i]=`./images/opisy-500px-unnumbered/${i+1}.jpg`;
    }
  
    return (
    <div className="wrapper">
    <div>
      {/* <h1 className='mode-title'>tryb testowy</h1> */}
        <div className="picture-wraper"><img src={tabPictures[props.picture]} alt='' /></div>
        <div className='answers'>
          
            <div className="picture-wraper-answer" onClick = {props.handleOnClickAnswer}><img className={props.class.color1} src={tabDescribes[props.numbers[0]]} alt={props.numbers[0]}/></div>
            <div className="picture-wraper-answer" onClick = {props.handleOnClickAnswer}>{<img className={props.class.color2} src={tabDescribes[props.numbers[1]]} alt={props.numbers[1]} />}</div>
            <div className="picture-wraper-answer" onClick = {props.handleOnClickAnswer}><img className={props.class.color3}src={tabDescribes[props.numbers[2]]} alt={props.numbers[2]}/></div>
            
        </div>
        <button onClick={props.questionPicture}>nastepne pytanie</button>
    </div>
    </div>
    );
  }

  const Dashboard = (props) => {
    return (
    <div className='dashboard '>
        <button name='learningMode' onClick = {props.aplicationMode}>tryb nauki</button><button name='testMode' onClick = {props.aplicationMode}>tryb testowy</button>
    </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))
