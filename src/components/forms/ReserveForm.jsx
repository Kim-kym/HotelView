import { useState, useEffect } from "react";
import "../../styled/ReserveForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faMagnifyingGlass, faPerson } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import { addMonths, format } from "date-fns";
// import "react-datepicker/dist/react-datepicker.css";
import React from "react";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"; // 📌 추가해야 함


function ReserveForm() {

    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [dateModalOpen, setDateModalOpen] = useState(false);

    const [occupancy, setOccupancy] = useState({ adults:2, children: 0});
    const [occupancyOpen, setOccupancyOpen] = useState(false);

    const incrementAdult = () => {
    setOccupancy(prev => ({ ...prev, adults: prev.adults + 1}));   
    };
    const decrementAdult = () => {
        setOccupancy(prev => ({ ...prev, adults: prev.adults > 1 ? prev.adults - 1 : 1 }));
    };
    
      const incrementChild = () => {
        setOccupancy(prev => ({ ...prev, children: prev.children + 1 }));
    };
      const decrementChild = () => {
        setOccupancy(prev => ({ ...prev, children: prev.children > 0 ? prev.children - 1 : 0 }));
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".date-modal") && !e.target.closest(".date-box")) {
                setDateModalOpen(false);
            }
        };

        if (dateModalOpen) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => document.removeEventListener("click", handleClickOutside);
    }, [dateModalOpen]);

    return(
        <div className="reservation-form-container">
            <div className="reservation-form-background">
                <div className="reservation-form-wrapper">
                    <form className="reservation-form">
                        <div className="search-box">
                            <div className="search-wrapper">
                            <span className="search-icon">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                            <input type="text" placeholder="어디로 가시나요" />
                            </div>
                        </div>
                        <div className="date-box-wrapper">
                        <div className="date-box" onClick={() => setDateModalOpen(!dateModalOpen)}>
                            <FontAwesomeIcon icon={faCalendarAlt} className="date-icon" />
                            <span>
                            {startDate && endDate
                                ? `${format(startDate, "yyyy/MM/dd")} - ${format(endDate, "yyyy/MM/dd")}`
                                : "날짜 선택"}
                            </span>
                        </div>

                        {/* 📌 날짜 선택 모달 */}
                        {dateModalOpen && (
                        <div 
                            className="date-modal"
                            onClick={(e) => e.stopPropagation()} // ✅ 바깥 클릭으로 닫히는 문제 방지
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
                                shouldCloseOnSelect={false} // ✅ 날짜 클릭 시 달력이 닫히지 않도록 설정
                                renderCustomHeader={({ monthDate, decreaseMonth, increaseMonth }) => (
                                    <div className="custom-datepicker-header">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault(); // ✅ 기본 동작 방지
                                                e.stopPropagation(); // ✅ 이벤트 전파 방지
                                                decreaseMonth(); // ✅ 이전 달로 이동
                                            }}
                                            className="nav-button"
                                        >
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </button>
                                        <span>{monthDate ? format(monthDate, "MMMM yyyy") : "로딩 중..."}</span>
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                increaseMonth(); // ✅ 다음 달로 이동
                                            }}
                                            className="nav-button"
                                        >
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </button>
                                    </div>
                                )}
                            />
                            {/* ✅ 확인 버튼을 눌러야만 달력이 닫힘 */}
                            <button
                                className="date-modal-close"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault(); 
                                    e.stopPropagation();
                                    setDateModalOpen(false); // ✅ 확인 버튼을 눌렀을 때만 모달 닫기
                                }}
                            >
                                확인
                            </button>
                        </div>
                    )}
                    </div>

                        <div className="occupancy-box">
                        <div className="occupancy-wrapper" role="button" tabIndex="0" onClick={() => setOccupancyOpen(true)}>
                            <span className="occupancy-icon">
                            <FontAwesomeIcon icon={faPerson}/>
                            </span>
                            <div className="occupancy-number">
                                {`성인 ${occupancy.adults}명`}
                            </div>                         
                               
                        </div>
               {/* 인원수 선택 모달  */}
              {occupancyOpen && (
                <div className="occupancy-modal">
                  <div className="occupancy-modal-content">
                    <div className="occupancy-modal-wrapper">
                      <div className="occupancy-modal-line">
                      
                        <h3>성인</h3>
                        <div className="occupancy-modal-button-wrapper">
                        <button type="button" onClick={decrementAdult}>-</button>
                        <p>{occupancy.adults}</p>
                        <button type="button" onClick={incrementAdult}>+</button>
                      </div>
                      </div>
                      <div className="occupancy-modal-line">
                        <h3>아동</h3>
                        <div className="occupancy-modal-button-wrapper">
                        <button type="button" onClick={decrementChild}>-</button>
                        <p>{occupancy.children}</p>
                        <button type="button" onClick={incrementChild}>+</button>
                      </div>
                    </div>
                    </div>
                    <div className="occupancy-modal-close-wrapper">
                    <button className="occupancy-modal-close" type="button" onClick={() => setOccupancyOpen(false)}>확인</button>
                    </div>
                  </div>
                </div>
              )}
                        </div>
                    </form>
                </div>
            </div>
        </div>   
    )

}

export default ReserveForm;