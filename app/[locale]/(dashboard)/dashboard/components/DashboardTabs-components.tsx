import React from 'react'

function DashboardTabsComponents() {
  return (
    <>
        <ul className="nav nav-tabs nav-tabs-product dashboard-tabs" role="tablist">
        <li>
        <a className="active" href="#tab-description" data-bs-toggle="tab" role="tab" aria-controls="tab-description"
            aria-selected="true">
            وصف الدورة
        </a>
        </li>
        <li>
        <a href="#tab-objectives" data-bs-toggle="tab" role="tab" aria-controls="tab-objectives" aria-selected="false">
            أهداف الأداء النهائية
        </a>
        </li>
    
    </ul>
    
    <div className="tab-content">
        <div className="tab-pane fade active show" id="tab-description" role="tabpanel" aria-labelledby="tab-description">
    
        <div className="font-md color-gray-500">
            وصف الدورة
        </div>
        </div>
        
    
        <div className="tab-pane fade" id="tab-objectives" role="tabpanel" aria-labelledby="tab-objectives">
        <div className="font-md color-gray-500" >     أهداف الأداء النهائية</div>
    
        </div>
        </div>
    


    </>
  )
}

export default DashboardTabsComponents