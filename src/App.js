import React from 'react'
import PdfFile from "./ViewPdf/index"

const App = () => {
  return (
    <div style={{width : "500px", height : "500px", margin : "0 auto"}}>
    
    <PdfFile file={"https://designerrs.s3.ap-south-1.amazonaws.com/designerrs/assets/document/git-cheat-sheet-education1651735767673.pdf"}></PdfFile>
  </div>
    )
}

export default App