import { marked } from "https://cdnjs.cloudflare.com/ajax/libs/marked/11.0.0/lib/marked.esm.js";
import {  useEffect, useState } from 'react'
import * as DOMPurify from 'dompurify';
// import { hljs } from 'highlight.js'
import 'highlight.js/styles/github.css';
import { HtmlContext } from "next/dist/shared/lib/html-context.shared-runtime";

// hljs.registerLanguage('javascript', javascript);
const hljs = require('highlight.js/lib/common');

// To parse line breaks
marked.use({
  breaks: true,
})

// Taken directly from the example
let sampleText = 
`# Welcome to my React Markdown Previewer!
## Give it a try in the editor on your left.

You can define \`code\` with backticks:

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

Need to emphasize some text? Well here, you can!
- _italic_
- **bold**
- ~~strikethrough~~
- _**~~all of the above~~**_

You can add your own [links](https://gcmunoz.com/) too.

Want to quote some text?
> Do it with block quotes!
Anybody can do it!

Showing off some data? Try a table!

This | Could | Be
------------ | ------------- | -------------
your table | with | three low payments
of | **$999** | Order Now!

Need to shop for ingredients for your next recipe? It's a cakewalk with lists!
- My Favorite Omelete
    - 2x Eggs
    - 3x mushrooms, chopped
    - Spinach
    - etc.

1. Chop the mushrooms into 1/4" slices
2. Saute the mushrooms in a pan
3. etc.

Last but not least, embedded pictures work too!


![Abstract Dogs](https://raw.githubusercontent.com/gcmoony/react-markdown-preview/master/public/dawgs.png)
`
export default function Home() {
  const [mdInput, setMdInput] = useState(sampleText);
  
  useEffect(() => {
    const showPreview = setTimeout(() => {
      resetOutput();
    }, 1000);

    return () => {
      clearTimeout(showPreview);
    }
  }, [])

  function handleInputChange(event) {
    setMdInput(event.target.value);
    updateOutput(event);
    
  }
  
  function updateOutput(event) {
    let preview = document.getElementById("preview");
    
    preview.innerHTML = DOMPurify.sanitize(marked(event.target.value));
    parseCode();
  }

  function parseCode() {
    document.querySelectorAll('code').forEach(e => {
      hljs.highlightElement(e);
    })
  }

  function resetOutput() {
    setMdInput(s => s = sampleText);
    let editor = document.getElementById("editor");
    let preview = document.getElementById("preview");
    preview.innerHTML = marked(sampleText);
    editor.value = sampleText;
    parseCode();
  }

  return (
    <main>
      {/* This is the test script used by freeCodeCamp for evaluation */}
      {/* <script defer src='https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js'/> */}

      <h1 className="title">Markdown Preview Editor </h1>
      <div className="container">
        <Container style={"container inside"}  title={"Markdown"} reset={<button className="reset" onClick={resetOutput}>&#x21A9;</button>}>
          <textarea id='editor' placeholder='Some text here' autoFocus onChange={handleInputChange} defaultValue={mdInput}/>
        </Container>

        <Container style={"container inside"} title={"Preview"}>
          
          <div id='preview' className='' ></div>
        </Container>
      </div>

      <div className="attribute">
        <span>Created by <a target="_blank" href="https://github.com/gcmoony">George Cadel-Munoz</a>. Challenge by <a href="https://www.freecodecamp.org/" target="_blank">freeCodeCamp</a></span>
      </div>
    </main>
  )
}

function Container({children, title, style, reset}) {
  return (
    <div className={style}>
      <h2 className="title">{title} {reset ? reset : <></>}</h2>
      {children}
    </div>
  )
}
