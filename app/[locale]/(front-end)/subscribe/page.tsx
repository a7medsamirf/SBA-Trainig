import React from 'react'
import "./register.scss"
import NewsletterSection from '@/components/sections/newsletter/newsletter-section'
import UpsCard from '@/components/sections/ups/components/upsCard-component'
import FormComponent from './components/form-component'
const RegisterPage = () => {
  return (
    <>
    <section className="section-box shop-template mt-0">
        <div className="container">
        <div className='py-10'>
        <h6 className="mb-10" id="course-category">الصحافة التلفزيونية والإذاعية</h6>
        <h2 >التقرير التلفزيوني الإبداعي</h2>         
          </div> 

          <div className="border-bottom pt-0 mb-30"></div>
          <div className="row">
            <FormComponent />
          </div>
        </div>
        <div className="section-box mt-50 mb-60">
        <div className="container">
          <div className="row">
          <UpsCard className="UpsCard-border my-md-0 my-3" />

          </div>
        </div>
      </div>
        <NewsletterSection />
      </section>
    </>
  )
}

export default RegisterPage