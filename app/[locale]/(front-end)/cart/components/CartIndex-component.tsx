"use client";

import Image from "next/image";
import { CartDetailResponse } from "@/models";
import SvgTimer from "@/components/icons/svg/timer";
import SvgCalendar2 from "@/components/icons/svg/calendar-2";
import SvgSvgexport15 from "@/components/icons/svg/svgexport-15";
import SvgSaudiRiyal from "@/components/icons/svg/saudi-riyal";
import RemoveFromCartComponent from "./RemoveFromCart-component";
import { PaymentBtn } from "./payment-btn.component";
import { useTranslations , useLocale  } from "next-intl";

interface Props {
  cartData: CartDetailResponse["data"];
  onRemoveFromCart: (courseId: number) => void;
}

const CartIndexComponent = ({ cartData, onRemoveFromCart }: Props) => {
  const cartItems = cartData?.carts || [];
  const vat = cartData?.vat || 0;
  const total = cartData?.total_price || 0;
  const locale = useLocale();
  const t = useTranslations("trans.cart");

  return (
    <div className="row">
      <div className="col-lg-12">
        <h5 className="mb-20">{t("title")}</h5>
      </div>

      {/* Cart Items */}
      <div className="col-md-9">
        {cartItems.map((item) => {
          const course = item.course;
          return (
            <div className="mb-3 card cart-item" key={item.id}>
              <div className="row g-0 align-items-center">
                <div className="col-md-3">
                  <Image
                    src={course.image}
                    alt={course.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                    className="rounded img-fluid"
                  />
                </div>
                <div className="col-md-9">
                  <div className="card-body">
                    <div className="mb-2 category small">
                      {course.category_name}
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="cursor-pointer color-brand-3 courseTitle one-row card-title">{course.name}</h5>
                      <div className="gap-1 d-flex">
                        <span className="fw-bold text-color-primary">
                          {course.price}
                        </span>
                        <SvgSaudiRiyal width={10} />
                      </div>
                    </div>
                    <div className="mb-2 d-flex justify-content-between align-items-end">
                      <ul className="mb-5 data-list list-unstyled">
                        <li className="d-flex align-items-center">
                          <span className="me-1">
                            <SvgTimer />
                          </span>
                          {course.duration}
                        </li>
                        <li className="d-flex align-items-center">
                          <span className="me-1">
                            {" "}
                            <SvgCalendar2
                              color="#76A441"
                              width={20}
                              height={20}
                            />
                          </span>
                            {new Date(course.start_date).toLocaleDateString(locale, {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                numberingSystem: locale.startsWith("ar") ? "latn" : "latn"
                              })}


                        </li>
                        <li className="d-flex align-items-center">
                          <span className="me-1">
                            <SvgSvgexport15 />
                          </span>
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

        <PaymentBtn cartData={cartData} />
      </div>

      {/* Summary */}
      <div className="mb-4 col-md-3">
        <div className="p-3 card summary-box">
          <h5 className="mb-3 text-end">{t("order-summary")}</h5>
          <div className="d-flex justify-content-between mb-15">
            <span className="text-muted small">{t("courses-count")}</span>
            <span>{cartItems.length}</span>
          </div>
          <div className="d-flex justify-content-between mb-15">
            <span className="text-muted small">{t("course-price")}</span>
            <div className="gap-1 d-flex">
              <span className="fw-bold">{cartData?.course_prices}</span>
              <SvgSaudiRiyal width={10} color="#202020" />
            </div>
          </div>
          <div className="d-flex justify-content-between mb-15">
            <span className="text-muted small">{t("tax")}</span>
            <div className="gap-1 d-flex">
              <span className="fw-bold">{vat}</span>
              <SvgSaudiRiyal width={10} color="#202020" />
            </div>
          </div>
          <div className="Total-box d-flex justify-content-between mb-15 fw-bold">
            <span className="text-color-primary">{t("total")}</span>
            <div className="gap-1 d-flex">
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