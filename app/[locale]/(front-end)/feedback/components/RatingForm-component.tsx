import React from "react";

const questions = [
  {
    id: 1,
    text: "1- وضوح أهداف ومحاورات الدورة التدريبية",
  },
  {
    id: 2,
    text: "2- ارتباط أهداف الدورة التدريبية بالمهام الوظيفية",
  },
  {
    id: 3,
    text: "3- مدى ارتباط التطبيقات العملية بالمادة التدريبية",
  },
];

const options = [
  { value: "acceptable", label: "مقبول" },
  { value: "good", label: "جيد" },
  { value: "very_good", label: "جيد جدًا" },
  { value: "very_excellent", label: "ممتاز جدًا" },
  { value: "excellent", label: "ممتاز" },
];

const RatingFormComponent = () => {
  return (
    <form className="rating-form p-4">
      {questions.map((q) => (
        <div className="mb-4" key={q.id}>
          <div className="text-end text-primary mb-3">{q.text}</div>
          <div className="d-flex flex-row-reverse flex-wrap justify-content-end">
            {options.map((opt) => (
              <label
                className="card-radio-btn text-primary"
                key={opt.value}
                htmlFor={`q${q.id}-${opt.value}`}
              >
                <input
                  type="radio"
                  name={`question-${q.id}`}
                  className="card-input-element d-none"
                  id={`q${q.id}-${opt.value}`}
                  value={opt.value}
                />
                <div className="card card-body text-center">
                  <div className="rating-option-text text-primary">{opt.label}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="mb-4">
        <div className="text-end text-primary mb-3">
          4- وسعياً للتحسين المستمر ورفع مستوى الجودة، نتطلع لاستقبال
          مقترحاتكم/مرئياتكم/ملاحظاتكم
        </div>
        <textarea
          className="form-control text-end"
          rows={5}
          placeholder="هنا يكتب نص طويل.."
        ></textarea>
      </div>
    </form>
  );
};

export default RatingFormComponent;
