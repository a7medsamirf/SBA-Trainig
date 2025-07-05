
import UpsCard from './components/upsCard-component';
import "./ups.scss";

const UpsSection = () => {
  return (
    <>
      <section className="section-box bg-gray-50 mb-50">
        <div className="container">
          <div className="row">
          <UpsCard />
       {/*    <UpsCard 
                iconSize={{ width: 40, height: 40 }}
                className=""
                itemClassName="hover-shadow border"
                iconClassName="text-primary"
                titleClassName="fw-bold"
                descriptionClassName="text-muted"
            /> */}
          </div>
        </div>
      </section>
    </>
  );
}

export default UpsSection