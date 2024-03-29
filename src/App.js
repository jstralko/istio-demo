/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css, Global } from '@emotion/react'
import Wave from 'react-wavify'

var top=0, sailboat=null;

function fetchFish() {

    return fetch('https://__BACKEND_INGRESS__/fish')
        .then(response => response.json())
}

function init(){
   sailboat = document.getElementById("sailboat");
   moveUp();

   window.setInterval(function() {

        fetchFish().then(zygote => {
            var fish = document.createElement('img');
            fish.src = zygote.Type
            fish.style.position = "fixed";
            fish.style.height = "100px";
            fish.style.right ="-85px";
            var top = zygote.Y;
            fish.style.top = top + "px";
            document.getElementById('ocean').appendChild(fish);

            moveLeft({
                fish,
                right: 0
            });

        }).catch(() => {
            var fish = document.createElement('img');
            fish.src = "/fish-dead.png"
            fish.style.position = "fixed";
            fish.style.height = "100px";
            fish.style.right ="-85px";
            //flip the fish upside down to mimic a dead fish. :)
            fish.style.transform = "rotate(180deg) scaleX(-1)";
            var top = 330
            fish.style.top = top + "px";
            document.getElementById('ocean').appendChild(fish);

            moveLeft({
                fish,
                right: 0
            });

        });

   }, 250);
}

function moveUp() {
    top = parseInt(sailboat.style.top, 10);

    sailboat.style.top = (top + 40) + 'px';
    sailboat.style.visibility='visible';

    setTimeout(function(){moveDown();},1500);
}

function moveDown() {
    top = parseInt(sailboat.style.top, 10);

    sailboat.style.top = (top - 40) + 'px';
    sailboat.style.visibility='visible';

    setTimeout(function(){moveUp();},1500);
}

function moveLeft(state) {
    state.right = parseInt(state.fish.style.right, 10);

    if (2000 >= state.right) {
        state.fish.style.right = (state.right + 5) + 'px';
        state.fish.style.visibility='visible';

        setTimeout(function(){moveLeft(state);},50);
    } else {
        kill(state.fish);
    }
}

function kill(fish){
    fish.parentNode.removeChild(fish);
}

window.onload = function() {init();};

const App = () => {
  const sand = '#FADC96'
  const water = '#5E9EF1'
  const brown = alpha => `rgba(191, 136, 85, ${alpha})`
  const splash = brown(1)
  const hover = brown(0.9)

  const global = css`
    @import url('https://fonts.googleapis.com/css?family=Quicksand:400,700');
    ::selection {
      background: #FFF9CC;
    }
    a {
      text-decoration: none;
    }
    p:hover, *:hover {
      color: ${hover};
    }
  `

  const text = css`
    font-family: 'Quicksand', sans-serif;
    font-weight: 700;
    font-size: 5.5em;
    margin-top: 0;
    margin-bottom: 0;
    color: ${splash};
    word-wrap: none;
  `

  const full = css`
    background: ${water};
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 1;
  `

  const wave = css`
    background: ${sand};
    width: 100%;
    height: 450px;
    position: absolute;
    z-index: -1;
    @media screen and (max-width: 550px) {
      height: 500px;
    }
  `

  const margin = `
    margin-top: 3.5em;
    margin-bottom: 1.6em;
  `
  const center = css`
    display: flex;
    justify-content: center;
    margin-top: 5.5em;
    margin-bottom: 2.5em;
    @media screen and (max-width: 550px) {
      ${margin}
      a {
        font-size: 0.75em;
      }
    }
    @media screen and (max-width: 405px) {
      ${margin}
      a {
        font-size: 0.5em;
      }
    }
  `
  return (
    <div css={full}>
      <Global styles={global} />
      <div id="ocean" css={wave}>
        <div css={center}>
         <p css={text}>service-mesh-demo</p>
        </div>
       <img id="sailboat" alt="Sailboat" src="/sailboat.png" style={{height:"200px", position: "fixed", left:'800px', top: '182px', zIndex:100}} />
        <Wave
              fill={water}
              options={{
                height: 40,
                amplitude: 20,
                speed: 0.4,
                points: 4
              }}
              style={{marginTop: '92px'}}
        />
      </div>
    </div>
  )
}

export default App
