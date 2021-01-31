class FPS {
    constructor(total_tries,CallBackFunction) {
      this.total_tries = total_tries;
      // start timestamp
      this.start=null;
      // number of frames per second
      this.count=0;
      // number of measuers to be done (5 per default)
      this.tries_total=total_tries;
      this.tries=0;
      //fps results
      this.fps=[];
      //average
      this.avg=0;
      // call back
      this.callback=CallBackFunction;
    }
  }
  
  let myFPS=null;
  
  
  
  // calculate the FPS and call a call back function (the bigger the number of tries the more accurate the fps is)
  function getFPS(CallBackFunction,tries){
    myFPS=new FPS(tries,CallBackFunction);
    window.requestAnimationFrame(step);
  
  }
  
  
  
  
  //function to be called when screen is ready to be refreshed
  function step(timestamp) {
    //incerement the number of frames showen
    myFPS.count++;
    // if this is the first call then set start to timestamp (given from the browser)
    if (myFPS.start === null)
      myFPS.start = timestamp;
    // calculate time elapsed
    const elapsed = timestamp - myFPS.start;
   // if still in the first second then request new frame else 
    if (elapsed < 1000) { 
      window.requestAnimationFrame(step);
    }else{
        //count new try as done
        myFPS.tries++;
        //save result
        myFPS.fps.push(myFPS.count)
  
        //initial values for next try
        myFPS.start=null;
        myFPS.count=0;
        // if max tries not reached start again else average the values from all trials and call the call back function
        if(myFPS.tries<myFPS.tries_total){
          window.requestAnimationFrame(step);
        }else{
            //average values
            let sum = myFPS.fps.reduce((a, b) => a + b, 0);
            myFPS.avg=sum/myFPS.fps.length;
            // call back function
            myFPS.callback(myFPS.avg)
  
        }
    }
  }
  