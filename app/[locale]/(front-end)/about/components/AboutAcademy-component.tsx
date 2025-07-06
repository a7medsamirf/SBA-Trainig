"use client";
import Image from "next/image";
import { AboutAcademyData, GoalsAcademyData } from "@/models";

interface AboutAcademyComponentProps {
  aboutAcademy: AboutAcademyData;
  goalsAcademy: GoalsAcademyData;}

  export const AboutAcademyComponent: React.FC<AboutAcademyComponentProps> = ({ aboutAcademy, goalsAcademy }) => {
  
  return (
    <>
      <div className='AboutAcademy'>
        <div className="row">
          <div className="col-lg-12 mb-20">
            <h2>{aboutAcademy.title}</h2>
          </div>
          <div className="col-lg-6">
          <div
              className="font-sm font-medium color-gray-700 mb-15 text-justify"
              dangerouslySetInnerHTML={{ __html: aboutAcademy.description }}
            />
            {goalsAcademy && (
                    <>
                      <h4 className="mt-30 text-color-primary">{goalsAcademy.title}</h4>
                      <ul className="list-servicesGoals mt-20">
                        {Array.isArray(goalsAcademy.description)
                          ? goalsAcademy.description.map((goal, id) => (
                              <li key={id} className="hover-up">{goal}</li>
                            ))
                          : <li>لا توجد أهداف متاحة</li>
                        }
                      </ul>
                    </>
                  )}
          </div>     
          
          <div className="col-lg-6">
            <Image
              src={`/images/about.png`}
              alt={aboutAcademy.title}
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }}
              className="w-100"
            />
          </div>
        </div>
      </div>
    </>
  )
}
