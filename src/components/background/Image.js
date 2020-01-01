import React from 'react'

const Image = ({ image }) => {
    const styles = {
      backgroundImage:`url(${image})`,

    }
    return <div className="container-image" style={styles}></div>
  }

  export default Image