"use client";

import Image from "next/image";
import { CartDetailResponse } from "@/models";
import SvgTimer from "@/components/icons/svg/timer";
import SvgCalendar2 from "@/components/icons/svg/calendar-2";
import SvgSvgexport15 from "@/components/icons/svg/svgexport-15";
import SvgSaudiRiyal from "@/components/icons/svg/saudi-riyal";
import { Link } from "@/i18n/routing";
import RemoveFromCartComponent from "./RemoveFromCart-component";

interface Props {
  cartData: CartDetailResponse["data"];
  onRemoveFromCart: (courseId: number) => void;
}

const CartIndexComponent = ({ cartData, onRemoveFromCart }: Props) => {
  const cartItems = cartData?.carts || [];
  const vat = cartData?.vat || 0;
  const total = cartData?.total_price || 0;

  return (
    <div className="row">
      <div className="col-lg-12">
        <h5 className="mb-20">السلة</h5>
      </div>

      {/* Cart Items */}
      <div className="col-md-9">
        {cartItems.map((item) => {
          const course = item.course;
          return (
            <div className="card mb-3 cart-item" key={item.id}>
              <div className="row g-0 align-items-center">
                <div className="col-md-3">
                  <Image
                    src={course.image}
                    alt={course.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    className="img-fluid rounded"
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <div className="category small mb-2">{course.category_name}</div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="card-title mb-3">{course.name}</h6>
                      <div className="d-flex gap-1">
                        <span className="fw-bold text-color-primary">{course.price}</span>
                        <SvgSaudiRiyal width={10} />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-end mb-2">
                      <ul className="data-list list-unstyled mb-5">
                        <li className="d-flex align-items-center">
                          <span className="me-1"><SvgTimer /></span>
                          {course.duration}
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="me-1"><SvgCalendar2 /></span>
                          {new Date(course.start_date).toLocaleDateString("ar-EG")}
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="me-1"><SvgSvgexport15 /></span>
                          {course.instructor_name}
                        </li>
                      </ul>
                      <div>
                        <RemoveFromCartComponent
                          courseId={course.id}
                          onRemoved={() => onRemoveFromCart(course.id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div className="d-flex justify-content-between mt-4 mb-4">
          <Link className="btn btn-cart btn-outline-custom px-5" href="/training">
            أكمل التصفح
          </Link>
          <button className="btn btn-cart btn-primary btn-custom-primary px-5">إتمام الطلب</button>
        </div>
      </div>

      {/* Summary */}
      <div className="col-md-3 mb-4">
        <div className="card p-3 summary-box">
          <h5 className="mb-3 text-end">ملخص الطلب</h5>
          <div className="d-flex justify-content-between mb-15">
            <span className="text-muted small">عدد الدورات</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="d-flex justify-content-between mb-15">
            <span className="text-muted small">سعر الدورة</span>
            <div className="d-flex gap-1">
              <span className="fw-bold">{cartData?.course_prices}</span>
              <SvgSaudiRiyal width={10} color="#202020" />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-15">
            <span className="text-muted small">الضريبة</span>
            <div className="d-flex gap-1">
              <span className="fw-bold">{vat}</span>
              <SvgSaudiRiyal width={10} color="#202020" />
            </div>
          </div>
          <div className="Total-box d-flex justify-content-between mb-15 fw-bold">
            <span className="text-color-primary">الإجمالي</span>
            <div className="d-flex gap-1">
              <span className="fw-bold text-color-primary">{total}</span>
              <SvgSaudiRiyal width={10} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartIndexComponent;
