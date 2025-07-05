import React from 'react'
import Image from "next/image";
import { Link } from "@/i18n/routing";

// Banners Data
const items = [
    { id: 1, src: "/images/ads3.png" , name: "International" },
  ];


const BannersSection = () => {
  return (
    <>
  <div className="section-box mt-50 BannersSection">
        <div className="container">
            <div className="row d-flex justify-content-center">
            {items.map((item) => (
                <div className="col-lg-6 p-md-2 p-3" key={item.id}>
                    <Link href="/training" >
                    <Image
                        src={item.src}
                        alt={item.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: '100%', height: 'auto' }}
                        className="w-100 hover-up"
                        />
                </Link>
                </div>
            ))}


            </div>
        </div>
        </div>  
    </>
  )
}

export default BannersSection