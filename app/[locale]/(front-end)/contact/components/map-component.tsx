import React from 'react'

const MapComponent = () => {
  return (
    <>
         <div className="map">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3626.4319188401687!2d46.695919!3d24.6432571!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f04e8187d51f1%3A0x694c8f7469e8b51d!2sRadio%20and%20Television%20Corporation%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1693480955386!5m2!1sen!2ssa" 
                    height="550" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
    </>
  )
}

export default MapComponent