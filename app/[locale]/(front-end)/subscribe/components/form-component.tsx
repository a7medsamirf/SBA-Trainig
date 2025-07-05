import React from 'react'

const FormComponent = () => {
  return (
    <>
      <form id="bForm" method="post">                  
              <section className="section-box shop-template ">
                <div className="container">
                  <div className="row mb-100">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-12">
                      <div className="col-lg-11" >
            
                        <div className="col-12 form-register mt-30 mb-30">
                            <div className="row">
                              <div className="col-lg-12">
                                <div className="form-group">
                                  <label className="mb-5 font-sm color-gray-700"> الاسم الكامل</label>
                                  <input className="form-control" type="text" placeholder="" />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="mb-5 font-sm color-gray-700"> بريد إلكتروني</label>
                                  <input className="form-control" type="text" placeholder="name@company.com" />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="mb-5 font-sm color-gray-700"> رقم الجوال</label>
                                  <input className="form-control" type="text" placeholder="05x xxx xxxx" />
                                </div>
                              </div>                        
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="mb-5 font-sm color-gray-700"> اسم الشركة</label>
                                  <input className="form-control" type="text" placeholder="" />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <label className="mb-5 font-sm color-gray-700"> الدور الوظيفي</label>
                                  <input className="form-control" type="text" placeholder="" />
                                </div>  
                              </div>
                              <div className='col-lg-12'>
                              <button type="submit" className="font-md-bold btn btn-buy btn-custom-primary d-block w-100" >تسجيل</button>

                              </div>
                            </div>                                      

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </form>
    
    </>
  )
}

export default FormComponent