import { useState, useEffect } from "react";
import "../../styled/ReserveForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMagnifyingGlass,
  faPerson,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { addMonths, format } from "date-fns";
import React from "react";
import { dummyHotels } from "../pages/DummyList"; // ✅ 올바른 경로에서 더미 데이터 import

function ReserveForm({ setHotels }) {
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [dateModalOpen, setDateModalOpen] = useState(false);
  const [occupancy, setOccupancy] = useState({ adults: 2, children: 0 });
  const [occupancyOpen, setOccupancyOpen] = useState(false);

  // ✅ 무한 렌더링 방지 (한 번만 실행)
  useEffect(() => {
    setHotels((prevHotels) => [...prevHotels, ...dummyHotels]); // ✅ 기존 데이터 유지
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!location.trim()) {
      alert("검색할 위치를 입력하세요.");
      return;
    }

    if (!startDate || !endDate) {
      alert("날짜를 선택하세요.");
      return;
    }

    // ✅ 검색 필터 적용
    const filteredHotels = dummyHotels.filter(
      (hotel) => hotel.address.includes(location) // ✅ address 필드 사용
    );
    setHotels(filteredHotels); // ✅ 검색 결과 업데이트
  };
  return (
    <div className="reservation-form-container">
      <div className="reservation-form-background">
        <div className="reservation-form-wrapper">
          <form className="reservation-form" onSubmit={handleSearch}>
            <div className="search-box">
              <div className="search-wrapper">
                <span className="search-icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                  type="text"
                  placeholder="어디로 가시나요"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} // ✅ 입력값 반영
                />
              </div>
            </div>
            <div className="date-box-wrapper">
              <div
                className="date-box"
                onClick={() => setDateModalOpen(!dateModalOpen)}
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" />
                <span>
                  {startDate && endDate
                    ? `${format(startDate, "yyyy/MM/dd")} - ${format(
                        endDate,
                        "yyyy/MM/dd"
                      )}`
                    : "날짜 선택"}
                </span>
              </div>

              {dateModalOpen && (
                <div
                  className="date-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <DatePicker
                    selected={startDate || new Date()}
                    onChange={(update) => update && setDateRange(update)}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    minDate={new Date()}
                    maxDate={addMonths(new Date(), 5)}
                    dateFormat="yyyy/MM/dd"
                    inline
                    shouldCloseOnSelect={false}
                    renderCustomHeader={({
                      monthDate,
                      decreaseMonth,
                      increaseMonth,
                    }) => (
                      <div className="custom-datepicker-header">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            decreaseMonth();
                          }}
                          className="nav-button"
                        >
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </button>
                        <span>
                          {monthDate
                            ? format(monthDate, "MMMM yyyy")
                            : "로딩 중..."}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            increaseMonth();
                          }}
                          className="nav-button"
                        >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                      </div>
                    )}
                  />
                  <button
                    className="date-modal-close"
                    type="button"
                    onClick={() => setDateModalOpen(false)}
                  >
                    확인
                  </button>
                </div>
              )}
            </div>

            <div className="occupancy-box">
              <div
                className="occupancy-wrapper"
                role="button"
                tabIndex="0"
                onClick={() => setOccupancyOpen(true)}
              >
                <span className="occupancy-icon">
                  <FontAwesomeIcon icon={faPerson} />
                </span>
                <div className="occupancy-number">
                  {`성인 ${occupancy.adults}명`}
                </div>
              </div>
            </div>

            <button className="search-button" type="submit">
              검색
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReserveForm;
