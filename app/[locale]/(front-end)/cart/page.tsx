import Image from 'next/image';
import './cart.scss'; // Import your custom styles
import SvgTimer from '@/components/icons/svg/timer';
import SvgCalendar2 from '@/components/icons/svg/calendar-2';
import SvgSvgexport15 from '@/components/icons/svg/svgexport-15';
import SvgDelete from '@/components/icons/svg/delete'
import SvgSaudiRiyal from '@/components/icons/svg/saudi-riyal'

// Dummy cart dataSvg
const cartItems = [
  {
    id: 1,
    title: 'التقرير التلفزيوني الإبداعي',
    category: 'الصحافة التلفزيونية والإذاعية',
    days: 5,
    hours: 30,
    date: '12 يونيو 2025',
    trainer: 'أحمد عبد الله',
    price: 134,
    image: '/images/courses/AIInProduction.jpg',
  },
  {
    id: 2,
    title: 'التقرير التلفزيوني الإبداعي',
    category: 'الصحافة التلفزيونية والإذاعية',
    days: 5,
    hours: 30,
    date: '12 يونيو 2025',
    trainer: 'أحمد عبد الله',
    price: 134,
    image: '/images/courses/AIInProduction.jpg',
  },
  {
    id: 3,
    title: 'التقرير التلفزيوني الإبداعي',
    category: 'الصحافة التلفزيونية والإذاعية',
    days: 5,
    hours: 30,
    date: '12 يونيو 2025',
    trainer: 'أحمد عبد الله',
    price: 134,
    image: '/images/courses/AIInProduction.jpg',
  },
];

const TAX = 15;
const total = cartItems.reduce((sum, item) => sum + item.price, 0) + TAX;

const CartPage = () => {
  return (
    <div className="container cart-page my-5">
      <div className="row">
        <div className='col-lg-12'>
          <h5 className='mb-20'>السلة</h5>
        </div>
        {/* Cart Items */}
        <div className="col-md-9">
          {cartItems.map((item) => (
            <div className="card mb-3 cart-item" key={item.id}>
              <div className="row g-0 align-items-center">
                <div className="col-md-3">
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    className="img-fluid rounded"
                    alt={item.title}
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                  <div className="category small mb-2">{item.category}</div>

                    <div className="d-flex justify-content-between align-items-center">
                    <h6 className="card-title mb-3">{item.title}</h6>
                      <div className="d-flex gap-1 ">
                        <span className="fw-bold text-color-primary">
                          {" "}
                          {item.price}
                        </span>
                        <SvgSaudiRiyal width={10} />
                      </div>
                    </div>
                  
                    <div className="d-flex justify-content-between align-items-end mb-2">
                      <ul className="data-list list-unstyled mb-5">
                        <li className="d-flex align-items-center">
                          <span className="me-1">
                            {/* Clock SVG */}
                            <SvgTimer />
                          </span>
                          {item.days} أيام - {item.hours} ساعة تدريبية
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="me-1">
                            {/* Calendar SVG */}
                            <SvgCalendar2 />
                          </span>
                          {item.date}
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="me-1">
                            {/* Person SVG */}
                            <SvgSvgexport15 />
                          </span>
                          {item.trainer}
                        </li>
                      </ul>

                      <div>
                        <button className="btn text-danger d-flex align-items-center p-0">
                          <SvgDelete width={30} />
                          إزالة من السلة
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-between mt-4 mb-4">
            <button className="btn btn-cart btn-outline-custom px-5">
              {" "}
              أكمل التصفح{" "}
            </button>
            <button className="btn btn-cart btn-primary btn-custom-primary  px-5">
              إتمام الطلب
            </button>
          </div>
        </div>
        {/* Summary */}
        <div className="col-md-3 mb-4">
          <div className="card p-3 summary-box">
            <h5 className="mb-3 text-end">ملخص الطلب</h5>
            <div className="d-flex justify-content-between mb-15">
              <span className='text-muted small'>عدد الدورات</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="d-flex justify-content-between mb-15">
              <span className='text-muted small'>سعر الدورة</span>
              <div className="d-flex gap-1 ">
                <span className="fw-bold ">
                  {" "}
                  {cartItems[0]?.price}
                </span>
                <SvgSaudiRiyal width={10} color="#202020" />
              </div>
            </div>
            <div className="d-flex justify-content-between mb-15">
              <span className='text-muted small'>الضريبة</span>
              <div className="d-flex gap-1 ">
                <span className="fw-bold"> {TAX}</span>
                <SvgSaudiRiyal width={10} color="#202020" />
              </div>
            </div>
            <div className="Total-box d-flex justify-content-between mb-15 fw-bold">
              <span className="text-color-primary">الإجمالي</span>
              <div className="d-flex gap-1 ">
                <span className="fw-bold text-color-primary"> {total}</span>
                <SvgSaudiRiyal width={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;