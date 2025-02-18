// 컨텐츠 상단 영역

import "../../styled/ReserveSection.css";
import "../maps/JejuMap";

function ReserveSection() {
  return (
    <section className="hero">
      <div className="page-content">
        <img className="background-sea" src="/images/sea.jpg" alt="sea" />
      </div>
      {/* {children} { JejuMap 렌더링 } */}
      <div className="page-content-placeholder"></div>
    </section>
  );
}

export default ReserveSection;
