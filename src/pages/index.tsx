import React from 'react'

const Index = () => {
  return (
    <div className='wrapper'>
      <h1>FOUC TEST PAGE</h1>
      <p>Reload this page with js disabled and you will see <span>no styling!</span></p>
      <style jsx global>{`
        body, html {
          margin: 0;
        }

        .wrapper {
          height: 100vh;
          background: #000;
          color: #fff;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
        }

        span {
          color: red;
          text-decoration: underline;
        }
      `}</style>
    </div>
  )
}

Index.getInitialProps = () => {
  return {}
}

export default Index
