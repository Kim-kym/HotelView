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

  useEffect(() => {
    setHotels((prevHotels) => [...prevHotels, ...dummyHotels]);
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

    const filteredHotels = dummyHotels.filter(
      (hotel) => hotel.address.includes(location)
    );
    setHotels(filteredHotels);
  };

  return (
    <div className="reservation-form-container">
      <div className="reservation-form-background">
        <div className="reservation-form-wrapper">
          <form className="reservation-form" onSubmit={handleSearch}>
            {/* 🔹 검색창 */}
            <div className="search-box">
              <div className="search-wrapper">
                <span className="search-icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </span>
                <input
                  type="text"
                  placeholder="어디로 가시나요"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* 🔹 날짜 선택 */}
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
                <div className="date-modal" onClick={(e) => e.stopPropagation()}>
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

            {/* 🔹 인원 선택 */}
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
                  {`성인 ${occupancy.adults}명, 어린이 ${occupancy.children}명`}
                </div>
              </div>

              {/* 🔹 인원 선택 모달 */}
              {occupancyOpen && (
                <div className="occupancy-modal" onClick={(e) => e.stopPropagation()}>
                  <div className="occupancy-modal-content">
                    <div className="occupancy-modal-line">
                      <span>성인</span>
                      <div className="occupancy-modal-button-wrapper">
                        <button
                          type="button"
                          onClick={() =>
                            setOccupancy((prev) => ({
                              ...prev,
                              adults: Math.max(prev.adults - 1, 1),
                            }))
                          }
                        >
                          -
                        </button>
                        <span>{occupancy.adults}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setOccupancy((prev) => ({
                              ...prev,
                              adults: prev.adults + 1,
                            }))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="occupancy-modal-line">
                      <span>어린이</span>
                      <div className="occupancy-modal-button-wrapper">
                        <button
                          type="button"
                          onClick={() =>
                            setOccupancy((prev) => ({
                              ...prev,
                              children: Math.max(prev.children - 1, 0),
                            }))
                          }
                        >
                          -
                        </button>
                        <span>{occupancy.children}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setOccupancy((prev) => ({
                              ...prev,
                              children: prev.children + 1,
                            }))
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* 🔹 모달 닫기 버튼 */}
                    <button
                      className="occupancy-modal-close"
                      type="button"
                      onClick={() => setOccupancyOpen(false)}
                    >
                      확인
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 🔹 검색 버튼 */}
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
